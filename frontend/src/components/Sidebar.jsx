import { useTranslation } from '../i18n/I18nContext';

export default function Sidebar({ role, view, onNavigate, lotCount, offerCount }) {
  const { t } = useTranslation();

  const FPO_ITEMS = [
    { view: 'fpo-prices', icon: '📈', label: t('navPriceIntel') },
    { view: 'fpo-lots', icon: '🌾', label: t('navMyLots'), badgeKey: 'lots' },
    { view: 'fpo-offers', icon: '🤝', label: t('navOffers'), badgeKey: 'offers' },
    { view: 'fpo-orders', icon: '📦', label: t('navOrders') },
  ];

  const BUYER_ITEMS = [
    { view: 'buyer-market', icon: '🛒', label: t('navMarketplace') },
    { view: 'buyer-offers', icon: '📨', label: t('navMyOffers') },
    { view: 'buyer-orders', icon: '📦', label: t('navOrders') },
  ];

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
          <div className="sidebar-label">{t('sidebarSupport')}</div>
          <button className={`nav-item ${view === 'fpo-help' ? 'active' : ''}`} onClick={() => onNavigate('fpo-help')}>
            <span>☎️&nbsp;&nbsp;{t('navHelp')}</span>
          </button>
        </>
      )}
    </div>
  );
}
