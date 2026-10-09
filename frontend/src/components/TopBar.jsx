import { CURRENT_BUYER } from '../data/mockData';
import { useTranslation } from '../i18n/I18nContext';
import { LANGUAGES } from '../i18n/translations';

export default function TopBar({ role, onRoleChange }) {
  const { t, lang, setLang } = useTranslation();
  const isFpo = role === 'fpo';
  return (
    <div className="topbar">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">SS</div>
        <div>
          <div className="brand-name">{t('appName')}</div>
          <div className="brand-tag">{t('appTagline')} — {t('demoBuild')}</div>
        </div>
      </div>
      <div className="role-switch">
        <button className={`role-btn ${isFpo ? 'active' : ''}`} onClick={() => onRoleChange('fpo')}>{t('fpoPortal')}</button>
        <button className={`role-btn ${!isFpo ? 'active' : ''}`} onClick={() => onRoleChange('buyer')}>{t('buyerPortal')}</button>
      </div>
      <div className="lang-switch" aria-label={t('language')}>
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            className={`lang-btn ${lang === l.code ? 'active' : ''}`}
            onClick={() => setLang(l.code)}
            type="button"
          >
            {l.label}
          </button>
        ))}
      </div>
      <div className="user-chip">
        <div className="avatar">{isFpo ? 'SF' : 'AF'}</div>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{isFpo ? 'Saurashtra Farmers FPO' : CURRENT_BUYER.name}</div>
          <div>{isFpo ? t('fpoOrgLine') : `${t('verifiedBuyerLine')} · ★ ${CURRENT_BUYER.rating}`}</div>
        </div>
      </div>
    </div>
  );
}
