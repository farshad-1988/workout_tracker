// features/workout-comparison/TargetProgressBar.tsx
import React from "react";
import type { ColorScheme } from "@/types/types";

interface TargetProgressBarProps {
  targetProgress: number;
  target: number;
  current: number;
  unit: string;
  scheme: ColorScheme;
}

const TargetProgressBar: React.FC<TargetProgressBarProps> = ({
  targetProgress,
  target,
  current,
  unit,
  scheme,
}) => {
  const remaining = target - current;

  return (
    <div>
      <div className="flex justify-between items-center text-xs text-gray-500 mb-1.5">
        <span>هدف روزانه</span>
        <span className="font-medium">
          {target} {unit}
        </span>
      </div>
      <div className="relative w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${
            targetProgress >= 100
              ? "from-green-400 to-green-600"
              : targetProgress >= 50
                ? "from-yellow-400 to-orange-500"
                : `${scheme.gradient}`
          }`}
          style={{ width: `${targetProgress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1.5 text-left">
        {targetProgress >= 100 ? (
          <span className="text-green-600 font-semibold">✓ هدف محقق شد!</span>
        ) : (
          <span>
            {Math.round(targetProgress)}% از هدف (
            {remaining > 0 ? `${remaining} ${unit} مانده` : "کامل"})
          </span>
        )}
      </p>
    </div>
  );
};

export default TargetProgressBar;
