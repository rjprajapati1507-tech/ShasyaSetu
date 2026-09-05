import { useEffect, useState } from 'react';

export default function MakeOfferModal({ open, lot, onClose, onSubmit }) {
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [priceErr, setPriceErr] = useState('');
  const [qtyErr, setQtyErr] = useState('');

  useEffect(() => {
    if (open) { setPrice(''); setQty(''); setPriceErr(''); setQtyErr(''); }
  }, [open, lot]);

  if (!open || !lot) return null;

  const handleSubmit = () => {
    const priceNum = parseFloat(price);
    const qtyNum = parseFloat(qty);
    let ok = true;
    if (!priceNum || priceNum <= 0) { setPriceErr('Enter a valid price'); ok = false; } else setPriceErr('');
    if (!qtyNum || qtyNum <= 0 || qtyNum > lot.qty) {
      setQtyErr(qtyNum > lot.qty ? `Only ${lot.qty} quintals available` : 'Enter a valid quantity');
      ok = false;
    } else setQtyErr('');
    if (!ok) return;
    onSubmit({ price: priceNum, qty: qtyNum });
  };

  return (
    <div className="overlay show">
      <div className="modal">
        <h2>Make an offer</h2>
        <p className="sub">Offer on {lot.crop} · {lot.id} — seller asking ₹{lot.price.toLocaleString('en-IN')}/qtl · {lot.qty} quintals available</p>
        <div className="field">
          <label>Your offer price (₹ / quintal)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 2300" />
          {priceErr && <div className="field-error" style={{ display: 'block' }}>{priceErr}</div>}
        </div>
        <div className="field">
          <label>Quantity you want (quintals)</label>
          <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="e.g. 40" />
          {qtyErr && <div className="field-error" style={{ display: 'block' }}>{qtyErr}</div>}
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Send offer</button>
        </div>
      </div>
    </div>
  );
}
