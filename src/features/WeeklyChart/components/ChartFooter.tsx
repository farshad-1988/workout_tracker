// import type { ChartFooterProps } from "@/types/types";
// import { calBestDay } from "../utils/calculateChartInfo";

// export function ChartFooter({
//   caloriesData,
//   totalCalories,
//   pointLabels,
//   footerTracking,
//   bestDayLabel,
//   periodTotalLabel,
//   caloriesUnit,
// }: ChartFooterProps) {
//   const bestDay = calBestDay(caloriesData, pointLabels);

//   return (
//     <div className="mt-6 pt-6 border-t border-border/60">
//       <div className="text-muted-foreground flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-center gap-2">
//           <div className="bg-primary size-3 rounded-full" />
//           <span>{footerTracking}</span>
//         </div>
//         <div className="flex flex-wrap items-center gap-2 sm:gap-4">
//           <span>
//             {bestDayLabel}: {bestDay}
//           </span>
//           <span className="hidden sm:inline">•</span>
//           <span>
//             {periodTotalLabel}: {totalCalories.toLocaleString()} {caloriesUnit}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

import type { ChartFooterProps } from "@/types/types";
import { calBestDay } from "../utils/calculateChartInfo";

export function ChartFooter({
  caloriesData,
  totalCalories,
  pointLabels,
  footerTracking,
  bestDayLabel,
  periodTotalLabel,
  caloriesUnit,
}: ChartFooterProps) {
  const bestDay = calBestDay(caloriesData, pointLabels);

  return (
    <div className="mt-6 pt-6 border-t border-border">
      <div className="text-secondary flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary size-3 rounded-full" />
          <span>{footerTracking}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <span>
            {bestDayLabel}: {bestDay}
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            {periodTotalLabel}: {totalCalories} {caloriesUnit}
          </span>
        </div>
      </div>
    </div>
  );
}
