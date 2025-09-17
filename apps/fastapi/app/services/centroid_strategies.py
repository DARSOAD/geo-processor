from typing import Protocol, Sequence
from schemas.coordinates import Point
from .centroid_factory import register_strategy, CentroidStrategy


@register_strategy("simple")
class SimpleCentroid(CentroidStrategy):
    def compute(self, points: Sequence[Point]) -> Point:
        n = len(points)
        lat = sum(p.lat for p in points) / n
        lng = sum(p.lng for p in points) / n
        return Point(lat=lat, lng=lng)
    
# --- Template for new strategies ---
# from .centroid_factory import register_strategy
# from .centroid_strategies import CentroidStrategy
#
# @register_strategy("weighted", "wmean")
# class WeightedCentroid(CentroidStrategy):
#     def compute(self, points: Sequence[Point]) -> Point:
#         # your logic here...
#         return Point(lat=..., lng=...)