from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from starlette import status

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    details = [
        {"field": ".".join(map(str, e["loc"])), "message": e["msg"]}
        for e in exc.errors()
    ]
    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST, 
        content={
            "error": "Invalid payload",
            "hint": "Points must be a non-empty array of objects with numeric lat/lng",
            "details": details,
        },
    )
