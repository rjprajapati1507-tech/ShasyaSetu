import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n/I18nContext';

const currency = (value) => `₹${Number(value).toFixed(2)}`;
const medal = (rank) => (rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `#${rank + 1}`);

const demoInput = { crop: 'Tomato', quantity_kg: '500', location: 'Ahmedabad_Market_1' };

export default function PriceIntelligence({ onContinueToCreateLot }) {
  const { t } = useTranslation();
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
      const mockArrival = 400; 
      const mockPrice = 25;

      const response = await fetch("https://shasyasetu-api.onrender.com/api/get-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop_name: input.crop,
          mandi_location: input.location,
          quantity_kg: parseFloat(input.quantity_kg),
          current_arrival_tonnes: mockArrival,
          current_mandi_price: mockPrice
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
         throw new Error(data.detail || "API Error");
      }

      const aiPredictedNet = data.future_net || (mockPrice + 2); 
      const aiPredictedPrice = aiPredictedNet + 1.5; 

      const updatedResult = {
        crop: input.crop,
        quantity_kg: input.quantity_kg,
        origin: "Farm Location",
        data_source: `⚡ AI Suggestion: ${data.action} | Confidence: ${data.confidence}`, 
        recommendation: {
          market: input.location,
          expected_price_per_kg: aiPredictedPrice,
          transport_cost_per_kg: 1.5,
          handling_cost_per_kg: 0.5,
          expected_net_realisation_per_kg: aiPredictedNet,
        },
        markets: [
          {
            market: input.location,
            expected_price_per_kg: aiPredictedPrice,
            transport_cost_per_kg: 1.5,
            expected_net_realisation_per_kg: aiPredictedNet,
          },
          {
            market: "Surat_Market_9",
            expected_price_per_kg: aiPredictedPrice - 2.5,
            transport_cost_per_kg: 2.0,
            expected_net_realisation_per_kg: aiPredictedNet - 3.0,
          },
          {
            market: "Rajkot_Market_3",
            expected_price_per_kg: aiPredictedPrice - 4.0,
            transport_cost_per_kg: 1.2,
            expected_net_realisation_per_kg: aiPredictedNet - 4.5,
          }
        ]
      };

      setResult(updatedResult);

    } catch (requestError) {
      setResult(null);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runRecommendation({ ...demoInput, quantity_kg: Number(demoInput.quantity_kg) });
  }, []);

  const handleChange = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    runRecommendation({ ...values, quantity_kg: Number(values.quantity_kg) });
  };

  const handleSelectMarket = (market) => {
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

  const rec = result?.recommendation;
  const rankedMarkets = result ? [...result.markets].sort((a, b) => b.expected_net_realisation_per_kg - a.expected_net_realisation_per_kg) : [];

  return (
    <div>
      <div className="si-hero">
        <div className="si-brand">{t('piBrand')}</div>
        <h1 className="si-headline">{t('piHeadline')}</h1>
        <p className="si-sub">{t('piSub')}</p>
        <span className="si-badge">{t('piBadge')}</span>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <p className="eyebrow">{t('step1')}</p>
        <h2>{t('farmerInput')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="si-field-row">
            <div className="field"><label>{t('labelCrop')}</label><input name="crop" value={values.crop} onChange={handleChange} required /></div>
            <div className="field"><label>{t('labelQuantityKg')}</label><input name="quantity_kg" type="number" min="1" step="1" value={values.quantity_kg} onChange={handleChange} required /></div>
            <div className="field"><label>{t('labelFarmerLocation')}</label><input name="location" value={values.location} onChange={handleChange} required /></div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? t('findingMarkets') : t('getRecommendation')}
          </button>
        </form>
      </div>

      {!loading && error && (
        <div className="card">
          <div className="hint-banner" style={{ background: 'var(--red-100)', color: 'var(--red-700)' }}>
            Error: {error}
          </div>
        </div>
      )}

      {!loading && !error && result && rec && (
        <>
          <span className="si-badge" style={{ display: 'inline-block', marginBottom: 14 }}>{result.data_source}</span>

          <div className="card best-option-card" style={{ marginBottom: 16 }}>
            <p className="eyebrow">{t('bestSellingOption')}</p>
            <h2>{rec.market}</h2>
            <div className="si-metrics">
              <div className="si-metric"><span>{t('expectedPricePerKg')}</span><strong>{currency(rec.expected_price_per_kg)}</strong></div>
              <div className="si-metric"><span>{t('transportPerKg')}</span><strong>{currency(rec.transport_cost_per_kg)}</strong></div>
              <div className="si-metric si-metric-em"><span>{t('expectedNetPerKg')}</span><strong>{currency(rec.expected_net_realisation_per_kg)}</strong></div>
            </div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <p className="eyebrow">{t('step2')}</p>
            <h2>{t('marketComparison')}</h2>
            <div className="rank-list">
              {rankedMarkets.map((m, idx) => {
                const isSelected = selectedMarket && selectedMarket.market === m.market;
                return (
                  <div className={`rank-row`} key={m.market}>
                    <div className="rank-medal">{medal(idx)}</div>
                    <div className="rank-info">
                      <div className="rank-name">{m.market}</div>
                      <div className="rank-figures">
                        <span>{t('colExpectedPrice')}: <b>{currency(m.expected_price_per_kg)}/kg</b></span>
                        <span className="rank-net">{t('colNetRealisation')}: <b>{currency(m.expected_net_realisation_per_kg)}/kg</b></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
