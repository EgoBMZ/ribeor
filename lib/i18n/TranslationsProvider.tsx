"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import es from "./es.json";
import en from "./en.json";

export type Locale = "es" | "en";

// Recursive type for nested translation objects
type Translations = typeof es;

interface TranslationsContextValue {
  t: Translations;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const TranslationsContext = createContext<TranslationsContextValue>({
  t: es,
  locale: "es",
  setLocale: () => {},
});

const STORAGE_KEY = "ribeor_locale";

export function TranslationsProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored === "es" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
  };

  const t = locale === "es" ? es : en;

  return (
    <TranslationsContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  return useContext(TranslationsContext);
}
