import { createContext } from "react";
import type { LanguageContextValue } from "../type/type";

export const LanguageContext = createContext<LanguageContextValue | null>({
  locale: "en",
  setLocale: () => {},
});
