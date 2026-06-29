import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { cloneDO, makeDO } from "@/features/weeklyChart/utils/dateHelper";
import { getExercisesInADay } from "@/shared/contexts/exerciseContext/selectors/exerciseStates";
import type { State } from "@/shared/contexts/exerciseContext/types/type";
import type { Exercise } from "@/types/types";

export type CaloriesSeriesStats = {
  values: (number | null)[];
  totalCalories: number;
  avgCalories: number;
  activeBuckets: number;
};

export function sumCaloriesForDate(state: State, dateKey: string): number {
  return getExercisesInADay(state, dateKey).reduce(
    (acc: number, ex: Exercise) => acc + (ex.caloriesBurned || 0),
    0,
  );
}

/** Lexicographic compare works for zero-padded Persian `YYYY-MM-DD` keys from DateObject.format. */
export function isPersianDateKeyAfterToday(
  dateKey: string,
  todayKey: string,
): boolean {
  return dateKey > todayKey;
}

export function computeCaloriesSeries(
  state: State,
  dateKeys: string[],
  isFuture: (dateKey: string) => boolean,
): CaloriesSeriesStats {
  const values: (number | null)[] = [];
  let total = 0;
  let counted = 0;
  let activeBuckets = 0;

  for (const key of dateKeys) {
    if (isFuture(key)) {
      values.push(null);
      continue;
    }
    const cals = sumCaloriesForDate(state, key);
    values.push(cals);
    total += cals;
    counted++;
    if (cals > 0) activeBuckets++;
  }

  return {
    values,
    totalCalories: total,
    avgCalories: counted > 0 ? Math.round(total / counted) : 0,
    activeBuckets,
  };
}

export function getPersianWeekDateKeys(startOfWeek: DateObject): string[] {
  const keys: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = cloneDO(startOfWeek);
    d.add(i, "day");
    keys.push(d.format("YYYY-MM-DD"));
  }
  return keys;
}

export function getPersianMonthSeries(
  monthAnchor: DateObject,
): { dateKeys: string[]; dayLabels: string[] } {
  const start = makeDO(monthAnchor.toDate());
  start.day = 1;
  const monthMarker = start.format("YYYY-MM");
  const dateKeys: string[] = [];
  const dayLabels: string[] = [];

  for (let i = 0; i < 40; i++) {
    const d = cloneDO(start);
    d.add(i, "day");
    if (d.format("YYYY-MM") !== monthMarker) break;
    dateKeys.push(d.format("YYYY-MM-DD"));
    dayLabels.push(String(d.day));
  }

  return { dateKeys, dayLabels };
}

export function getPersianYearMonthSeries(
  persianYear: number,
  state: State,
  today: DateObject,
): { labels: string[]; values: (number | null)[] } {
  const labels: string[] = [];
  const values: (number | null)[] = [];
  const todayKey = today.format("YYYY-MM-DD");

  for (let month = 1; month <= 12; month++) {
    const monthStart = new DateObject({
      calendar: persian,
      locale: persian_fa,
      year: persianYear,
      month,
      day: 1,
    });

    labels.push(monthStart.format("MMMM"));

    const monthStartKey = monthStart.format("YYYY-MM-DD");
    if (isPersianDateKeyAfterToday(monthStartKey, todayKey)) {
      values.push(null);
      continue;
    }

    const { dateKeys } = getPersianMonthSeries(monthStart);
    let monthTotal = 0;
    for (const key of dateKeys) {
      if (isPersianDateKeyAfterToday(key, todayKey)) {
        continue;
      }
      monthTotal += sumCaloriesForDate(state, key);
    }
    values.push(monthTotal);
  }

  return { labels, values };
}

export function makePersianMonthRangeLabel(
  monthAnchor: DateObject,
): string {
  const { dateKeys } = getPersianMonthSeries(monthAnchor);
  if (!dateKeys.length) return "";
  const first = makeDO(dateKeys[0]);
  const last = makeDO(dateKeys[dateKeys.length - 1]);
  return `${first.format("YYYY/MM/DD")} – ${last.format("YYYY/MM/DD")}`;
}

export function makePersianYearLabel(persianYear: number): string {
  return String(persianYear);
}
