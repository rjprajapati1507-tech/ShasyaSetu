from dataclasses import dataclass

import pandas as pd

from backend.app.ml.price_model import predict_prices


@dataclass(frozen=True)
class MarketRecommendation:
    market: str
    expected_price_per_kg: float
    transport_cost_per_kg: float
    handling_cost_per_kg: float
    expected_net_realisation_per_kg: float
    expected_net_realisation_total: float


def calculate_net_realisation(price: float, transport: float, handling: float = 0.0) -> float:
    return price - transport - handling


def rank_markets(market_rows: pd.DataFrame, model, quantity_kg: float) -> list[MarketRecommendation]:
    predictions = predict_prices(model, market_rows)
    results = []
    for (_, row), price in zip(market_rows.iterrows(), predictions):
        transport = float(row["transport_cost_per_kg"])
        handling = float(row.get("handling_cost_per_kg", 0.0))
        net = calculate_net_realisation(price, transport, handling)
        results.append(MarketRecommendation(
            market=str(row["market_name"]),
            expected_price_per_kg=round(price, 2),
            transport_cost_per_kg=round(transport, 2),
            handling_cost_per_kg=round(handling, 2),
            expected_net_realisation_per_kg=round(net, 2),
            expected_net_realisation_total=round(net * quantity_kg, 2),
        ))
    return sorted(results, key=lambda item: item.expected_net_realisation_per_kg, reverse=True)


def recommend(data: pd.DataFrame, model, crop: str, quantity_kg: float, origin: str) -> list[MarketRecommendation]:
    matches = data[data["crop"].str.casefold() == crop.casefold()].copy()
    if matches.empty:
        raise LookupError(f"No sample-market records exist for crop '{crop}'.")
    # The sample file contains route costs representing transport from the submitted origin.
    # Nashik is the only demo origin currently supported to avoid implying live routing.
    if origin.casefold() != "nashik":
        raise LookupError("The sample dataset currently supports Nashik as the origin only.")
    latest_rows = matches.sort_values("date").groupby("market_name", as_index=False).tail(1)
    return rank_markets(latest_rows, model, quantity_kg)

