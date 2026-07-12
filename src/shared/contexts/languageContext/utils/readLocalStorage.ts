import type { AppLocale } from "@/constants";
export const STORAGE_KEY = "workout-tracker-locale";
export function readStoredLocale(): AppLocale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === "en" || raw === "fa") return raw;
  } catch {
    /* ignore */
  }
  return "en";
}
