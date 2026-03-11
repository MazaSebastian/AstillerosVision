"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import translations, { type Locale } from "@/lib/translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (section: string, key: string) => string;
  showSelector: boolean;
  dismissSelector: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = "astillero-vision-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");
  const [showSelector, setShowSelector] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && ["es", "en", "pt"].includes(saved)) {
      setLocaleState(saved);
    } else {
      setShowSelector(true);
    }
    setHydrated(true);
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l === "pt" ? "pt-BR" : l;
  }, []);

  const dismissSelector = useCallback(() => {
    setShowSelector(false);
  }, []);

  const t = useCallback(
    (section: string, key: string): string => {
      return translations[locale]?.[section]?.[key] ?? key;
    },
    [locale]
  );

  if (!hydrated) return null;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, showSelector, dismissSelector }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
