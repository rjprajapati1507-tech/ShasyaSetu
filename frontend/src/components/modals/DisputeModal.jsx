import { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n/I18nContext';

const REASON_KEYS = ['disputeReason1', 'disputeReason2', 'disputeReason3', 'disputeReason4', 'disputeReason5'];

export default function DisputeModal({ open, onClose, onSubmit }) {
  const { t } = useTranslation();
  const [reasonKey, setReasonKey] = useState(REASON_KEYS[0]);
  const [details, setDetails] = useState('');

  useEffect(() => { if (open) { setReasonKey(REASON_KEYS[0]); setDetails(''); } }, [open]);

  if (!open) return null;

  return (
    <div className="overlay show">
      <div className="modal">
        <h2>{t('disputeTitle')}</h2>
        <p className="sub">{t('disputeSub')}</p>
        <div className="field">
          <label>{t('disputeReasonLabel')}</label>
          <select value={reasonKey} onChange={(e) => setReasonKey(e.target.value)}>
            {REASON_KEYS.map((k) => <option key={k} value={k}>{t(k)}</option>)}
          </select>
        </div>
        <div className="field">
          <label>{t('disputeDetailsLabel')}</label>
          <input value={details} onChange={(e) => setDetails(e.target.value)} placeholder={t('disputeDetailsPlaceholder')} />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>{t('cancel')}</button>
          <button className="btn btn-amber" onClick={() => onSubmit({ reason: t(reasonKey), details })}>{t('submitGrievance')}</button>
        </div>
      </div>
    </div>
  );
}
