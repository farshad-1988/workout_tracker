// features/workout-comparison/ComparisonValue.tsx
import React from "react";
import type { ColorScheme } from "@/types/types";

interface ComparisonValueProps {
  displayValue: number;
  scheme: ColorScheme;
  unit: string;
  isPercentage?: boolean;
}

const ComparisonValue: React.FC<ComparisonValueProps> = ({
  displayValue,
  scheme,
  unit,
  isPercentage,
}) => {
  return (
    <div className="flex items-baseline gap-1.5 mb-4">
      <span className={`text-3xl font-bold ${scheme.text}`}>
        {displayValue.toLocaleString("fa-IR")}
      </span>
      <span className="text-sm text-gray-500">{isPercentage ? "%" : unit}</span>
    </div>
  );
};

export default ComparisonValue;
