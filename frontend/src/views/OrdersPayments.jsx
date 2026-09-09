import { STATUS_STEPS } from '../data/mockData';
import { useTranslation } from '../i18n/I18nContext';

const STEP_KEYS = ['stepEscrowFunded', 'stepPickedUp', 'stepInTransit', 'stepDelivered', 'stepPaymentReleased'];

function EmptyState({ icon, title, sub }) {
  return (
    <div className="empty">
      <div className="e-icon">{icon}</div>
      <b>{title}</b>
      <div>{sub}</div>
    </div>
  );
}

export default function OrdersPayments({ orders, isFpoView, onAdvance, onRate, onDispute }) {
  const { t } = useTranslation();
  const heading = isFpoView
    ? { title: t('ordersTitle'), sub: t('ordersDescFpo') }
    : { title: t('ordersTitle'), sub: t('ordersDescBuyer') };

  return (
    <div>
      <div className="page-head"><h1>{heading.title}</h1><p>{heading.sub}</p></div>

      {orders.length === 0 ? (
        <EmptyState icon="📦" title={t('noOrdersTitle')} sub={t('noOrdersDesc')} />
      ) : (
        orders.slice().reverse().map((o) => {
          const hasNext = o.stepIndex + 1 < STATUS_STEPS.length;
          let actionBtn;
          if (o.disputed) {
            actionBtn = <span className="status-pill st-Dispute">{t('paymentFrozen')}</span>;
          } else if (hasNext) {
            actionBtn = <button className="btn btn-primary btn-sm" onClick={() => onAdvance(o.id)}>{t('markAs')} {t(STEP_KEYS[o.stepIndex + 1])}</button>;
          } else if (!o.rated) {
            actionBtn = <button className="btn btn-amber btn-sm" onClick={() => onRate(o.id)}>{t('rateThisDeal')}</button>;
          } else {
            actionBtn = <span style={{ fontSize: 12.5, color: 'var(--green-700)', fontWeight: 600 }}>{t('ratedComplete')}</span>;
          }

          return (
            <div className="lot-card" key={o.id}>
              <div className="lot-top">
                <div>
                  <div className="lot-title">{o.lot.crop} · {o.id}</div>
                  <div className="lot-meta">{isFpoView ? o.buyer.name : o.lot.fpo} · {o.qty} quintals · ₹{o.price.toLocaleString('en-IN')}/qtl</div>
                </div>
                <span className={`status-pill ${o.disputed ? 'st-Dispute' : (o.stepIndex >= 4 ? 'st-Released' : 'st-Locked')}`}>
                  {o.disputed ? t('disputeRaised') : t(STEP_KEYS[o.stepIndex])}
                </span>
              </div>
              <div className="timeline">
                {STATUS_STEPS.map((label, i) => (
                  <div className={`tl-step ${i <= o.stepIndex ? 'done' : ''}`} key={label}>
                    <div className="tl-line" />
                    <div className="tl-dot">{i <= o.stepIndex ? '✓' : i + 1}</div>
                    <div className="tl-label">{t(STEP_KEYS[i])}</div>
                  </div>
                ))}
              </div>
              <div className="hint-banner" style={{ marginTop: 10 }}>{t('simulatedEscrowNote')}</div>
              <div className="lot-actions">
                {actionBtn}
                {!o.disputed && o.stepIndex < 4 && (
                  <button className="btn btn-danger-ghost btn-sm" onClick={() => onDispute(o.id)}>{t('raiseGrievance')}</button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
