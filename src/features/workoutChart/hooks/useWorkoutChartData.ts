import { useEffect, useMemo, useState } from "react";

import { daysInWeekEn } from "@/lib/constants/english";
import { daysInWeekFa } from "@/lib/constants/persian";
import type { AppLocale } from "@/constants/types";
import {
  cloneDO,
  getStartOfWeek,
  makeDO,
} from "@/features/workoutChart/utils/dateHelper";
import { makeChartData } from "@/features/workoutChart/utils/calculateChartInfo";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
import {
  computeCaloriesSeries,
  getPersianMonthSeries,
  getPersianWeekDateKeys,
  getPersianYearMonthSeries,
  isPersianDateKeyAfterToday,
  makePersianMonthRangeLabel,
  makePersianYearLabel,
} from "../utils/periodAggregation";

export type ChartPeriod = "week" | "month" | "year";

export function useWorkoutChartData(
  period: ChartPeriod,
  offset: number,
  locale: AppLocale,
) {
  const { state } = useExercise();
  const [isLoading, setIsLoading] = useState(true);

  const weekDayLabels = locale === "en" ? daysInWeekEn : daysInWeekFa;

  const model = useMemo(() => {
    const today = makeDO();
    const todayKey = today.format("YYYY-MM-DD");

    if (period === "week") {
      const base = getStartOfWeek(today);
      const shifted = makeDO(base.toDate());
      shifted.add(offset * 7, "day");
      const dateKeys = getPersianWeekDateKeys(shifted);
      const end = cloneDO(shifted);
      end.add(6, "day");
      const periodLabel = `${shifted.format("YYYY/MM/DD")} – ${end.format("YYYY/MM/DD")}`;
      const stats = computeCaloriesSeries(state, dateKeys, (key) => {
        return offset === 0 && isPersianDateKeyAfterToday(key, todayKey);
      });
      return {
        pointLabels: weekDayLabels,
        dateKeys,
        periodLabel,
        stats,
        chartData: makeChartData(stats.values, weekDayLabels),
      };
    }

    if (period === "month") {
      const anchor = makeDO(today.toDate());
      anchor.add(offset, "month");
      const { dateKeys, dayLabels } = getPersianMonthSeries(anchor);
      const stats = computeCaloriesSeries(state, dateKeys, (key) => {
        return offset === 0 && isPersianDateKeyAfterToday(key, todayKey);
      });
      return {
        pointLabels: dayLabels,
        dateKeys,
        periodLabel: makePersianMonthRangeLabel(anchor),
        stats,
        chartData: makeChartData(stats.values, dayLabels),
      };
    }

    const anchorYear = makeDO(today.toDate());
    anchorYear.add(offset, "year");
    const persianYear = Number(anchorYear.year) || today.year;
    const { labels, values } = getPersianYearMonthSeries(
      persianYear,
      state,
      today,
    );
    const totalCalories: number = values.reduce<number>(
      (acc, v) => acc + (typeof v === "number" ? v : 0),
      0,
    );
    const counted = values.filter((v) => v !== null).length;
    const activeBuckets = values.filter(
      (v) => typeof v === "number" && v > 0,
    ).length;

    return {
      pointLabels: labels,
      dateKeys: labels,
      periodLabel: makePersianYearLabel(persianYear),
      stats: {
        values,
        totalCalories,
        avgCalories: counted > 0 ? Math.round(totalCalories / counted) : 0,
        activeBuckets,
      },
      chartData: makeChartData(values, labels),
    };
  }, [offset, period, state, weekDayLabels]);

  useEffect(() => {
    setIsLoading(true);
    const id = requestAnimationFrame(() => setIsLoading(false));
    return () => cancelAnimationFrame(id);
  }, [model, offset, period, state]);

  return {
    ...model,
    isLoading,
    canGoNext: offset < 0,
  };
}
