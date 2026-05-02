// features/workout-comparison/useComparisonCalculations.ts
import { useMemo } from "react";
import type { ComparisonItem } from "@/types/types";

export const useComparisonCalculations = (item: ComparisonItem) => {
  return useMemo(() => {
    const getPercentageDiff = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Math.round(((current - previous) / previous) * 100);
    };

    const percentDiff = getPercentageDiff(item.current, item.average);
    const isPositive = percentDiff > 0;
    const isNeutral = percentDiff === 0;

    const targetProgress = item.target
      ? Math.min((item.current / item.target) * 100, 100)
      : null;

    const displayValue =
      item.isPercentage && item.average > 0
        ? Math.round((item.current / item.average) * 100)
        : item.current;

    return {
      percentDiff,
      isPositive,
      isNeutral,
      targetProgress,
      displayValue,
    };
  }, [item]);
};
