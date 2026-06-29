import type { Theme } from "../type/type";

export const STORAGE_KEY = "workout-theme";
export function readStoredLocale() {
  const themes = ["blue", "green", "purple", "orange", "red", "pink"];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw && themes.includes(raw as Theme)) {
      return raw as Theme;
    }
  } catch {
    /* ignore */
  }
  return "orange";
}
