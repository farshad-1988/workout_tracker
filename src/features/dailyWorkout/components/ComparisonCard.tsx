// features/workout-comparison/ComparisonCard.tsx
import React from "react";
import type { ComparisonItem } from "@/types/types";
import ComparisonHeader from "./ComparisonHeader";
import { useComparisonCalculations } from "../hooks/useComparisonCalculations";
import { COLOR_SCHEMES } from "../constants/style";
import ComparisonValue from "./ComparisonValue";
import AverageProgressBar from "./AverageProgressBar";
import TargetProgressBar from "./TargetProgressBar";
import ActivityRateDisplay from "./ActivityRateDisplay";

interface ComparisonCardProps {
  item: ComparisonItem;
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ item }) => {
  const { percentDiff, isPositive, isNeutral, targetProgress, displayValue } =
    useComparisonCalculations(item);

  const scheme = COLOR_SCHEMES[item.color];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <ComparisonHeader
        scheme={scheme}
        icon={item.icon}
        percentDiff={percentDiff}
        isPositive={isPositive}
        isNeutral={isNeutral}
        isPercentage={item.isPercentage}
      />

      <h3 className="text-sm font-medium text-gray-600 mb-2">{item.title}</h3>

      <ComparisonValue
        displayValue={displayValue}
        scheme={scheme}
        unit={item.unit}
        isPercentage={item.isPercentage}
      />

      {!item.isPercentage && item.average > 0 && (
        <AverageProgressBar
          current={item.current}
          average={item.average}
          unit={item.unit}
          isPositive={isPositive}
          isNeutral={isNeutral}
        />
      )}

      {targetProgress !== null && (
        <TargetProgressBar
          targetProgress={targetProgress}
          target={item.target!}
          current={item.current}
          unit={item.unit}
          scheme={scheme}
        />
      )}

      {item.isPercentage && item.average > 0 && (
        <ActivityRateDisplay current={item.current} average={item.average} />
      )}
    </div>
  );
};

export default ComparisonCard;
