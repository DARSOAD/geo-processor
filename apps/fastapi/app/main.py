from fastapi import FastAPI
from app.routers import geo_processor
from fastapi.exceptions import RequestValidationError
from app.errors import validation_exception_handler
import app.services.centroid_strategies

app = FastAPI()

app.add_exception_handler(RequestValidationError, validation_exception_handler)
@app.get("/")
def health():
    return {"message": "The documentation is located in /docs"}

app.include_router(geo_processor.router, prefix="/process", tags=["Process"])

