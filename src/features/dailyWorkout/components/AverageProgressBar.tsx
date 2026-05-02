// features/workout-comparison/AverageProgressBar.tsx
import React from "react";

interface AverageProgressBarProps {
  current: number;
  average: number;
  unit: string;
  isPositive: boolean;
  isNeutral: boolean;
}

const AverageProgressBar: React.FC<AverageProgressBarProps> = ({
  current,
  average,
  unit,
  isPositive,
  isNeutral,
}) => {
  const progressWidth = Math.min((current / (average * 2)) * 100, 100);

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center text-xs text-gray-500 mb-1.5">
        <span>مقایسه با میانگین</span>
        <span className="font-medium">
          {average.toLocaleString("fa-IR")} {unit}
        </span>
      </div>
      <div className="relative w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            isPositive
              ? "bg-gradient-to-r from-green-400 to-green-600"
              : isNeutral
                ? "bg-gray-400"
                : "bg-gradient-to-r from-red-400 to-red-600"
          }`}
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div>
  );
};

export default AverageProgressBar;
