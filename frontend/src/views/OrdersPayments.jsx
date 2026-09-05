import { STATUS_STEPS } from '../data/mockData';

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
  const heading = isFpoView
    ? { title: 'Orders & payments', sub: 'Track escrow status, logistics and payment release for locked deals.' }
    : { title: 'Orders & payments', sub: "Escrow-protected orders — your payment is held safely until delivery is confirmed." };

  return (
    <div>
      <div className="page-head"><h1>{heading.title}</h1><p>{heading.sub}</p></div>

      {orders.length === 0 ? (
        <EmptyState icon="📦" title="No active orders" sub="Orders appear here once a deal is locked and escrow is funded (simulated escrow — no real payment moves)." />
      ) : (
        orders.slice().reverse().map((o) => {
          const nextLabel = STATUS_STEPS[o.stepIndex + 1];
          let actionBtn;
          if (o.disputed) {
            actionBtn = <span className="status-pill st-Dispute">Payment frozen — grievance under review</span>;
          } else if (nextLabel) {
            actionBtn = <button className="btn btn-primary btn-sm" onClick={() => onAdvance(o.id)}>Mark: {nextLabel}</button>;
          } else if (!o.rated) {
            actionBtn = <button className="btn btn-amber btn-sm" onClick={() => onRate(o.id)}>Rate this deal</button>;
          } else {
            actionBtn = <span style={{ fontSize: 12.5, color: 'var(--green-700)', fontWeight: 600 }}>✓ Rated & complete</span>;
          }

          return (
            <div className="lot-card" key={o.id}>
              <div className="lot-top">
                <div>
                  <div className="lot-title">{o.lot.crop} · {o.id}</div>
                  <div className="lot-meta">{isFpoView ? o.buyer.name : o.lot.fpo} · {o.qty} quintals · ₹{o.price.toLocaleString('en-IN')}/qtl</div>
                </div>
                <span className={`status-pill ${o.disputed ? 'st-Dispute' : (o.stepIndex >= 4 ? 'st-Released' : 'st-Locked')}`}>
                  {o.disputed ? 'Dispute raised' : STATUS_STEPS[o.stepIndex]}
                </span>
              </div>
              <div className="timeline">
                {STATUS_STEPS.map((label, i) => (
                  <div className={`tl-step ${i <= o.stepIndex ? 'done' : ''}`} key={label}>
                    <div className="tl-line" />
                    <div className="tl-dot">{i <= o.stepIndex ? '✓' : i + 1}</div>
                    <div className="tl-label">{label}</div>
                  </div>
                ))}
              </div>
              <div className="hint-banner" style={{ marginTop: 10 }}>Simulated escrow for this demo — no real payment is held or transferred.</div>
              <div className="lot-actions">
                {actionBtn}
                {!o.disputed && o.stepIndex < 4 && (
                  <button className="btn btn-danger-ghost btn-sm" onClick={() => onDispute(o.id)}>Raise grievance</button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
