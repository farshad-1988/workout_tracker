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
  title,
}) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className={`${scheme.bg} p-2 rounded-lg text-2xl`}>{icon}</div>
      {!isNeutral && !isPercentage && (
        <div className="relative group">
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full transition-all duration-200 ${
              isPositive
                ? "bg-green-100 text-green-700 group-hover:bg-green-200"
                : "bg-red-100 text-red-700 group-hover:bg-red-200"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{Math.abs(percentDiff)}%</span>
          </div>
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-10 shadow-lg">
            {Math.abs(percentDiff)}% {isPositive ? "افزایش" : "کاهش"} {title}{" "}
            نسبت به میانگین
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-gray-900"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonHeader;
