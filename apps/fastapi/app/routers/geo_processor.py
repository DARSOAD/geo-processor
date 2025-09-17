from fastapi import APIRouter, Query
from app.schemas.coordinates import CoordinatesInput, GeoOutput
from app.services.geo_processor import compute_data

router = APIRouter()

@router.post("/", response_model=GeoOutput)
def processor(coordinates: CoordinatesInput,  strategy: str = Query("simple", description="Strategy name")):
    return compute_data(coordinates, strategy=strategy)