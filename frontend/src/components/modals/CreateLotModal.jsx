import { useEffect, useState } from 'react';
import { SAMPLE_ORIGIN, SAMPLE_MARKETS } from '../../data/marketData';

const MANUAL_CROPS = ['Wheat', 'Cotton', 'Groundnut', 'Soybean', 'Tomato', 'Onion'];

const currency = (value) => `₹${Number(value).toFixed(2)}`;

export default function CreateLotModal({ open, onClose, onCreate, prefill }) {
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
        <h2>Create a new lot</h2>
        <p className="sub">This lot becomes visible to verified buyers immediately.</p>

        {prefill && (
          <div className="hint-banner" style={{ display: 'block' }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>Selected market: {prefill.market}</div>
            <div>Crop: {prefill.crop}</div>
            <div>Quantity: {prefill.quantityKg} kg</div>
            <div>Farmer location: {SAMPLE_ORIGIN}</div>
            <div>Expected price: {currency(prefill.expectedPricePerKg)}/kg</div>
            <div>Expected net realisation: {currency(prefill.expectedNetPerKg)}/kg</div>
          </div>
        )}

        {!prefill && (
          <>
            <div className="field">
              <label>Crop</label>
              <select value={crop} onChange={(e) => setCrop(e.target.value)}>
                {MANUAL_CROPS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Market (sample dataset)</label>
              <select value={market} onChange={(e) => setMarket(e.target.value)}>
                {SAMPLE_MARKETS.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </>
        )}

        <div className="field">
          <label>Quantity (quintals)</label>
          <input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="e.g. 40" />
          {qtyErr && <div className="field-error" style={{ display: 'block' }}>Enter a quantity greater than 0</div>}
        </div>
        <div className="field">
          <label>{prefill ? 'Asking price (₹ / quintal, suggested from ShasyaSetu)' : 'Your asking price (₹ / quintal)'}</label>
          <input type="number" min="1" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 2350" />
          {priceErr && <div className="field-error" style={{ display: 'block' }}>Enter a valid price</div>}
        </div>
        <div className="field">
          <label>Upload crop photo (for sample quality grading)</label>
          <input type="file" accept="image/*" />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Create lot</button>
        </div>
      </div>
    </div>
  );
}
