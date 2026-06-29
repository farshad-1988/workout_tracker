// src/utils/dateHelpers.ts
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { daysInWeekFa } from "@/lib/constants/persian";

export const makeDO = (input?: Date | string): DateObject =>
  new DateObject({
    date: input,
    calendar: persian,
    locale: persian_fa,
  });

export const cloneDO = (d: DateObject): DateObject => makeDO(d.toDate());

export const getStartOfWeek = (dateObj: DateObject): DateObject => {
  const d = makeDO(dateObj.toDate());
  for (let i = 0; i < 7; i++) {
    if (d.weekDay && d.weekDay.name === "شنبه") {
      return makeDO(d.toDate());
    }
    d.subtract(1, "day");
  }
  const idx = daysInWeekFa.indexOf(dateObj.weekDay?.name || "");
  const fallback = makeDO(dateObj.toDate());
  fallback.subtract(idx === -1 ? 0 : idx, "day");
  return fallback;
};
