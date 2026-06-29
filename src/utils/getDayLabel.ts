import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import type { BioText } from "@/constants/types";
import type { AppLocale } from "@/constants/types";

export function getDayLabel(
  dateKey: string,
  locale: AppLocale,
  bio: Pick<BioText, "today" | "yesterday">,
): string {
  const today = new DateObject({
    calendar: persian,
    locale: persian_fa,
  });
  const yesterday = new DateObject(today).subtract(1, "day");

  if (dateKey === today.format("YYYY-MM-DD")) {
    return bio.today;
  }
  if (dateKey === yesterday.format("YYYY-MM-DD")) {
    return bio.yesterday;
  }

  const parsed = new DateObject({
    date: dateKey,
    format: "YYYY-MM-DD",
    calendar: persian,
    locale: persian_fa,
  });

  if (locale === "fa") {
    return parsed.format("dddd D MMMM YYYY");
  }

  const gregorianDate = parsed.convert(gregorian, gregorian_en);
  return gregorianDate.format("dddd, MMMM D, YYYY");
}
