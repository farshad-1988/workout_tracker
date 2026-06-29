import { createContext } from "react";
import type { ThemeContextValue } from "../type/type";

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "orange",
  setTheme: () => {},
});
