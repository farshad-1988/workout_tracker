import { useContext } from "react";
import { ThemeContext } from "../context/contextCreator";

export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (ctx === null) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return ctx;
}
