import { useTranslation } from '../i18n/I18nContext';
import { NAVIGATION } from '../config/navigation';

export default function Sidebar({ role, view, onNavigate, lotCount, offerCount }) {
  const { t } = useTranslation();
  const items = NAVIGATION[role] || NAVIGATION.fpo;
  const badgeValue = { lots: lotCount, offers: offerCount };

  return (
    <nav className="sidebar" aria-label={t('primaryNavigation')}>
      <div className="sidebar-section-label">{t('workspaceMenu')}</div>
      {items.map((item) => (
        <button key={item.view} type="button" className={'nav-item ' + (view === item.view ? 'active' : '')} aria-current={view === item.view ? 'page' : undefined} onClick={() => onNavigate(item.view)}>
          <span className="nav-item-label"><span className="nav-icon" aria-hidden="true">{item.icon}</span><span>{t(item.labelKey)}</span></span>
          {item.badgeKey && <span className="badge">{badgeValue[item.badgeKey] ?? 0}</span>}
        </button>
      ))}
      {role === 'fpo' && (
        <div className="sidebar-footer">
          <div className="sidebar-label">{t('sidebarSupport')}</div>
          <button type="button" className={'nav-item ' + (view === 'fpo-help' ? 'active' : '')} aria-current={view === 'fpo-help' ? 'page' : undefined} onClick={() => onNavigate('fpo-help')}>
            <span className="nav-item-label"><span className="nav-icon" aria-hidden="true">☎️</span><span>{t('navHelp')}</span></span>
          </button>
          <div className="sidebar-trust"><span aria-hidden="true">●</span> {t('secureWorkspace')}</div>
        </div>
      )}
    </nav>
  );
}
