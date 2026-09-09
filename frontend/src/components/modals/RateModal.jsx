import { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/I18nContext';

export default function RateModal({ open, onClose, onSubmit }) {
  const { t } = useTranslation();
  const [stars, setStars] = useState(0);
  const [err, setErr] = useState(false);

  useEffect(() => { if (open) { setStars(0); setErr(false); } }, [open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (stars === 0) { setErr(true); return; }
    onSubmit(stars);
  };

  return (
    <div className="overlay show">
      <div className="modal">
        <h2>{t('rateTitle')}</h2>
        <p className="sub">{t('rateSub')}</p>
        <div className="star-row">
          {[1, 2, 3, 4, 5].map((v) => (
            <span key={v} className={`star ${v <= stars ? 'on' : ''}`} onClick={() => setStars(v)}>★</span>
          ))}
        </div>
        {err && <div className="field-error" style={{ display: 'block' }}>{t('errSelectStars')}</div>}
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>{t('skip')}</button>
          <button className="btn btn-primary" onClick={handleSubmit}>{t('submitRating')}</button>
        </div>
      </div>
    </div>
  );
}
