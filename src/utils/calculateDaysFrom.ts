import { DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
export function calculateDaysFrom(selectedDate: string): number {
  const past = new DateObject({
    date: selectedDate,
    format: "YYYY-MM-DD",
    calendar: persian,
    locale: persian_fa,
  });
  const today = new DateObject({
    format: "YYYY-MM-DD",
    calendar: persian,
    locale: persian_fa,
  });

  // Difference in milliseconds
  const diffMs = today.valueOf() - past.valueOf();

  // Convert milliseconds to days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays + 1;
}
