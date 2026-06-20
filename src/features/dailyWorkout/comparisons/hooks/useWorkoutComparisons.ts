import { useMemo } from "react";
import type { ComparisonItem } from "@/types/types";
import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";
import {
  getActiveDailyAverageColories,
  getActiveDailyAverageDuration,
} from "../../../../shared/contexts/exerciseContext/selectors/exerciseStates";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
import { getComparisonsText } from "@/constants";

// export const useWorkoutComparisons = (
//   modifiedDate: string,
// ): ComparisonItem[] => {
//   const { exercises, goal } = useDailyData(modifiedDate);
//   const { state } = useExercise();
//   return useMemo(
//     () => [
//       {
//         title: "مدت ورزش امروز",
//         current: exercises?.reduce((acc, curr) => acc + curr.duration, 0) || 0,
//         average: getActiveDailyAverageDuration(state),
//         target: goal.duration || 60,
//         unit: "دقیقه",
//         color: "blue",
//         icon: "⏱️",
//       },
//       {
//         title: "کالری سوخته",
//         current:
//           exercises?.reduce((acc, curr) => acc + curr.caloriesBurned, 0) || 0,
//         average: getActiveDailyAverageColories(state),
//         target: goal.colories || 500,
//         unit: "کالری",
//         color: "orange",
//         icon: "🔥",
//       },
//     ],
//     [exercises, goal.colories, goal.duration, state],
//   );
// };
export const useWorkoutComparisons = (
  modifiedDate: string,
): ComparisonItem[] => {
  const { exercises, goal } = useDailyData(modifiedDate);
  const { state } = useExercise();
  const { locale } = useLanguage();
  const t = getComparisonsText(locale);

  return useMemo(
    () => [
      {
        title: t.todayWorkoutDuration,
        current: exercises?.reduce((acc, curr) => acc + curr.duration, 0) || 0,
        average: getActiveDailyAverageDuration(state),
        target: goal.duration || 60,
        unit: t.minute,
        color: "blue",
        icon: "⏱️",
      },
      {
        title: t.caloriesBurned,
        current:
          exercises?.reduce((acc, curr) => acc + curr.caloriesBurned, 0) || 0,
        average: getActiveDailyAverageColories(state),
        target: goal.colories || 500,
        unit: t.calorie,
        color: "orange",
        icon: "🔥",
      },
    ],
    [exercises, goal.colories, goal.duration, state, t],
  );
};
