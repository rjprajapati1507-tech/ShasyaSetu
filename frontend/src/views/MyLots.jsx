import { STATUS_CLASS, gradeNote, BUYERS } from '../data/mockData';
import { useTranslation } from '../i18n/I18nContext';

function EmptyState({ icon, title, sub }) {
  return (
    <div className="empty">
      <div className="e-icon">{icon}</div>
      <b>{title}</b>
      <div>{sub}</div>
    </div>
  );
}

export default function MyLots({ lots, onCreateNew }) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1>{t('myLotsTitle')}</h1>
          <p>{t('myLotsDesc')}</p>
        </div>
        <button className="btn btn-primary" onClick={onCreateNew}>{t('createNewLot')}</button>
      </div>

      {lots.length === 0 ? (
        <EmptyState icon="🌾" title={t('noLotsTitle')} sub={t('noLotsDesc')} />
      ) : (
        lots.slice().reverse().map((lot) => (
          <div className="lot-card" key={lot.id}>
            <div className="lot-top">
              <div>
                <div className="lot-title">
                  {lot.crop} · {lot.id} <span className={`grade-pill grade-${lot.grade}`}>Grade {lot.grade}</span>
                  {lot.isSample && <span className="grade-pill" style={{ background: 'var(--surface-sunk)', color: 'var(--ink-muted)' }}>{t('sampleDemoLot')}</span>}
                </div>
                <div className="lot-meta">
                  {lot.qty} quintals · {lot.originLocation} → {lot.market} · {gradeNote(lot.grade)}
                </div>
              </div>
              <span className={`status-pill ${STATUS_CLASS[lot.status]}`}>{lot.status}</span>
            </div>
            <div className="lot-body">
              <div><span>{t('askingPrice')}</span><b>₹{lot.price.toLocaleString('en-IN')}/qtl</b></div>
              <div><span>{t('offersReceived')}</span><b>{lot.offers.length}</b></div>
              <div><span>{t('estValue')}</span><b>₹{(lot.qty * lot.price).toLocaleString('en-IN')}</b></div>
            </div>
            {lot.priceIntel && (
              <div className="hint-banner" style={{ marginTop: 12, background: 'var(--green-100)', borderColor: '#BFDDCB', color: 'var(--green-900)' }}>
                {t('fromRecommendation', { value: lot.priceIntel.expected_net_realisation_per_kg.toFixed(2) })}
              </div>
            )}
            {lot.status === 'Listed' && lot.offers.length === 0 && (
              <div className="hint-banner">{t('waitingForOffers', { count: BUYERS.length })}</div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
