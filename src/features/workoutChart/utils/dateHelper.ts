// // src/utils/dateHelpers.ts
// import { DateObject } from "react-multi-date-picker";
// import persian from "react-date-object/calendars/persian";
// import persian_fa from "react-date-object/locales/persian_fa";
// import { daysInWeekFa } from "@/lib/constants/persian";

// export const makeDO = (input?: Date | string, locale?: string): DateObject => {
//   return locale === "fa"
//     ? new DateObject({
//         date: input,
//         calendar: persian,
//         locale: persian_fa,
//       })
//     : new DateObject({ date: input });
// };

// export const cloneDO = (d: DateObject, locale?: string): DateObject =>
//   makeDO(d.toDate(), locale);

// export const getStartOfWeek = (dateObj: DateObject): DateObject => {
//   const d = makeDO(dateObj.toDate());
//   for (let i = 0; i < 7; i++) {
//     if (d.weekDay && d.weekDay.name === "شنبه") {
//       return makeDO(d.toDate());
//     }
//     d.subtract(1, "day");
//   }
//   const idx = daysInWeekFa.indexOf(dateObj.weekDay?.name || "");
//   const fallback = makeDO(dateObj.toDate());
//   fallback.subtract(idx === -1 ? 0 : idx, "day");
//   return fallback;
// };
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const makeDO = (input?: Date | string, locale?: string): DateObject => {
  return locale === "fa"
    ? new DateObject({
        date: input,
        calendar: persian,
        locale: persian_fa,
      })
    : new DateObject({ date: input });
};

export const makeDOFromYMD = (
  year: number,
  month: number,
  day: number,
  locale?: string,
): DateObject => {
  return locale === "fa"
    ? new DateObject({
        calendar: persian,
        locale: persian_fa,
        year,
        month,
        day,
      })
    : new DateObject({ year, month, day });
};

export const cloneDO = (d: DateObject, locale?: string): DateObject =>
  makeDO(d.toDate(), locale);

/**
 * Rewinds to the start of the week for the given locale/calendar:
 * - "fa" (Persian calendar): week starts Saturday (شنبه)
 * - anything else (Gregorian): week starts Monday
 *
 * Uses weekDay.index (calendar-provided, locale-independent number 0-6)
 * instead of matching name strings, so it doesn't break if react-date-object's
 * localized day names ever change.
 */
export const getStartOfWeek = (
  dateObj: DateObject,
  locale?: string,
): DateObject => {
  const d = makeDO(dateObj.toDate(), locale);

  // react-date-object's weekDay.index is 0-based starting from that
  // calendar's own native week start (Saturday for persian, Sunday for gregorian).
  const nativeStartIndex = d.weekDay?.index ?? 0;

  // Persian calendar's native start (Saturday) already matches what we want.
  // Gregorian's native start is Sunday, but we want Monday, so shift by 1.
  const offsetFromDesiredStart =
    locale === "fa" ? nativeStartIndex : (nativeStartIndex + 6) % 7;

  d.subtract(offsetFromDesiredStart, "day");
  return d;
};
