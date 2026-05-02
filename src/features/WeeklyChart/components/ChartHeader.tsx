// src/components/WeeklyChart/ChartHeader.tsx
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

interface ChartHeaderProps {
  weekLabel: string;
  weekOffset: number;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export function ChartHeader({
  weekLabel,
  weekOffset,
  onPreviousWeek,
  onNextWeek,
}: ChartHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
      <div className="w-full flex justify-between items-center">
        <button
          className="group flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-indigo-500 text-gray-700 hover:text-white font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:from-gray-100 disabled:hover:to-gray-200 disabled:hover:text-gray-700 h-8 cursor-pointer"
          onClick={onNextWeek}
          disabled={weekOffset >= 0}
          aria-label="هفته بعد"
        >
          <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform group-disabled:scale-100" />
          <span className="hidden sm:inline">هفته بعد</span>
        </button>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="p-2 rounded-xl ml-2 bg-gradient-to-br from-blue-500 to-indigo-500">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              کالری سوزانده‌شده
            </h2>
            <p className="text-sm text-gray-500">{weekLabel}</p>
          </div>
        </div>

        <button
          className="group flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-indigo-500 text-gray-700 hover:text-white font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] h-8 cursor-pointer"
          onClick={onPreviousWeek}
          aria-label="هفته قبل"
        >
          <span className="hidden sm:inline">هفته قبل</span>
          <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
}
