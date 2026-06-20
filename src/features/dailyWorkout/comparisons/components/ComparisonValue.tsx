// // features/workout-comparison/ComparisonValue.tsx
// import React from "react";
// import type { ComparisonValueProps } from "@/types/types";

// const ComparisonValue: React.FC<ComparisonValueProps> = ({
//   displayValue,
//   scheme,
//   unit,
//   isPercentage,
// }) => {
//   return (
//     <div className="flex items-baseline gap-1.5 mb-4">
//       <span className={`text-3xl font-bold ${scheme.text}`}>
//         {displayValue.toLocaleString("fa-IR")}
//       </span>
//       <span className="text-sm text-gray-500">{isPercentage ? "%" : unit}</span>
//     </div>
//   );
// };

// export default ComparisonValue;

import React from "react";
import type { ComparisonValueProps } from "@/types/types";

const ComparisonValue: React.FC<ComparisonValueProps> = ({
  displayValue,
  scheme,
  unit,
  isPercentage,
}) => {
  return (
    <div className="flex items-baseline gap-1.5 mb-4">
      <span className={`text-3xl font-bold ${scheme.text}`}>
        {displayValue}
      </span>
      <span className="text-sm text-secondary">
        {isPercentage ? "%" : unit}
      </span>
    </div>
  );
};

export default ComparisonValue;
