import type { BioText, AppLocale } from "@/constants/types";
import {
  addCalendarDays,
  formatCanonicalDate,
  resolveStoredDateKey,
  todayCanonical,
} from "@/utils/dateKey";

export function getDayLabel(
  dateKey: string,
  locale: AppLocale,
  bio: Pick<BioText, "today" | "yesterday">,
): string {
  const canonical = resolveStoredDateKey(dateKey);
  if (!canonical) return dateKey;

  const todayKey = todayCanonical();
  if (canonical === todayKey) return bio.today;

  const yesterdayKey = addCalendarDays(todayKey, -1);
  if (yesterdayKey && canonical === yesterdayKey) return bio.yesterday;

  const pattern = locale === "fa" ? "dddd D MMMM YYYY" : "dddd, MMMM D, YYYY";
  return formatCanonicalDate(canonical, locale, pattern) ?? dateKey;
}
