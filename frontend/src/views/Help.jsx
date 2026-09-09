import { useTranslation } from '../i18n/I18nContext';

export default function Help() {
  const { t } = useTranslation();
  return (
    <div>
      <div className="page-head">
        <h1>{t('helpTitle')}</h1>
        <p>{t('helpDesc')}</p>
      </div>
      <div className="grid grid-3">
        <div className="card">
          <h3>{t('helpIvrTitle')}</h3>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 8 }}>
            {t('helpIvrDesc', { number: '1800-121-4000' })}
          </p>
        </div>
        <div className="card">
          <h3>{t('helpWhatsappTitle')}</h3>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 8 }}>
            {t('helpWhatsappDesc', { number: '+91 98765 43210' })}
          </p>
        </div>
        <div className="card">
          <h3>{t('helpKioskTitle')}</h3>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)', marginTop: 8 }}>
            {t('helpKioskDesc')}
          </p>
        </div>
      </div>
      <div className="hint-banner" style={{ marginTop: 16 }}>{t('helpDisclaimer')}</div>
    </div>
  );
}
