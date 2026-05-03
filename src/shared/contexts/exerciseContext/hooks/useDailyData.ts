import { useMemo } from "react";
import { useExercise } from "./useExercises";

export function useDailyData(date: string) {
  const { state } = useExercise();

  const dailyExercises = useMemo(
    () => state.exercisesByDate.get(date) ?? [],
    [state.exercisesByDate, date],
  );

  const dailyGoal = useMemo(
    () => state.dailyGoalByDate.get(date) ?? { duration: 60, colories: 200 }, // هدف پیش‌فرض 0
    [state.dailyGoalByDate, date],
  );

  return {
    exercises: dailyExercises,
    goal: dailyGoal,
  };
}
