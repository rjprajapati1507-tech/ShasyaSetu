import pandas as pd
from pathlib import Path
import joblib
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score


# --------------------------------------------------
# 1. Paths
# --------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[1]

DATA_PATH = PROJECT_ROOT / "data" / "agmarknet_onion_nashik_2025_weekly.csv"
MODEL_PATH = PROJECT_ROOT / "ml" / "models" / "onion_price_model.joblib"
OUTPUT_PATH = PROJECT_ROOT / "ml" / "models" / "test_predictions.csv"


# --------------------------------------------------
# 2. Load data and model
# --------------------------------------------------

df = pd.read_csv(DATA_PATH)
model = joblib.load(MODEL_PATH)

TARGET = "current_price_rs_per_quintal"

df = df.dropna(subset=[TARGET]).copy()


# --------------------------------------------------
# 3. Features
# --------------------------------------------------

FEATURES = [
    "market",
    "month",
    "week",
    "previous_week_price_rs_per_quintal",
    "previous_month_price_rs_per_quintal",
    "previous_year_price_rs_per_quintal",
]


X = df[FEATURES]
y = df[TARGET]


# --------------------------------------------------
# 4. Same chronological 80/20 split
# --------------------------------------------------

split_index = int(len(df) * 0.80)

X_test = X.iloc[split_index:]
y_test = y.iloc[split_index:]

test_rows = df.iloc[split_index:].copy()


# --------------------------------------------------
# 5. Predictions
# --------------------------------------------------

predictions = model.predict(X_test)


# --------------------------------------------------
# 6. Metrics
# --------------------------------------------------

mae = mean_absolute_error(y_test, predictions)
rmse = mean_squared_error(y_test, predictions) ** 0.5
r2 = r2_score(y_test, predictions)

print("\n==============================")
print("MODEL TEST RESULTS")
print("==============================")

print(f"Test rows : {len(y_test)}")
print(f"MAE       : ₹{mae:.2f}/quintal")
print(f"RMSE      : ₹{rmse:.2f}/quintal")
print(f"R²        : {r2:.4f}")

print("==============================")


# --------------------------------------------------
# 7. Actual vs Predicted
# --------------------------------------------------

results = test_rows[
    ["year", "month", "week", "market", TARGET]
].copy()

results["predicted_price_rs_per_quintal"] = predictions
results["absolute_error_rs_per_quintal"] = (
    results[TARGET] - results["predicted_price_rs_per_quintal"]
).abs()

results = results.sort_values(
    "absolute_error_rs_per_quintal",
    ascending=False
)


# --------------------------------------------------
# 8. Save predictions
# --------------------------------------------------

results.to_csv(OUTPUT_PATH, index=False)

print(f"\nPredictions saved to:")
print(OUTPUT_PATH)

print("\nTop 10 largest prediction errors:")
print(
    results[
        [
            "market",
            "month",
            "week",
            TARGET,
            "predicted_price_rs_per_quintal",
            "absolute_error_rs_per_quintal",
        ]
    ].head(10).to_string(index=False)
)