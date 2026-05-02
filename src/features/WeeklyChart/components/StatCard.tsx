// src/components/WeeklyChart/StatCard.tsx
import type { StatCardProps } from "@/types/types";

export function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="w-full flex text-center justify-between items-center space-x-3">
        <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${color}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">{label}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
