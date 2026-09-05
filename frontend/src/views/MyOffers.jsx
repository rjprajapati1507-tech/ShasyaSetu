function EmptyState({ icon, title, sub }) {
  return (
    <div className="empty">
      <div className="e-icon">{icon}</div>
      <b>{title}</b>
      <div>{sub}</div>
    </div>
  );
}

export default function MyOffers({ lots, currentBuyerId }) {
  const myOffers = [];
  lots.forEach((lot) => lot.offers.forEach((o) => {
    if (o.buyer.id === currentBuyerId) myOffers.push({ lot, o });
  }));

  return (
    <div>
      <div className="page-head">
        <h1>My offers</h1>
        <p>Offers you've sent, awaiting the seller's response.</p>
      </div>

      {myOffers.length === 0 ? (
        <EmptyState icon="📨" title="No offers sent yet" sub="Go to the marketplace and make an offer on a lot." />
      ) : (
        myOffers.slice().reverse().map(({ lot, o }) => (
          <div className="lot-card" key={o.id}>
            <div className="lot-top">
              <div>
                <div className="lot-title">{lot.crop} · {lot.id}</div>
                <div className="lot-meta">{lot.fpo} · your offer ₹{o.price.toLocaleString('en-IN')}/qtl for {o.qty} qtl</div>
              </div>
              <span className={`status-pill ${o.status === 'Accepted' ? 'st-Released' : o.status === 'Rejected' ? 'st-Dispute' : 'st-Offer'}`}>
                {o.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
