import { useEffect, useState } from 'react';
import { getRecommendation } from '../services/recommendationApi';
import { useTranslation } from '../i18n/I18nContext';

const currency = (value) => `₹${Number(value).toFixed(2)}`;
const medal = (rank) => (rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `#${rank + 1}`);

const demoInput = { crop: 'Tomato', quantity_kg: '500', location: 'Nashik' };

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
      const recommendation = await getRecommendation(input);
      setResult(recommendation);
    } catch (requestError) {
      setResult(null);
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

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
    // Every figure here comes straight from the API response — nothing is
    // recalculated or invented in the frontend.
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
      {/* ---------- Hero ---------- */}
      <div className="si-hero">
        <div className="si-brand">{t('piBrand')}</div>
        <h1 className="si-headline">{t('piHeadline')}</h1>
        <p className="si-sub">{t('piSub')}</p>
        <span className="si-badge">{t('piBadge')}</span>
        <div className="si-workflow">
          <span>{t('piWorkflowInput')}</span><i>→</i>
          <span>{t('piWorkflowPredict')}</span><i>→</i>
          <span>{t('piWorkflowNet')}</span><i>→</i>
          <span>{t('piWorkflowRank')}</span>
        </div>
      </div>

      {/* ---------- Step 1: Farmer input ---------- */}
      <div className="card" style={{ marginBottom: 16 }}>
        <p className="eyebrow">{t('step1')}</p>
        <h2>{t('farmerInput')}</h2>
        <p className="si-form-desc">{t('farmerInputDesc')}</p>
        <form onSubmit={handleSubmit}>
          <div className="si-field-row">
            <div className="field"><label htmlFor="recommendation-crop">{t('labelCrop')}</label><input id="recommendation-crop" name="crop" value={values.crop} onChange={handleChange} required /></div>
            <div className="field"><label htmlFor="recommendation-quantity">{t('labelQuantityKg')}</label><input id="recommendation-quantity" name="quantity_kg" type="number" min="1" step="1" value={values.quantity_kg} onChange={handleChange} required /></div>
            <div className="field"><label htmlFor="recommendation-location">{t('labelFarmerLocation')}</label><input id="recommendation-location" name="location" value={values.location} onChange={handleChange} required /></div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? t('findingMarkets') : t('getRecommendation')}
          </button>
        </form>
        <p className="si-note">{t('piNote')}</p>
      </div>

      {loading && (
        <div className="card" role="status" aria-live="polite"><div className="hint-banner">{t('fetchingRecommendation')}</div></div>
      )}

      {!loading && error && (
        <div className="card" role="alert">
          <div className="hint-banner" style={{ background: 'var(--red-100)', borderColor: 'var(--red-100)', color: 'var(--red-700)' }}>
            {t('recommendationUnavailable')} {error}
          </div>
        </div>
      )}

      {!loading && !error && result && rec && (
        <>
          <span className="si-badge" style={{ display: 'inline-block', marginBottom: 14 }}>{result.data_source}</span>

          {/* ---------- BEST SELLING OPTION (focal card) ---------- */}
          <div className="card best-option-card" style={{ marginBottom: 16 }}>
            <p className="eyebrow">{t('bestSellingOption')}</p>
            <h2>{rec.market}</h2>
            <p className="si-form-desc">{t('recommendedMarketDesc')}</p>
            <div className="si-metrics">
              <div className="si-metric"><span>{t('expectedPricePerKg')}</span><strong>{currency(rec.expected_price_per_kg)}</strong></div>
              <div className="si-metric"><span>{t('transportPerKg')}</span><strong>{currency(rec.transport_cost_per_kg)}</strong></div>
              <div className="si-metric si-metric-em"><span>{t('expectedNetPerKg')}</span><strong>{currency(rec.expected_net_realisation_per_kg)}</strong></div>
            </div>
          </div>

          {/* ---------- Selling decision (honest unavailable state) ---------- */}
          <div className="card" style={{ marginBottom: 16 }}>
            <p className="eyebrow">{t('sellingDecision')}</p>
            <h2>{t('sellingDecisionUnavailableTitle')}</h2>
            <p className="si-form-desc">{t('sellingDecisionUnavailableDesc')}</p>
          </div>

          {/* ---------- Realisation breakdown ---------- */}
          <div className="card" style={{ marginBottom: 16 }}>
            <p className="eyebrow">{t('calculation')}</p>
            <h2>{t('expectedNetRealisation')}</h2>
            <div className="si-calc-row"><span>{t('expectedSellingPrice')}</span><strong>{currency(rec.expected_price_per_kg)} / kg</strong></div>
            <div className="si-calc-row"><span>{t('transportCost')}</span><strong>{currency(rec.transport_cost_per_kg)} / kg</strong></div>
            <div className="si-calc-row"><span>{t('handlingCost')}</span><strong>{currency(rec.handling_cost_per_kg)} / kg</strong></div>
            <div className="si-calc-row si-calc-total"><span>{t('netRealisationEquals')}</span><strong>{currency(rec.expected_net_realisation_per_kg)} / kg</strong></div>
          </div>

          {/* ---------- Market ranking ---------- */}
          <div className="card" style={{ marginBottom: 16 }}>
            <p className="eyebrow">{t('step2')}</p>
            <h2>{t('marketComparison')}</h2>
            <p className="si-form-desc">{t('marketComparisonDesc', { qty: result.quantity_kg })}</p>

            <div className="rank-list">
              {rankedMarkets.map((m, idx) => {
                const isRecommended = m.market === rec.market;
                const isSelected = selectedMarket && selectedMarket.market === m.market;
                return (
                  <div className={`rank-row ${isRecommended ? 'rank-row-rec' : ''}`} key={m.market}>
                    <div className="rank-medal">{medal(idx)}</div>
                    <div className="rank-info">
                      <div className="rank-name">
                        {m.market}
                        {isRecommended && <span className="si-tag">{t('tagRecommended')}</span>}
                      </div>
                      <div className="rank-figures">
                        <span>{t('colExpectedPrice')}: <b>{currency(m.expected_price_per_kg)}/kg</b></span>
                        <span>{t('colTransportCost')}: <b>{currency(m.transport_cost_per_kg)}/kg</b></span>
                        <span className="rank-net">{t('colNetRealisation')}: <b>{currency(m.expected_net_realisation_per_kg)}/kg</b></span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className={isSelected ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                      onClick={() => handleSelectMarket(m)}
                    >
                      {isSelected ? t('selected') : t('selectMarket')}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------- Selected market / continue ---------- */}
          {selectedMarket && (
            <div className="card" style={{ marginBottom: 16 }}>
              <p className="eyebrow">{t('step3')}</p>
              <h2>{t('selectedMarketLabel')} {selectedMarket.market}</h2>
              <p className="si-form-desc">
                {selectedMarket.crop} · {selectedMarket.quantityKg} kg · {selectedMarket.location} → {selectedMarket.market}
              </p>
              <div className="si-metrics">
                <div className="si-metric"><span>{t('expectedPricePerKg')}</span><strong>{currency(selectedMarket.expectedPricePerKg)}</strong></div>
                <div className="si-metric"><span>{t('transportPerKg')}</span><strong>{currency(selectedMarket.transportCostPerKg)}</strong></div>
                <div className="si-metric si-metric-em"><span>{t('expectedNetPerKg')}</span><strong>{currency(selectedMarket.expectedNetPerKg)}</strong></div>
              </div>
              <div className="lot-actions">
                <button className="btn btn-primary" onClick={() => onContinueToCreateLot(selectedMarket)}>
                  {t('continueToCreateLot')}
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
