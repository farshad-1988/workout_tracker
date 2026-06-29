import { useContext } from "react";
import type { LanguageContextValue } from "../type/type";
import { LanguageContext } from "../context/ContextCreator";

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
