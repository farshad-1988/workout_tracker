import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import type { BioText } from "@/constants/types";
import type { AppLocale } from "@/constants/types";

function getCalendarConfig(locale: AppLocale) {
  return locale === "fa"
    ? { calendar: persian, calendarLocale: persian_fa }
    : { calendar: gregorian, calendarLocale: gregorian_en };
}

export function getDayLabel(
  dateKey: string,
  locale: AppLocale,
  bio: Pick<BioText, "today" | "yesterday">,
): string {
  const { calendar, calendarLocale } = getCalendarConfig(locale);

  const today = new DateObject({
    calendar,
    locale: calendarLocale,
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
    calendar,
    locale: calendarLocale,
  });

  return locale === "fa"
    ? parsed.format("dddd D MMMM YYYY")
    : parsed.format("dddd, MMMM D, YYYY");
}
