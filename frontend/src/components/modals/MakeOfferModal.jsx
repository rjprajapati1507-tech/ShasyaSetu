import { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/I18nContext';

export default function MakeOfferModal({ open, lot, onClose, onSubmit }) {
  const { t } = useTranslation();
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
    if (!priceNum || priceNum <= 0) { setPriceErr(t('errPrice')); ok = false; } else setPriceErr('');
    if (!qtyNum || qtyNum <= 0 || qtyNum > lot.qty) {
      setQtyErr(qtyNum > lot.qty ? t('errOnlyAvailable', { qty: lot.qty }) : t('errValidQty'));
      ok = false;
    } else setQtyErr('');
    if (!ok) return;
    onSubmit({ price: priceNum, qty: qtyNum });
  };

  return (
    <div className="overlay show">
      <div className="modal">
        <h2>{t('makeOfferTitle')}</h2>
        <p className="sub">{lot.crop} · {lot.id} — ₹{lot.price.toLocaleString('en-IN')}/qtl · {lot.qty} qtl</p>
        <div className="field">
          <label>{t('labelOfferPrice')}</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 2300" />
          {priceErr && <div className="field-error" style={{ display: 'block' }}>{priceErr}</div>}
        </div>
        <div className="field">
          <label>{t('labelOfferQty')}</label>
          <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} placeholder="e.g. 40" />
          {qtyErr && <div className="field-error" style={{ display: 'block' }}>{qtyErr}</div>}
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>{t('cancel')}</button>
          <button className="btn btn-primary" onClick={handleSubmit}>{t('sendOffer')}</button>
        </div>
      </div>
    </div>
  );
}
