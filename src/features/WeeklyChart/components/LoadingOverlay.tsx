// src/components/WeeklyChart/LoadingOverlay.tsx

import type { LoadingOverlayProps } from "@/types/types";

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="text-gray-600 font-medium">Loading chart...</span>
      </div>
    </div>
  );
}
