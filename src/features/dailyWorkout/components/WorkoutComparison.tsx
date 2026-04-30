// features/workout-comparison/WorkoutComparison.tsx
import React from "react";
import type { ComparisonItem } from "@/types/types";
import ComparisonCard from "./ComparisonCard";

interface WorkoutComparisonProps {
  comparisons: ComparisonItem[];
}

const WorkoutComparison: React.FC<WorkoutComparisonProps> = ({
  comparisons,
}) => {
  return (
    <div className="grid gap-5 mb-10 md:grid-cols-1 lg:grid-cols-3">
      {comparisons.map((item, idx) => (
        <ComparisonCard key={idx} item={item} />
      ))}
    </div>
  );
};

export default WorkoutComparison;
