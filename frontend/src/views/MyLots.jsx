import { STATUS_CLASS, gradeNote, BUYERS } from '../data/mockData';

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
  return (
    <div>
      <div className="page-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 10 }}>
        <div>
          <h1>My lots</h1>
          <p>Create a lot to list your crop and reach verified buyers.</p>
        </div>
        <button className="btn btn-primary" onClick={onCreateNew}>＋ Create new lot</button>
      </div>

      {lots.length === 0 ? (
        <EmptyState icon="🌾" title="No lots yet" sub="Create your first lot to reach verified buyers." />
      ) : (
        lots.slice().reverse().map((lot) => (
          <div className="lot-card" key={lot.id}>
            <div className="lot-top">
              <div>
                <div className="lot-title">
                  {lot.crop} · {lot.id} <span className={`grade-pill grade-${lot.grade}`}>Grade {lot.grade}</span>
                  {lot.isSample && <span className="grade-pill" style={{ background: 'var(--surface-sunk)', color: 'var(--ink-muted)' }}>Sample/demo lot</span>}
                </div>
                <div className="lot-meta">
                  {lot.qty} quintals · {lot.originLocation} → {lot.market} · {gradeNote(lot.grade)}
                </div>
              </div>
              <span className={`status-pill ${STATUS_CLASS[lot.status]}`}>{lot.status}</span>
            </div>
            <div className="lot-body">
              <div><span>Asking price</span><b>₹{lot.price.toLocaleString('en-IN')}/qtl</b></div>
              <div><span>Offers received</span><b>{lot.offers.length}</b></div>
              <div><span>Est. value</span><b>₹{(lot.qty * lot.price).toLocaleString('en-IN')}</b></div>
            </div>
            {lot.priceIntel && (
              <div className="hint-banner" style={{ marginTop: 12, background: 'var(--green-100)', borderColor: '#BFDDCB', color: 'var(--green-900)' }}>
                Created from a ShasyaSetu recommendation — expected net realisation ₹{lot.priceIntel.expected_net_realisation_per_kg.toFixed(2)}/kg (sample data).
              </div>
            )}
            {lot.status === 'Listed' && lot.offers.length === 0 && (
              <div className="hint-banner">💡 Waiting for buyer offers — visible to all {BUYERS.length} verified buyers on the marketplace.</div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
