import pytest
from app.schemas.coordinates import CoordinatesInput
from app.services.geo_processor import compute_data

def test_compute_data_shapes_and_values_simple():
    coords = CoordinatesInput(points=[
        {"lat": 0, "lng": 0},
        {"lat": 10, "lng": 10},
        {"lat": 10, "lng": 0},
        {"lat": 0, "lng": 10},
    ])
    out = compute_data(coords)  
    assert out.centroid.lat == pytest.approx(5.0)
    assert out.centroid.lng == pytest.approx(5.0)
    assert out.bounds.north == pytest.approx(10.0)
    assert out.bounds.south == pytest.approx(0.0)
    assert out.bounds.east  == pytest.approx(10.0)
    assert out.bounds.west  == pytest.approx(0.0)
