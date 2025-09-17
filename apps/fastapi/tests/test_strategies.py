import pytest
from app.schemas.coordinates import Point
from app.services.centroid_factory import get_strategy, register_strategy
import app.services.centroid_strategies  

def test_registry_simple_strategy_available():
    strat = get_strategy("simple")
    assert hasattr(strat, "compute")

def test_simple_strategy_computation():
    strat = get_strategy("simple")
    pts = [Point(lat=0, lng=0), Point(lat=10, lng=10)]
    centroid = strat.compute(pts)
    assert centroid.lat == pytest.approx(5.0)
    assert centroid.lng == pytest.approx(5.0)

def test_unknown_strategy_falls_back_to_default_simple():
    pts = [Point(lat=0, lng=0), Point(lat=10, lng=10)]
    strat_unknown = get_strategy("does-not-exist")
    c_unknown = strat_unknown.compute(pts)
    c_simple = get_strategy("simple").compute(pts)
    assert c_unknown.lat == pytest.approx(c_simple.lat)
    assert c_unknown.lng == pytest.approx(c_simple.lng)

def test_cannot_register_same_alias_twice():
    with pytest.raises(ValueError):
        @register_strategy("simple")
        class Dummy:
            def compute(self, points): ...
