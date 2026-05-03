// components/DailyWorkout/WorkoutHeader.tsx
import React from "react";
import { Activity } from "lucide-react";
import checkDay from "@/utils/checkDay";
import type { WorkoutHeaderProps } from "@/types/types";
import AddWorkout from "../forms/addWorkout/addWorkout";
import SetGoal from "../forms/setGoal/SetGoal";

const WorkoutHeader: React.FC<WorkoutHeaderProps> = ({
  pickedDate,
  modifiedPickedDate,
  exercises,
  setExercises,
}) => {
  return (
    <div className="relative backdrop-blur-sm rounded-3xl p-4 border border-white/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          {window.innerWidth > 500 && (
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                داشبورد ورزشی {checkDay(pickedDate ?? modifiedPickedDate)}
              </h1>
              <p className="text-gray-600 mt-1">
                پیگیری و مدیریت تمرین‌های روزانه
              </p>
            </div>
          )}
        </div>
        {exercises.length !== 0 ? (
          <>
            <AddWorkout exercises={exercises} setExercises={setExercises} />
            <SetGoal />
          </>
        ) : (
          <div className="text-xl md:hidden text-gray-900 italic">
            داشبورد {checkDay(pickedDate ?? modifiedPickedDate)}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutHeader;
