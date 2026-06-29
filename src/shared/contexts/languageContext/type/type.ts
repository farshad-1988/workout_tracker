import type { AppLocale } from "@/constants/types";

export type LanguageContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
};
