import { CURRENT_BUYER } from '../data/mockData';

export default function TopBar({ role, onRoleChange }) {
  const isFpo = role === 'fpo';
  return (
    <div className="topbar">
      <div className="brand">
        <div className="brand-mark">MS</div>
        <div>
          <div className="brand-name">MandiSetu</div>
          <div className="brand-tag">Farm to buyer, transparently — DEMO BUILD</div>
        </div>
      </div>
      <div className="role-switch">
        <button className={`role-btn ${isFpo ? 'active' : ''}`} onClick={() => onRoleChange('fpo')}>FPO / Farmer portal</button>
        <button className={`role-btn ${!isFpo ? 'active' : ''}`} onClick={() => onRoleChange('buyer')}>Buyer portal</button>
      </div>
      <div className="user-chip">
        <div className="avatar">{isFpo ? 'SF' : 'AF'}</div>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{isFpo ? 'Saurashtra Farmers FPO' : CURRENT_BUYER.name}</div>
          <div>{isFpo ? '12 members · Nashik dist.' : `Verified buyer · ★ ${CURRENT_BUYER.rating}`}</div>
        </div>
      </div>
    </div>
  );
}
