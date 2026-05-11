// src/hooks/useWeeklyCalories.ts
import { useEffect, useMemo, useState } from "react";

import { makeDO, cloneDO, getStartOfWeek } from "../utils/dateHelper";
import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";
import { useModifiedPickedDate } from "@/features/dailyWorkout/hooks/useModifiedPickedDate";
import { makeChartData, makeWeekLabel } from "../utils/calculateChartInfo";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
import { getExercisesInADay } from "@/shared/contexts/exerciseContext/selectors/exerciseStates";

export function useWeeklyCalories() {
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const [caloriesData, setCaloriesData] = useState<(number | null)[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [avgCalories, setAvgCalories] = useState<number>(0);
  const today = useMemo(() => makeDO(), []);
  const { state, dispatch } = useExercise();
  // const dateKey = useModifiedPickedDate();
  // const { exercises } = useDailyData(dateKey);

  // const exercises = useMemo(() => [], []);

  const startOfWeek = useMemo(() => {
    const base = getStartOfWeek(today);
    const shifted = makeDO(base.toDate());
    shifted.add(weekOffset * 7, "day");
    return shifted;
  }, [today, weekOffset]);
  console.log(startOfWeek);
  const endOfWeek = useMemo(() => {
    const e = makeDO(startOfWeek.toDate());
    e.add(6, "day");
    return e;
  }, [startOfWeek]);

  useEffect(() => {
    setIsLoading(true);
    const result: (number | null)[] = [];
    let total = 0;
    let validDays = 0;

    for (let i = 0; i < 7; i++) {
      const dayDate = cloneDO(startOfWeek);
      dayDate.add(i, "day");
      const dateFormated = dayDate.format("YYYY-MM-DD");
      const exercises = getExercisesInADay(state, dateFormated);
      const caloriesForDay = exercises.reduce(
        (total, ex) => total + (ex.caloriesBurned || 0),
        0,
      );

      const isFutureInThisWeek =
        weekOffset === 0 &&
        dayDate.toDate().getTime() > today.toDate().getTime();
      console.log(dayDate);
      const finalCalories = isFutureInThisWeek ? null : caloriesForDay;
      result.push(finalCalories);

      if (finalCalories !== null) {
        total += finalCalories;
        validDays++;
      }
    }

    setCaloriesData(result);
    setTotalCalories(total);
    setAvgCalories(validDays > 0 ? Math.round(total / validDays) : 0);

    setTimeout(() => setIsLoading(false), 0);
  }, [startOfWeek, state, today, weekOffset]);
  const chartData = makeChartData(caloriesData);
  const weekLabel = makeWeekLabel({ startOfWeek, endOfWeek });
  // const weekAllDaysLabel = startOfWeek.format("YYYY/MM/DD")
  return {
    caloriesData,
    isLoading,
    totalCalories,
    avgCalories,
    chartData,
    weekLabel,
    weekOffset,
    setWeekOffset,
  };
}
