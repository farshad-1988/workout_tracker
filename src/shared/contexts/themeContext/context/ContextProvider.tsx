import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Theme } from "../type/type";
import { readStoredLocale, STORAGE_KEY } from "../utils/readLocalStorage";
import { ThemeContext } from "./contextCreator";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(readStoredLocale);
  console.log(theme);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
