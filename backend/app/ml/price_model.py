from dataclasses import dataclass
from pathlib import Path

import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error, mean_squared_error
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder


MODEL_PATH = Path(__file__).resolve().parents[2] / "models" / "baseline_price_model.joblib"
FEATURES = ["crop", "location", "market_name", "day_number"]


@dataclass(frozen=True)
class TrainingMetrics:
    mae: float
    rmse: float
    train_rows: int
    test_rows: int


def _features(data: pd.DataFrame) -> pd.DataFrame:
    prepared = data.copy()
    prepared["day_number"] = pd.to_datetime(prepared["date"]).map(pd.Timestamp.toordinal)
    return prepared[FEATURES]


def train_baseline_model(data: pd.DataFrame, model_path: Path = MODEL_PATH) -> TrainingMetrics:
    """Train a simple, time-ordered baseline model from supplied market observations."""
    ordered = data.sort_values("date").reset_index(drop=True)
    split_index = max(1, int(len(ordered) * 0.8))
    if len(ordered) - split_index < 1:
        raise ValueError("At least two dated market rows are required for a time-based split.")

    train, test = ordered.iloc[:split_index], ordered.iloc[split_index:]
    categorical = ["crop", "location", "market_name"]
    preprocessing = ColumnTransformer(
        [("categorical", OneHotEncoder(handle_unknown="ignore"), categorical)],
        remainder="passthrough",
    )
    model = Pipeline([("preprocess", preprocessing), ("regressor", Ridge(alpha=1.0))])
    model.fit(_features(train), train["price_per_kg"])
    predictions = model.predict(_features(test))
    metrics = TrainingMetrics(
        mae=float(mean_absolute_error(test["price_per_kg"], predictions)),
        rmse=float(mean_squared_error(test["price_per_kg"], predictions) ** 0.5),
        train_rows=len(train),
        test_rows=len(test),
    )
    model_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, model_path)
    return metrics


def load_or_train_model(data: pd.DataFrame, model_path: Path = MODEL_PATH) -> Pipeline:
    if not model_path.exists():
        train_baseline_model(data, model_path)
    return joblib.load(model_path)


def predict_prices(model: Pipeline, market_rows: pd.DataFrame) -> list[float]:
    return [float(value) for value in model.predict(_features(market_rows))]
