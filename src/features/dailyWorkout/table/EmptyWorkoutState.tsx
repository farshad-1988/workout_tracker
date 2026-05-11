// components/DailyWorkout/EmptyWorkoutState.tsx
import AddWorkout from "../forms/addWorkout/addWorkout";
import SetGoal from "../forms/setGoal/SetGoal";

const EmptyWorkoutState = () => {
  return (
    <div className="flex gap-6 text-2xl font-bold items-center justify-center mt-32 text-center text-gray-900">
      هنوز تمرینی برای این تاریخ ثبت نکرده اید
      <AddWorkout />
      <SetGoal />
    </div>
  );
};

export default EmptyWorkoutState;
