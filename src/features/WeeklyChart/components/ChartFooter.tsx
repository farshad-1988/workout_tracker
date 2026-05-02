// src/components/WeeklyChart/ChartFooter.tsx
import { daysInWeekFa } from "@/lib/constants/persian";

interface ChartFooterProps {
  caloriesData: (number | null)[];
  totalCalories: number;
}

export function ChartFooter({ caloriesData, totalCalories }: ChartFooterProps) {
  const validCalories = caloriesData.filter((c) => c !== null) as number[];
  const maxCalories = validCalories.length > 0 ? Math.max(...validCalories) : 0;
  const bestDayIndex = caloriesData.indexOf(maxCalories);
  const bestDay = bestDayIndex !== -1 ? daysInWeekFa[bestDayIndex] : "N/A";

  return (
    <div className="mt-6 pt-6 border-t border-gray-200/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          <span>Daily calorie burn tracking</span>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <span>Best day: {bestDay}</span>
          <span>•</span>
          <span>Week total: {totalCalories.toLocaleString()} cal</span>
        </div>
      </div>
    </div>
  );
}
