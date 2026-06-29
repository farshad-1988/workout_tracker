import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { readStoredLocale, STORAGE_KEY } from "../utils/readLocalStorage";
import type { AppLocale } from "@/constants";
import { LanguageContext } from "./ContextCreator";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(() =>
    readStoredLocale(),
  );

  useEffect(() => {
    document.documentElement.lang = locale === "en" ? "en" : "fa";
    document.documentElement.dir = locale === "en" ? "ltr" : "rtl";
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((next: AppLocale) => {
    setLocaleState(next);
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
