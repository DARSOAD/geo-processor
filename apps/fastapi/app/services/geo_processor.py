from app.schemas.coordinates import CoordinatesInput,GeoOutput
from .centroid_factory import get_strategy


def compute_data(coordinates: CoordinatesInput, strategy: str = "simple")->GeoOutput:
    
    points = coordinates.points  

    lats = [p.lat for p in points]
    lngs = [p.lng for p in points]

    centroid = get_strategy(strategy).compute(points)
    
    bounds =  {
        "north": max(lats),
        "south": min(lats),
        "east": max(lngs),
        "west": min(lngs)
        }


    return GeoOutput(centroid=centroid, bounds=bounds)

