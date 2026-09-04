import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.recommendations import router as recommendation_router


app = FastAPI(
    title="ShasyaSetu MVP API",
    version="0.1.0",
    description="Sample-data agricultural market recommendation prototype.",
)

# Comma-separated local origins; override for a deployed frontend through CORS_ORIGINS.
allowed_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:5500,http://127.0.0.1:5500").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins if origin.strip()],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)
app.include_router(recommendation_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "data_source": "sample/mock only"}
