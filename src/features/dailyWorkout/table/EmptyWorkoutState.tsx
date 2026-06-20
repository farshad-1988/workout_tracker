// components/DailyWorkout/EmptyWorkoutState.tsx
import AddWorkout from "../forms/addWorkout/addWorkout";
import SetGoal from "../forms/setGoal/SetGoal";

const EmptyWorkoutState = () => {
  return (
    <div className="flex flex-col gap-6 text-2xl font-bold items-center justify-center mt-32 text-center h-[60vh]">
      <AddWorkout />
      <SetGoal />
    </div>
  );
};

export default EmptyWorkoutState;
