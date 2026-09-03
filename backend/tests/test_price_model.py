from backend.app.data.repository import load_market_data
from backend.app.ml.price_model import predict_prices, train_baseline_model


def test_baseline_model_trains_saves_and_predicts(tmp_path):
    data = load_market_data()
    model_path = tmp_path / "model.joblib"
    metrics = train_baseline_model(data, model_path)
    assert model_path.exists()
    assert metrics.train_rows > 0
    assert metrics.test_rows > 0
    from joblib import load
    predictions = predict_prices(load(model_path), data.head(2))
    assert len(predictions) == 2

