from fastapi import FastAPI

from app.api.documents import router as documents_router
from app.models.documents import HealthResponse

app = FastAPI(title="Arkion DocIntel AI Service")


@app.get("/health", response_model=HealthResponse)
async def health_check() -> HealthResponse:
    return HealthResponse(status="ok")


app.include_router(documents_router)

