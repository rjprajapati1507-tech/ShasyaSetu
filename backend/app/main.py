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
configured_origins = os.getenv("CORS_ORIGINS", "").split(",")

allowed_origins = [
    origin.strip()
    for origin in configured_origins
    if origin.strip()
]

allowed_origins.append("https://shasyasetu-frontend.onrender.com")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(recommendation_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "data_source": "sample/mock only"}
