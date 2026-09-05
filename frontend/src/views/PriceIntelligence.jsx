import { useEffect, useState } from 'react';
import { getRecommendation } from '../services/recommendationApi';

const currency = (value) => `₹${Number(value).toFixed(2)}`;

const demoInput = { crop: 'Tomato', quantity_kg: '500', location: 'Nashik' };

export default function PriceIntelligence({ onContinueToCreateLot }) {
  const [values, setValues] = useState(demoInput);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState(null);

  const runRecommendation = async (input) => {
    setLoading(true);
    setError('');
    setSelectedMarket(null);
    try {
      const recommendation = await getRecommendation(input);
      setResult(recommendation);
    } catch (requestError) {
      setResult(null);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch once on load with the default demo input, same as before.
  useEffect(() => {
    runRecommendation({ ...demoInput, quantity_kg: Number(demoInput.quantity_kg) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    runRecommendation({ ...values, quantity_kg: Number(values.quantity_kg) });
  };

  const handleSelectMarket = (market) => {
    // The market/price/cost figures all come straight from the API response —
    // nothing here is recalculated or invented in the frontend.
    setSelectedMarket({
      market: market.market,
      crop: result.crop,
      quantityKg: result.quantity_kg,
      location: result.origin,
      expectedPricePerKg: market.expected_price_per_kg,
      transportCostPerKg: market.transport_cost_per_kg,
      expectedNetPerKg: market.expected_net_realisation_per_kg,
    });
  };

  return (
    <div>
      <div className="si-hero">
        <div className="si-brand">✦ ShasyaSetu</div>
        <h1 className="si-headline">Better market decisions, grounded in clear calculations.</h1>
        <p className="si-sub">AI-powered agricultural market intelligence for a focused, demo-ready selling recommendation.</p>
        <span className="si-badge">Prototype using demo/sample market data — not live data</span>
        <div className="si-workflow"><span>Farmer input</span><i>→</i><span>Price prediction</span><i>→</i><span>Net realisation</span><i>→</i><span>Market ranking</span></div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <p className="eyebrow">Step 1</p>
        <h2>Farmer input</h2>
        <p className="si-form-desc">Tell us what you want to sell and where you are located.</p>
        <form onSubmit={handleSubmit}>
          <div className="si-field-row">
            <div className="field"><label>Crop</label><input name="crop" value={values.crop} onChange={handleChange} required /></div>
            <div className="field"><label>Quantity (kg)</label><input name="quantity_kg" type="number" min="1" step="1" value={values.quantity_kg} onChange={handleChange} required /></div>
            <div className="field"><label>Farmer location</label><input name="location" value={values.location} onChange={handleChange} required /></div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Finding markets…' : 'Get recommendation'}
          </button>
        </form>
        <p className="si-note">Demo currently supports the sample route from Nashik.</p>
      </div>

      {loading && (
        <div className="card"><div className="hint-banner">Fetching recommendation from the ShasyaSetu API…</div></div>
      )}

      {!loading && error && (
        <div className="card">
          <div className="hint-banner" style={{ background: 'var(--red-100)', borderColor: 'var(--red-100)', color: 'var(--red-700)' }}>
            Recommendation unavailable — {error}
          </div>
        </div>
      )}

      {!loading && !error && result && (
        <>
          <span className="si-badge" style={{ display: 'inline-block', marginBottom: 14 }}>{result.data_source}</span>

          <div className="grid grid-2" style={{ marginTop: 14, marginBottom: 16 }}>
            <div className="card">
              <p className="eyebrow">Recommended market</p>
              <h2>{result.recommendation.market}</h2>
              <p className="si-form-desc">It has the highest expected net realisation after the sample transport and handling costs are deducted.</p>
              <div className="si-metrics">
                <div className="si-metric"><span>Expected price / kg</span><strong>{currency(result.recommendation.expected_price_per_kg)}</strong></div>
                <div className="si-metric"><span>Transport / kg</span><strong>{currency(result.recommendation.transport_cost_per_kg)}</strong></div>
                <div className="si-metric si-metric-em"><span>Expected net / kg</span><strong>{currency(result.recommendation.expected_net_realisation_per_kg)}</strong></div>
              </div>
            </div>
            <div className="card">
              <p className="eyebrow">Calculation</p>
              <h2>Expected net realisation</h2>
              <div className="si-calc-row"><span>Expected selling price</span><strong>{currency(result.recommendation.expected_price_per_kg)} / kg</strong></div>
              <div className="si-calc-row"><span>− Transportation cost</span><strong>{currency(result.recommendation.transport_cost_per_kg)} / kg</strong></div>
              <div className="si-calc-row"><span>− Relevant costs</span><strong>{currency(result.recommendation.handling_cost_per_kg)} / kg</strong></div>
              <div className="si-calc-row si-calc-total"><span>= Expected net realisation</span><strong>{currency(result.recommendation.expected_net_realisation_per_kg)} / kg</strong></div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <p className="eyebrow">Step 2</p>
            <h2>Market comparison</h2>
            <p className="si-form-desc">Markets are ranked by expected net realisation for {result.quantity_kg} kg. The recommendation above is a starting point — you can select any market below.</p>
            <div className="table-wrap">
              <table className="si-table">
                <thead>
                  <tr><th>Market</th><th>Expected price</th><th>Transport cost</th><th>Expected net realisation</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {result.markets.map((m) => {
                    const isRecommended = m.market === result.recommendation.market;
                    const isSelected = selectedMarket && selectedMarket.market === m.market;
                    return (
                      <tr key={m.market} className={isRecommended ? 'si-row-rec' : ''}>
                        <td>{m.market}{isRecommended && <span className="si-tag">Recommended</span>}</td>
                        <td>{currency(m.expected_price_per_kg)} / kg</td>
                        <td>{currency(m.transport_cost_per_kg)} / kg</td>
                        <td><strong>{currency(m.expected_net_realisation_per_kg)} / kg</strong></td>
                        <td>
                          <button
                            type="button"
                            className={isSelected ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                            onClick={() => handleSelectMarket(m)}
                          >
                            {isSelected ? '✓ Selected' : 'Select market'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {selectedMarket && (
            <div className="card" style={{ marginBottom: 16 }}>
              <p className="eyebrow">Step 3</p>
              <h2>Selected market: {selectedMarket.market}</h2>
              <p className="si-form-desc">
                {selectedMarket.crop} · {selectedMarket.quantityKg} kg · {selectedMarket.location} → {selectedMarket.market}
              </p>
              <div className="si-metrics">
                <div className="si-metric"><span>Expected price / kg</span><strong>{currency(selectedMarket.expectedPricePerKg)}</strong></div>
                <div className="si-metric"><span>Transport / kg</span><strong>{currency(selectedMarket.transportCostPerKg)}</strong></div>
                <div className="si-metric si-metric-em"><span>Expected net / kg</span><strong>{currency(selectedMarket.expectedNetPerKg)}</strong></div>
              </div>
              <div className="lot-actions">
                <button className="btn btn-primary" onClick={() => onContinueToCreateLot(selectedMarket)}>
                  Continue to Create Lot
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
