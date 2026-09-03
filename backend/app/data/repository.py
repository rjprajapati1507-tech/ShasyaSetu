from pathlib import Path

import pandas as pd


DATA_FILE = Path(__file__).resolve().parents[2] / "data" / "sample_market_data.csv"


def load_market_data() -> pd.DataFrame:
    """Load and minimally validate the explicitly labelled sample market data."""
    data = pd.read_csv(DATA_FILE, parse_dates=["date"])
    required = {
        "market_name", "crop", "location", "date", "price_per_kg",
        "transport_cost_per_kg", "handling_cost_per_kg",
    }
    missing = required.difference(data.columns)
    if missing:
        raise ValueError(f"Market data is missing required columns: {sorted(missing)}")
    return data.dropna(subset=["market_name", "crop", "location", "date", "price_per_kg"])

