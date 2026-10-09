import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { translate, translateVisibleText } from './translations';

const I18nContext = createContext(null);
const originalTextNodes = new WeakMap();

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
    const updateText = (node) => {
      if (node.nodeType === 3) {
        const raw = originalTextNodes.get(node) || node.nodeValue;
        if (!originalTextNodes.has(node)) originalTextNodes.set(node, raw);
        const translated = translateVisibleText(lang, raw);
        if (node.nodeValue !== translated) node.nodeValue = translated;
        return;
      }
      if (node.nodeType !== 1 || node.closest('[data-no-auto-translate]')) return;
      ['placeholder', 'title', 'aria-label'].forEach((attr) => {
        const current = node.getAttribute(attr);
        if (!current) return;
        const originalKey = 'data-original-' + attr;
        const raw = node.getAttribute(originalKey) || current;
        if (!node.hasAttribute(originalKey)) node.setAttribute(originalKey, raw);
        const translated = translateVisibleText(lang, raw);
        if (current !== translated) node.setAttribute(attr, translated);
      });
      Array.from(node.childNodes).forEach(updateText);
    };
    const root = document.getElementById('root');
    if (!root) return undefined;
    updateText(root);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') updateText(mutation.target);
        Array.from(mutation.addedNodes || []).forEach(updateText);
        if (mutation.type === 'attributes') updateText(mutation.target);
      });
    });
    observer.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'title', 'aria-label'] });
    return () => observer.disconnect();
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
