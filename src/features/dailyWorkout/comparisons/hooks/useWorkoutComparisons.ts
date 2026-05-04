// features/workout-comparison/useWorkoutComparisons.ts
import { useMemo } from "react";
import type { ComparisonItem } from "@/types/types";
import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";
import {
  calculateDaysFrom,
  daysWithWorkout,
  getActiveDailyAverageColories,
  getActiveDailyAverageDuration,
  getActiveDaysAverage,
} from "../../../../shared/contexts/exerciseContext/selectors/exerciseStates";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";

export const useWorkoutComparisons = (modifiedDate): ComparisonItem[] => {
  const { exercises, goal } = useDailyData(modifiedDate);
  const { state } = useExercise();

  return useMemo(
    () => [
      {
        title: "مدت ورزش امروز",
        current: exercises?.reduce((acc, curr) => acc + curr.duration, 0) || 0,
        average: getActiveDailyAverageDuration(state),
        target: goal.duration || 60,
        unit: "دقیقه",
        color: "blue",
        icon: "⏱️",
      },
      {
        title: "کالری سوخته",
        current:
          exercises?.reduce((acc, curr) => acc + curr.caloriesBurned, 0) || 0,
        average: getActiveDailyAverageColories(state),
        target: goal.colories || 500,
        unit: "کالری",
        color: "orange",
        icon: "🔥",
      },
      {
        title: "نرخ فعالیت",
        workoutDays: daysWithWorkout(state).length || 0,
        average: getActiveDaysAverage(state) || 0,
        current: daysWithWorkout(state).length || 0,
        daysPassed: calculateDaysFrom(modifiedDate),
        unit: "روز فعال",
        color: "green",
        icon: "📅",
      },
    ],
    [exercises, goal.colories, goal.duration, modifiedDate, state],
  );
};
