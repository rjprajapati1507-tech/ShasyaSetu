import { useEffect, useState } from 'react';
import { SAMPLE_ORIGIN, SAMPLE_MARKETS } from '../../data/marketData';
import { useTranslation } from '../../i18n/I18nContext';

const MANUAL_CROPS = ['Wheat', 'Cotton', 'Groundnut', 'Soybean', 'Tomato', 'Onion'];

const currency = (value) => `₹${Number(value).toFixed(2)}`;

export default function CreateLotModal({ open, onClose, onCreate, prefill }) {
  const { t } = useTranslation();
  const [crop, setCrop] = useState(MANUAL_CROPS[0]);
  const [market, setMarket] = useState(SAMPLE_MARKETS[0]);
  const [qty, setQty] = useState('');
  const [price, setPrice] = useState('');
  const [qtyErr, setQtyErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);

  // When arriving with a selection from Price Intelligence, pre-fill everything
  // from the real recommendation data instead of making the farmer re-enter it.
  useEffect(() => {
    if (!open) return;
    if (prefill) {
      setCrop(prefill.crop);
      setMarket(prefill.market);
      // Exact unit conversions (kg -> quintal, ₹/kg -> ₹/quintal) of real API
      // figures — not invented data. The price stays editable as a suggestion.
      setQty(String(Math.round(prefill.quantityKg / 100)));
      setPrice(String(Math.round(prefill.expectedPricePerKg * 100)));
    } else {
      setCrop(MANUAL_CROPS[0]);
      setMarket(SAMPLE_MARKETS[0]);
      setQty('');
      setPrice('');
    }
    setQtyErr(false);
    setPriceErr(false);
  }, [open, prefill]);

  if (!open) return null;

  const handleSubmit = () => {
    const qtyNum = parseFloat(qty);
    const priceNum = parseFloat(price);
    let ok = true;
    if (!qtyNum || qtyNum <= 0) { setQtyErr(true); ok = false; } else setQtyErr(false);
    if (!priceNum || priceNum <= 0) { setPriceErr(true); ok = false; } else setPriceErr(false);
    if (!ok) return;

    const grades = ['A', 'A', 'B', 'B', 'C'];
    const grade = grades[Math.floor(Math.random() * grades.length)];

    onCreate({
      crop,
      qty: qtyNum,
      price: priceNum,
      grade,
      market,
      originLocation: SAMPLE_ORIGIN,
      priceIntel: prefill
        ? {
            expected_price_per_kg: prefill.expectedPricePerKg,
            transport_cost_per_kg: prefill.transportCostPerKg,
            expected_net_realisation_per_kg: prefill.expectedNetPerKg,
          }
        : null,
    });
  };

  return (
    <div className="overlay show">
      <div className="modal">
        <h2>{t('createLotTitle')}</h2>
        <p className="sub">{t('createLotSub')}</p>

        {prefill && (
          <div className="hint-banner" style={{ display: 'block' }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{t('selectedMarketLabel')} {prefill.market}</div>
            <div>{t('labelCrop')}: {prefill.crop}</div>
            <div>{t('labelQuantityKg')}: {prefill.quantityKg} kg</div>
            <div>{t('labelFarmerLocation')}: {SAMPLE_ORIGIN}</div>
            <div>{t('expectedPricePerKg')}: {currency(prefill.expectedPricePerKg)}</div>
            <div>{t('expectedNetPerKg')}: {currency(prefill.expectedNetPerKg)}</div>
          </div>
        )}

        {!prefill && (
          <>
            <div className="field">
              <label>{t('labelCrop')}</label>
              <select value={crop} onChange={(e) => setCrop(e.target.value)}>
                {MANUAL_CROPS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label>{t('labelMarketSample')}</label>
              <select value={market} onChange={(e) => setMarket(e.target.value)}>
                {SAMPLE_MARKETS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </>
        )}

        <div className="field">
          <label>{t('labelQuantityQuintal')}</label>
          <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="e.g. 40" />
          {qtyErr && <div className="field-error" style={{ display: 'block' }}>{t('errQuantity')}</div>}
        </div>
        <div className="field">
          <label>{prefill ? t('labelAskingPriceSuggested') : t('labelAskingPrice')}</label>
          <input type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 2350" />
          {priceErr && <div className="field-error" style={{ display: 'block' }}>{t('errPrice')}</div>}
        </div>
        <div className="field">
          <label>{t('labelUploadPhoto')}</label>
          <input type="file" accept="image/*" />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>{t('cancel')}</button>
          <button className="btn btn-primary" onClick={handleSubmit}>{t('createLot')}</button>
        </div>
      </div>
    </div>
  );
}
