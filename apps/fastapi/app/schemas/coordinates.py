from typing import List, Annotated, Union
from pydantic import BaseModel, Field, ConfigDict, StrictFloat, field_validator
import math

Number = Union[StrictFloat, int] 

class Point(BaseModel):
    lat: Annotated[Number, Field(ge=-90,  le=90)]
    lng: Annotated[Number, Field(ge=-180, le=180)]
    model_config = ConfigDict(extra="forbid")

    @field_validator("lat", "lng")
    @classmethod
    def norm_latlang(cls, v: Number) -> float:
        f = float(v)
        if not math.isfinite(f):
            raise ValueError("value must be a finite number")
        f = round(f, 6)
        return 0.0 if f == 0.0 else f

class CoordinatesInput(BaseModel):
    points: Annotated[List[Point], Field(min_length=1)]
    model_config = ConfigDict(extra="forbid")

class Bounds(BaseModel):
    north: Annotated[Number, Field(ge=-90, le=90)]
    south: Annotated[Number, Field(ge=-90, le=90)]
    east:  Annotated[Number, Field(ge=-180, le=180)]
    west:  Annotated[Number, Field(ge=-180, le=180)]
    model_config = ConfigDict(extra="forbid")

class GeoOutput(BaseModel):
    centroid: Point
    bounds: Bounds
    model_config = ConfigDict(extra="forbid")
