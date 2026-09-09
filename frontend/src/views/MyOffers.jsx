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

const STATUS_KEY = { Pending: 'statusPending', Accepted: 'statusAccepted', Rejected: 'statusRejected' };

export default function MyOffers({ lots, currentBuyerId }) {
  const { t } = useTranslation();
  const myOffers = [];
  lots.forEach((lot) => lot.offers.forEach((o) => {
    if (o.buyer.id === currentBuyerId) myOffers.push({ lot, o });
  }));

  return (
    <div>
      <div className="page-head">
        <h1>{t('myOffersTitle')}</h1>
        <p>{t('myOffersDesc')}</p>
      </div>

      {myOffers.length === 0 ? (
        <EmptyState icon="📨" title={t('noOffersSentTitle')} sub={t('noOffersSentDesc')} />
      ) : (
        myOffers.slice().reverse().map(({ lot, o }) => (
          <div className="lot-card" key={o.id}>
            <div className="lot-top">
              <div>
                <div className="lot-title">{lot.crop} · {lot.id}</div>
                <div className="lot-meta">{lot.fpo} · {t('yourOffer')} ₹{o.price.toLocaleString('en-IN')}/qtl for {o.qty} qtl</div>
              </div>
              <span className={`status-pill ${o.status === 'Accepted' ? 'st-Released' : o.status === 'Rejected' ? 'st-Dispute' : 'st-Offer'}`}>
                {t(STATUS_KEY[o.status] || 'statusPending')}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
