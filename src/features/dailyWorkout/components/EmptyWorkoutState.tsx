// components/DailyWorkout/EmptyWorkoutState.tsx
import WorkoutForm from "@/components/modals/WorkoutForm";
import type { EmptyWorkoutStateProps } from "@/types/types";
import React from "react";

const EmptyWorkoutState: React.FC<EmptyWorkoutStateProps> = ({
  exercises,
  setExercises,
}) => {
  return (
    <div className="flex gap-6 text-2xl font-bold items-center justify-center mt-32 text-center text-gray-900">
      هنوز تمرینی برای این تاریخ ثبت نکرده اید
      <WorkoutForm exercises={exercises} setExercises={setExercises} />
    </div>
  );
};

export default EmptyWorkoutState;
