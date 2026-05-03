// components/WorkoutForm/ActionButtons.tsx
import React from "react";
import { Target } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";

export const ActionButtons: React.FC<{ onGoalsClick: () => void }> = ({
  onGoalsClick,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-stretch">
      <DialogTrigger asChild>
        <button
          onClick={onGoalsClick}
          className="cursor-pointer group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl px-6 py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          <div className="relative flex items-center justify-center gap-3">
            <Target className="w-6 h-6" />
            <div className="text-right">
              <div className="font-bold text-lg">تنظیم اهداف</div>
            </div>
          </div>
        </button>
      </DialogTrigger>
    </div>
  );
};
