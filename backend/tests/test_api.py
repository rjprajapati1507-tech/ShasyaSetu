from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


def test_recommendation_response_is_ranked_and_labelled_sample_data():
    response = client.post(
        "/api/v1/recommendations",
        json={"crop": "Tomato", "quantity_kg": 500, "location": "Nashik"},
    )
    assert response.status_code == 200
    body = response.json()
    assert "sample/mock" in body["data_source"]
    assert body["recommendation"] == body["markets"][0]
    assert body["markets"][0]["expected_net_realisation_per_kg"] >= body["markets"][1]["expected_net_realisation_per_kg"]


def test_unknown_crop_returns_not_found():
    response = client.post(
        "/api/v1/recommendations",
        json={"crop": "Wheat", "quantity_kg": 100, "location": "Nashik"},
    )
    assert response.status_code == 404

