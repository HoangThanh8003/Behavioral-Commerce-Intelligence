import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/lib/locales/en.json';
import vi from '@/lib/locales/vi.json';

// ── Read persisted locale ─────────────────────────────
function getInitialLocale(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('nexusai-locale') || 'en';
  }
  return 'en';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: getInitialLocale(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    useSuspense: false, // Avoid SSR issues
  },
});

// ── Persist locale on change ──────────────────────────
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('nexusai-locale', lng);
    document.documentElement.lang = lng;
  }
});

export default i18n;
