import pandas as pd
from pathlib import Path
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib


# --------------------------------------------------
# 1. Paths
# --------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[1]

DATA_PATH = PROJECT_ROOT / "data" / "agmarknet_onion_nashik_2025_weekly.csv"
MODEL_DIR = PROJECT_ROOT / "ml" / "models"

MODEL_DIR.mkdir(parents=True, exist_ok=True)


# --------------------------------------------------
# 2. Load dataset
# --------------------------------------------------

df = pd.read_csv(DATA_PATH)

print(f"Total rows loaded: {len(df)}")


# --------------------------------------------------
# 3. Remove rows where target is missing
# --------------------------------------------------

TARGET = "current_price_rs_per_quintal"

df = df.dropna(subset=[TARGET]).copy()

print(f"Rows after removing missing target: {len(df)}")


# --------------------------------------------------
# 4. Create date/time features
# --------------------------------------------------

df["month"] = pd.to_numeric(df["month"], errors="coerce")
df["week"] = pd.to_numeric(df["week"], errors="coerce")


# --------------------------------------------------
# 5. Features
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
# 6. Chronological train/test split
# --------------------------------------------------

# Dataset is already collected month/week-wise.
# First ~80% = training
# Last ~20% = testing

split_index = int(len(df) * 0.80)

X_train = X.iloc[:split_index]
X_test = X.iloc[split_index:]

y_train = y.iloc[:split_index]
y_test = y.iloc[split_index:]

print(f"Training rows: {len(X_train)}")
print(f"Testing rows: {len(X_test)}")


# --------------------------------------------------
# 7. Preprocessing
# --------------------------------------------------

categorical_features = ["market"]

numeric_features = [
    "month",
    "week",
    "previous_week_price_rs_per_quintal",
    "previous_month_price_rs_per_quintal",
    "previous_year_price_rs_per_quintal",
]

preprocessor = ColumnTransformer(
    transformers=[
        (
            "categorical",
            Pipeline([
                (
                    "imputer",
                    SimpleImputer(strategy="most_frequent")
                ),
                (
                    "encoder",
                    OneHotEncoder(handle_unknown="ignore")
                ),
            ]),
            categorical_features,
        ),
        (
            "numeric",
            SimpleImputer(strategy="median"),
            numeric_features,
        ),
    ]
)


# --------------------------------------------------
# 8. Model
# --------------------------------------------------

model = RandomForestRegressor(
    n_estimators=300,
    random_state=42,
    min_samples_leaf=2,
    n_jobs=-1,
)


# --------------------------------------------------
# 9. Complete ML pipeline
# --------------------------------------------------

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", model),
])


# --------------------------------------------------
# 10. Train
# --------------------------------------------------

print("\nTraining model...")

pipeline.fit(X_train, y_train)

print("Training completed.")


# --------------------------------------------------
# 11. Test
# --------------------------------------------------

predictions = pipeline.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
rmse = mean_squared_error(y_test, predictions) ** 0.5
r2 = r2_score(y_test, predictions)


# --------------------------------------------------
# 12. Results
# --------------------------------------------------

print("\n==============================")
print("MODEL EVALUATION")
print("==============================")

print(f"MAE  : ₹{mae:.2f}/quintal")
print(f"RMSE : ₹{rmse:.2f}/quintal")
print(f"R²   : {r2:.4f}")

print("==============================")


# --------------------------------------------------
# 13. Save model
# --------------------------------------------------

model_path = MODEL_DIR / "onion_price_model.joblib"

joblib.dump(pipeline, model_path)

print(f"\nModel saved to:")
print(model_path)