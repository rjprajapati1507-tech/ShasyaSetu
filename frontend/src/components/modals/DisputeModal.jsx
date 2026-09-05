import { useEffect, useState } from 'react';

const REASONS = [
  'Quality mismatch on delivery',
  'Delayed pickup / transport',
  'Quantity shortfall',
  'Payment not released on time',
  'Other',
];

export default function DisputeModal({ open, onClose, onSubmit }) {
  const [reason, setReason] = useState(REASONS[0]);
  const [details, setDetails] = useState('');

  useEffect(() => { if (open) { setReason(REASONS[0]); setDetails(''); } }, [open]);

  if (!open) return null;

  return (
    <div className="overlay show">
      <div className="modal">
        <h2>Raise a grievance</h2>
        <p className="sub">Payment for this order will be frozen until it's resolved by a MandiSetu mediator.</p>
        <div className="field">
          <label>What went wrong?</label>
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            {REASONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Details</label>
          <input value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Briefly describe the issue" />
        </div>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-amber" onClick={() => onSubmit({ reason, details })}>Submit grievance</button>
        </div>
      </div>
    </div>
  );
}
