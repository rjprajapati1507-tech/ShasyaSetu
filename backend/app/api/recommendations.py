from functools import lru_cache

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from backend.app.data.repository import load_market_data
from backend.app.ml.price_model import load_or_train_model
from backend.app.services.recommendation import recommend


router = APIRouter(prefix="/api/v1", tags=["recommendations"])


class RecommendationRequest(BaseModel):
    crop: str = Field(min_length=1, examples=["Tomato"])
    quantity_kg: float = Field(gt=0, examples=[500])
    location: str = Field(min_length=1, examples=["Nashik"])


class MarketResult(BaseModel):
    market: str
    expected_price_per_kg: float
    transport_cost_per_kg: float
    handling_cost_per_kg: float
    expected_net_realisation_per_kg: float
    expected_net_realisation_total: float


class RecommendationResponse(BaseModel):
    crop: str
    quantity_kg: float
    origin: str
    data_source: str
    recommendation: MarketResult
    markets: list[MarketResult]


@lru_cache
def _resources():
    data = load_market_data()
    return data, load_or_train_model(data)


@router.post("/recommendations", response_model=RecommendationResponse)
def create_recommendation(request: RecommendationRequest) -> RecommendationResponse:
    data, model = _resources()
    try:
        ranked = recommend(data, model, request.crop, request.quantity_kg, request.location)
    except LookupError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    results = [MarketResult(**item.__dict__) for item in ranked]
    return RecommendationResponse(
        crop=request.crop,
        quantity_kg=request.quantity_kg,
        origin=request.location,
        data_source="sample/mock data — not live market data",
        recommendation=results[0],
        markets=results,
    )

