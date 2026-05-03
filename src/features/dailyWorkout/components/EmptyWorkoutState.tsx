// components/DailyWorkout/EmptyWorkoutState.tsx
import type { EmptyWorkoutStateProps } from "@/types/types";
import React from "react";
import AddWorkout from "../forms/addWorkout/addWorkout";
import SetGoal from "../forms/setGoal/SetGoal";

const EmptyWorkoutState: React.FC<EmptyWorkoutStateProps> = ({
  exercises,
  setExercises,
}) => {
  return (
    <div className="flex gap-6 text-2xl font-bold items-center justify-center mt-32 text-center text-gray-900">
      هنوز تمرینی برای این تاریخ ثبت نکرده اید
      <AddWorkout exercises={exercises} setExercises={setExercises} />
      <SetGoal />
    </div>
  );
};

export default EmptyWorkoutState;
