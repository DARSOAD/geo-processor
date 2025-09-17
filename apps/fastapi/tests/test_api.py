import pytest
from fastapi.testclient import TestClient
import app.routers.geo_processor as rtr


from app.main import app 

client = TestClient(app)

def test_post_process_simple_success():
    body = {
        "points": [
            {"lat": 0, "lng": 0},
            {"lat": 10, "lng": 10}
        ]
    }
    res = client.post("/process/", json=body)
    assert res.status_code == 200
    data = res.json()
    assert set(data.keys()) == {"centroid", "bounds"}
    assert data["centroid"]["lat"] == pytest.approx(5.0)
    assert data["centroid"]["lng"] == pytest.approx(5.0)
    assert data["bounds"]["north"] == pytest.approx(10.0)
    assert data["bounds"]["south"] == pytest.approx(0.0)
    assert data["bounds"]["east"]  == pytest.approx(10.0)
    assert data["bounds"]["west"]  == pytest.approx(0.0)

def test_post_process_with_unknown_strategy_falls_back():
    body = { "points": [{"lat": 0, "lng": 0}, {"lat": 10, "lng": 10}] }
    res = client.post("/process/?strategy=nope", json=body)  
    assert res.status_code == 200  
    data = res.json()
    assert data["centroid"]["lat"] == pytest.approx(5.0)
    assert data["centroid"]["lng"] == pytest.approx(5.0)

def test_validation_error_missing_points_returns_400():
    res = client.post("/process/", json={"nombre": "Diego"})
    assert res.status_code == 400
    data = res.json()
    assert data["error"] == "Invalid payload"
    assert "details" in data
    fields = [d["field"] for d in data["details"]]
    assert "body.points" in fields

def test_validation_error_empty_points_returns_400():
    res = client.post("/process/", json={"points": []})
    assert res.status_code == 400
    data = res.json()
    assert data["error"] == "Invalid payload"

def test_unexpected_error_returns_500(monkeypatch):
    def boom(*args, **kwargs):
        raise RuntimeError("kaboom")
    monkeypatch.setattr(rtr, "compute_data", boom)

    with TestClient(app, raise_server_exceptions=False) as client:
        body = {"points": [{"lat": 0, "lng": 0}, {"lat": 1, "lng": 1}]}
        res = client.post("/process/", json=body)
        assert res.status_code == 500
