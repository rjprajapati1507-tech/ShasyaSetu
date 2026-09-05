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
  const lotsWithOffers = lots.filter((l) => l.offers.some((o) => o.status === 'Pending'));

  return (
    <div>
      <div className="page-head">
        <h1>Offers from buyers</h1>
        <p>Review, negotiate or accept digital offers on your listed lots.</p>
      </div>

      {lotsWithOffers.length === 0 ? (
        <EmptyState icon="🤝" title="No pending offers" sub="When a buyer makes an offer on your lot, it will show up here." />
      ) : (
        lotsWithOffers.map((lot) => (
          <div className="lot-card" key={lot.id}>
            <div className="lot-top">
              <div>
                <div className="lot-title">{lot.crop} · {lot.id} <span className={`grade-pill grade-${lot.grade}`}>Grade {lot.grade}</span></div>
                <div className="lot-meta">Your ask: ₹{lot.price.toLocaleString('en-IN')}/qtl · {lot.qty} quintals listed</div>
              </div>
            </div>
            {lot.offers.filter((o) => o.status === 'Pending').map((o) => (
              <div className="offer-row" key={o.id}>
                <div>
                  <div className="who">{o.buyer.name} <span className="verified-tag">✓ Verified</span></div>
                  <div className="trust">GST {o.buyer.gst} · ★ {o.buyer.rating} rating (sample buyer data)</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div className="amt">₹{o.price.toLocaleString('en-IN')}/qtl · {o.qty} qtl</div>
                  <button className="btn btn-primary btn-sm" onClick={() => onAccept(lot.id, o.id)}>Accept</button>
                  <button className="btn btn-secondary btn-sm" onClick={() => onReject(lot.id, o.id)}>Decline</button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
