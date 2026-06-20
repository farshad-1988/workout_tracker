// import React from "react";
// import ComparisonHeader from "./ComparisonHeader";
// import { useComparisonCalculations } from "../hooks/useComparisonCalculations";
// import { COLOR_SCHEMES } from "../../../../styles/style";
// import ComparisonValue from "./ComparisonValue";
// import TargetProgressBar from "./TargetProgressBar";
// import type { ComparisonCardProps } from "@/types/types";

// const ComparisonCard: React.FC<ComparisonCardProps> = ({ item }) => {
//   const { percentDiff, isPositive, isNeutral, targetProgress, displayValue } =
//     useComparisonCalculations(item);

//   const scheme = COLOR_SCHEMES[item.color];

//   return (
//     <div className="bg-background rounded-xl p-5 shadow-sm border border-border hover:shadow-md transition-all duration-200">
//       <ComparisonHeader
//         scheme={scheme}
//         icon={item.icon}
//         percentDiff={percentDiff}
//         isPositive={isPositive}
//         isNeutral={isNeutral}
//         isPercentage={item.isPercentage}
//         title={item.title}
//       />

//       <h3 className="text-sm font-medium text-gray-600 mb-2">{item.title}</h3>

//       <ComparisonValue
//         displayValue={displayValue}
//         scheme={scheme}
//         unit={item.unit}
//         isPercentage={item.isPercentage}
//       />

//       {targetProgress !== null && (
//         <TargetProgressBar
//           targetProgress={targetProgress}
//           target={item.target!}
//           current={item.current}
//           unit={item.unit}
//           scheme={scheme}
//         />
//       )}
//     </div>
//   );
// };

// export default ComparisonCard;

import React from "react";
import ComparisonHeader from "./ComparisonHeader";
import { useComparisonCalculations } from "../hooks/useComparisonCalculations";
import { COLOR_SCHEMES } from "../../../../styles/style";
import ComparisonValue from "./ComparisonValue";
import TargetProgressBar from "./TargetProgressBar";
import type { ComparisonCardProps } from "@/types/types";

const ComparisonCard: React.FC<ComparisonCardProps> = ({ item }) => {
  const { percentDiff, isPositive, isNeutral, targetProgress, displayValue } =
    useComparisonCalculations(item);

  const scheme = COLOR_SCHEMES[item.color];

  return (
    <div className="bg-card rounded-xl p-4 sm:p-5 border border-border hover:border-primary/40 transition-all duration-200 w-full min-w-0">
      <ComparisonHeader
        scheme={scheme}
        icon={item.icon}
        percentDiff={percentDiff}
        isPositive={isPositive}
        isNeutral={isNeutral}
        isPercentage={item.isPercentage}
        title={item.title}
      />

      <h3 className="text-sm font-medium text-secondary mb-2">{item.title}</h3>

      <ComparisonValue
        displayValue={displayValue}
        scheme={scheme}
        unit={item.unit}
        isPercentage={item.isPercentage}
      />

      {targetProgress !== null && (
        <TargetProgressBar
          targetProgress={targetProgress}
          target={item.target!}
          current={item.current}
          unit={item.unit}
          scheme={scheme}
        />
      )}
    </div>
  );
};

export default ComparisonCard;
