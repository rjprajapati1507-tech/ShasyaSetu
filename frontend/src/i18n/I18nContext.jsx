import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { translate } from './translations';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('shasyasetu-language');
      return ['en', 'hi', 'mr'].includes(saved) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLang = (next) => {
    const safe = ['en', 'hi', 'mr'].includes(next) ? next : 'en';
    setLangState(safe);
    try { localStorage.setItem('shasyasetu-language', safe); } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t: (key, vars) => translate(lang, key, vars),
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within an I18nProvider');
  return ctx;
}
