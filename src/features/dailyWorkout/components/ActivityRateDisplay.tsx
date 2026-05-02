// features/workout-comparison/ActivityRateDisplay.tsx
import React from "react";

interface ActivityRateDisplayProps {
  current: number;
  average: number;
}

const ActivityRateDisplay: React.FC<ActivityRateDisplayProps> = ({
  current,
  average,
}) => {
  return (
    <div className="text-xs text-gray-500">
      <span className="font-semibold text-gray-700">{current} روز</span> از{" "}
      <span className="font-semibold text-gray-700">{average} روز</span>
    </div>
  );
};

export default ActivityRateDisplay;
