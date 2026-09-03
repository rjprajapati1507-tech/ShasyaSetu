import pandas as pd

from backend.app.services.recommendation import calculate_net_realisation, rank_markets


class FixedModel:
    def predict(self, features):
        return [20.0, 25.0]


def test_net_realisation_subtracts_all_costs():
    assert calculate_net_realisation(25.0, 2.5, 0.5) == 22.0


def test_market_ranking_uses_calculated_net_realisation():
    rows = pd.DataFrame({
        "market_name": ["A", "B"], "crop": ["Tomato", "Tomato"],
        "location": ["Pune", "Mumbai"], "date": ["2026-01-01", "2026-01-01"],
        "transport_cost_per_kg": [1.0, 5.0], "handling_cost_per_kg": [0.0, 0.0],
    })
    ranked = rank_markets(rows, FixedModel(), quantity_kg=100)
    assert [result.market for result in ranked] == ["B", "A"]
    assert ranked[0].expected_net_realisation_total == 2000.0
