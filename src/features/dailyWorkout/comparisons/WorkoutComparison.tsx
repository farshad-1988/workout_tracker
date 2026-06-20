// // features/workout-comparison/WorkoutComparison.tsx
// import React from "react";
// import ComparisonCard from "./components/ComparisonCard";
// import type { WorkoutComparisonProps } from "@/types/types";

// const WorkoutComparison: React.FC<WorkoutComparisonProps> = ({
//   comparisons,
// }) => {
//   return (
//     <div className="grid gap-5 mb-10 md:grid-cols-1 lg:grid-cols-2">
//       {comparisons.map((item, idx) => (
//         <ComparisonCard key={idx} item={item} />
//       ))}
//     </div>
//   );
// };

// export default WorkoutComparison;
import React from "react";
import ComparisonCard from "./components/ComparisonCard";
import type { WorkoutComparisonProps } from "@/types/types";

const WorkoutComparison: React.FC<WorkoutComparisonProps> = ({
  comparisons,
}) => {
  return (
    <div className="grid w-full gap-4 grid-cols-1 lg:grid-cols-2 mb-10">
      {comparisons.map((item, idx) => (
        <ComparisonCard key={idx} item={item} />
      ))}
    </div>
  );
};

export default WorkoutComparison;
