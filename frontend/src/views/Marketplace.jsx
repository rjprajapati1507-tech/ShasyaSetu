import { useMemo, useState } from 'react';
import { STATUS_CLASS, gradeNote } from '../data/mockData';

function EmptyState({ icon, title, sub }) {
  return (
    <div className="empty">
      <div className="e-icon">{icon}</div>
      <b>{title}</b>
      <div>{sub}</div>
    </div>
  );
}

export default function Marketplace({ lots, onMakeOffer }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleLots = useMemo(
    () => lots.filter((l) => l.status === 'Listed' || l.status === 'Offer received'),
    [lots]
  );
  const crops = useMemo(() => ['All', ...new Set(visibleLots.map((l) => l.crop))], [visibleLots]);
  const filtered = activeFilter === 'All' ? visibleLots : visibleLots.filter((l) => l.crop === activeFilter);

  return (
    <div>
      <div className="page-head">
        <h1>Marketplace</h1>
        <p>Browse verified lots from farmers and FPOs near you.</p>
      </div>
      <div className="filter-bar">
        {crops.map((c) => (
          <button key={c} className={`chip ${activeFilter === c ? 'active' : ''}`} onClick={() => setActiveFilter(c)}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="🛒" title="No lots match this filter" sub="Try a different crop filter." />
      ) : (
        filtered.map((lot) => (
          <div className="lot-card" key={lot.id}>
            <div className="lot-top">
              <div>
                <div className="lot-title">
                  {lot.crop} · {lot.id} <span className={`grade-pill grade-${lot.grade}`}>Grade {lot.grade}</span>
                  {lot.isSample && <span className="grade-pill" style={{ background: 'var(--surface-sunk)', color: 'var(--ink-muted)' }}>Sample/demo lot</span>}
                </div>
                <div className="lot-meta">{lot.fpo} · {lot.originLocation} → {lot.market} · {gradeNote(lot.grade)}</div>
              </div>
              <span className={`status-pill ${STATUS_CLASS[lot.status]}`}>{lot.status}</span>
            </div>
            <div className="lot-body">
              <div><span>Available</span><b>{lot.qty} qtl</b></div>
              <div><span>Asking price</span><b>₹{lot.price.toLocaleString('en-IN')}/qtl</b></div>
              <div><span>Total value</span><b>₹{(lot.qty * lot.price).toLocaleString('en-IN')}</b></div>
            </div>
            <div className="lot-actions">
              <button className="btn btn-primary btn-sm" onClick={() => onMakeOffer(lot.id)}>Make an offer</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
