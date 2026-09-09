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

export default function Offers({ lots, onAccept, onReject }) {
  const { t } = useTranslation();
  const lotsWithOffers = lots.filter((l) => l.offers.some((o) => o.status === 'Pending'));

  return (
    <div>
      <div className="page-head">
        <h1>{t('offersTitle')}</h1>
        <p>{t('offersDesc')}</p>
      </div>

      {lotsWithOffers.length === 0 ? (
        <EmptyState icon="🤝" title={t('noOffersTitle')} sub={t('noOffersDesc')} />
      ) : (
        lotsWithOffers.map((lot) => (
          <div className="lot-card" key={lot.id}>
            <div className="lot-top">
              <div>
                <div className="lot-title">{lot.crop} · {lot.id} <span className={`grade-pill grade-${lot.grade}`}>Grade {lot.grade}</span></div>
                <div className="lot-meta">{t('yourAsk')} ₹{lot.price.toLocaleString('en-IN')}/qtl · {lot.qty} quintals {t('listed')}</div>
              </div>
            </div>
            {lot.offers.filter((o) => o.status === 'Pending').map((o) => (
              <div className="offer-row" key={o.id}>
                <div>
                  <div className="who">{o.buyer.name} <span className="verified-tag">{t('verifiedTag')}</span></div>
                  <div className="trust">GST {o.buyer.gst} · ★ {o.buyer.rating} {t('sampleBuyerData')}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="amt">₹{o.price.toLocaleString('en-IN')}/qtl · {o.qty} qtl</div>
                  <button className="btn btn-primary btn-sm" onClick={() => onAccept(lot.id, o.id)}>{t('accept')}</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => onReject(lot.id, o.id)}>{t('decline')}</button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
