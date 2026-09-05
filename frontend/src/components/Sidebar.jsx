const FPO_ITEMS = [
  { view: 'fpo-prices', icon: '📈', label: 'Price intelligence' },
  { view: 'fpo-lots', icon: '🌾', label: 'My lots', badgeKey: 'lots' },
  { view: 'fpo-offers', icon: '🤝', label: 'Offers', badgeKey: 'offers' },
  { view: 'fpo-orders', icon: '📦', label: 'Orders & payments' },
];

const BUYER_ITEMS = [
  { view: 'buyer-market', icon: '🛒', label: 'Marketplace' },
  { view: 'buyer-offers', icon: '📨', label: 'My offers' },
  { view: 'buyer-orders', icon: '📦', label: 'Orders & payments' },
];

export default function Sidebar({ role, view, onNavigate, lotCount, offerCount }) {
  const items = role === 'fpo' ? FPO_ITEMS : BUYER_ITEMS;
  const badgeValue = { lots: lotCount, offers: offerCount };
  return (
    <div className="sidebar">
      {items.map((item) => (
        <button
          key={item.view}
          className={`nav-item ${view === item.view ? 'active' : ''}`}
          onClick={() => onNavigate(item.view)}
        >
          <span>{item.icon}&nbsp;&nbsp;{item.label}</span>
          {item.badgeKey && <span className="badge">{badgeValue[item.badgeKey] ?? 0}</span>}
        </button>
      ))}
      {role === 'fpo' && (
        <>
          <div className="sidebar-label">Support</div>
          <button className={`nav-item ${view === 'fpo-help' ? 'active' : ''}`} onClick={() => onNavigate('fpo-help')}>
            <span>☎️&nbsp;&nbsp;Voice / WhatsApp line</span>
          </button>
        </>
      )}
    </div>
  );
}
