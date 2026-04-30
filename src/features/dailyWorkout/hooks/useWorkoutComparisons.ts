// features/workout-comparison/useWorkoutComparisons.ts
import { useMemo } from "react";
import type { ComparisonItem, Exercise, ExtraData } from "@/types/types";

interface UseWorkoutComparisonsProps {
  exercises: Exercise[];
  extraData: ExtraData;
}

export const useWorkoutComparisons = ({
  exercises,
  extraData,
}: UseWorkoutComparisonsProps): ComparisonItem[] => {
  return useMemo(
    () => [
      {
        title: "مدت ورزش امروز",
        current: exercises?.reduce((acc, curr) => acc + curr.duration, 0) || 0,
        average:
          extraData.totalDuration && extraData.daysWithWorkouts
            ? Math.round(extraData.totalDuration / extraData.daysWithWorkouts)
            : 0,
        target: extraData.dailyDurationGoal || 60,
        unit: "دقیقه",
        color: "blue",
        icon: "⏱️",
      },
      {
        title: "کالری سوخته",
        current:
          exercises?.reduce((acc, curr) => acc + curr.caloriesBurned, 0) || 0,
        average:
          extraData.totalCalories && extraData.daysWithWorkouts
            ? Math.round(extraData.totalCalories / extraData.daysWithWorkouts)
            : 0,
        target: extraData.dailyCalorieGoal || 500,
        unit: "کالری",
        color: "orange",
        icon: "🔥",
      },
      {
        title: "نرخ فعالیت",
        current: extraData.daysWithWorkouts || 0,
        average: extraData.daysPassed || 0,
        unit: "روز فعال",
        color: "green",
        icon: "📅",
        isPercentage: true,
      },
    ],
    [exercises, extraData],
  );
};
