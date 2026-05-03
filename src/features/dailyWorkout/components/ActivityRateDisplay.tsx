// features/workout-comparison/ActivityRateDisplay.tsx
import React from "react";

interface ActivityRateDisplayProps {
  current: number;
  average: number;
}

const ActivityRateDisplay: React.FC<ActivityRateDisplayProps> = ({
  daysPassed,
  average,
  workoutDays,
}) => {
  console.log(average, daysPassed, workoutDays);
  return (
    <div className="text-xs text-gray-500">
      <span className="font-semibold text-gray-700">{workoutDays} روز</span> از
      {daysPassed}
      <span className="font-semibold text-gray-700">{average}</span>
    </div>
  );
};

export default ActivityRateDisplay;
