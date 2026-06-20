// // features/workout-comparison/ComparisonHeader.tsx
// import React from "react";
// import { TrendingUp, TrendingDown } from "lucide-react";
// import type { ComparisonHeaderProps } from "@/types/types";

// const ComparisonHeader: React.FC<ComparisonHeaderProps> = ({
//   scheme,
//   icon,
//   percentDiff,
//   isPositive,
//   isNeutral,
//   isPercentage,
//   title,
// }) => {
//   return (
//     <div className="flex items-center justify-between mb-3">
//       <div className={`${scheme.bg} p-2 rounded-lg text-2xl`}>{icon}</div>
//       {!isNeutral && !isPercentage && (
//         <div className="relative group">
//           <div
//             className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full transition-all duration-200 ${
//               isPositive
//                 ? "bg-green-100 text-green-700 group-hover:bg-green-200"
//                 : "bg-red-100 text-red-700 group-hover:bg-red-200"
//             }`}
//           >
//             {isPositive ? (
//               <TrendingUp className="w-3 h-3" />
//             ) : (
//               <TrendingDown className="w-3 h-3" />
//             )}
//             <span>{Math.abs(percentDiff)}%</span>
//           </div>
//           <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-10 shadow-lg">
//             {Math.abs(percentDiff)}% {isPositive ? "افزایش" : "کاهش"} {title}{" "}
//             نسبت به میانگین
//             <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-gray-900"></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ComparisonHeader;

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { ComparisonHeaderProps } from "@/types/types";
import { getComparisonsText } from "@/constants";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

const ComparisonHeader: React.FC<ComparisonHeaderProps> = ({
  scheme,
  icon,
  percentDiff,
  isPositive,
  isNeutral,
  isPercentage,
  title,
}) => {
  const { locale } = useLanguage();
  const comparisonsText = getComparisonsText(locale);

  return (
    <div className="flex items-center justify-between mb-3">
      <div className={`${scheme.iconBg} p-2 rounded-lg text-2xl`}>{icon}</div>

      {!isNeutral && !isPercentage && (
        <div className="relative group">
          <div
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full transition-colors duration-200 ${
              isPositive
                ? "bg-success/15 text-success"
                : "bg-danger/15 text-danger"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            <span>{Math.abs(percentDiff)}%</span>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full end-0 mb-2 px-3 py-2 bg-card border border-border text-primary-foreground text-xs rounded-lg whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-10 shadow-lg">
            {Math.abs(percentDiff)}%{" "}
            {isPositive ? comparisonsText.increase : comparisonsText.decrease}{" "}
            {title} {comparisonsText.comparedToAverage}
            <div className="absolute top-full end-3 border-[6px] border-transparent border-t-border" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ComparisonHeader;
