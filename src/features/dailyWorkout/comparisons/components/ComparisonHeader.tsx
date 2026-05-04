// features/workout-comparison/ComparisonHeader.tsx
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ColorScheme } from "@/types/types";

interface ComparisonHeaderProps {
  scheme: ColorScheme;
  icon: string;
  percentDiff: number;
  isPositive: boolean;
  isNeutral: boolean;
  isPercentage?: boolean;
}

const ComparisonHeader: React.FC<ComparisonHeaderProps> = ({
  scheme,
  icon,
  percentDiff,
  isPositive,
  isNeutral,
  isPercentage,
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className={`${scheme.bg} p-2 rounded-lg text-2xl`}>{icon}</div>
      {!isNeutral && !isPercentage && (
        <div
          className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
            isPositive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          <span>{Math.abs(percentDiff)}%</span>
        </div>
      )}
    </div>
  );
};

export default ComparisonHeader;
