// import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// export type PeriodChartHeaderProps = {
//   periodLabel: string;
//   onPrevious: () => void;
//   onNext: () => void;
//   canGoNext: boolean;
//   title: string;
//   prevLabel: string;
//   nextLabel: string;
// };

// export function ChartHeader({
//   periodLabel,
//   onPrevious,
//   onNext,
//   canGoNext,
//   title,
//   prevLabel,
//   nextLabel,
// }: PeriodChartHeaderProps) {
//   return (
//     <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
//       <div className="flex w-full items-center justify-between gap-2">
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Button
//               type="button"
//               variant="secondary"
//               size="sm"
//               className="gap-2"
//               onClick={onNext}
//               disabled={!canGoNext}
//               aria-label={nextLabel}
//             >
//               <ChevronRight className="size-4" />
//               <span className="hidden sm:inline">{nextLabel}</span>
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>{nextLabel}</TooltipContent>
//         </Tooltip>

//         <div className="flex items-center gap-3 rtl:gap-reverse">
//           <div className="bg-primary flex size-10 items-center justify-center rounded-xl sm:size-12">
//             <Flame className="size-5 text-primary-foreground sm:size-6" />
//           </div>
//           <div className="min-w-0 text-center sm:text-start">
//             <h2 className="text-foreground text-lg font-bold sm:text-2xl">
//               {title}
//             </h2>
//             <p className="text-muted-foreground text-xs sm:text-sm">
//               {periodLabel}
//             </p>
//           </div>
//         </div>

//         <Tooltip>
//           <TooltipTrigger asChild>
//             <Button
//               type="button"
//               variant="secondary"
//               size="sm"
//               className="gap-2"
//               onClick={onPrevious}
//               aria-label={prevLabel}
//             >
//               <span className="hidden sm:inline">{prevLabel}</span>
//               <ChevronLeft className="size-4" />
//             </Button>
//           </TooltipTrigger>
//           <TooltipContent>{prevLabel}</TooltipContent>
//         </Tooltip>
//       </div>
//     </div>
//   );
// }
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type PeriodChartHeaderProps = {
  periodLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
  title: string;
  prevLabel: string;
  nextLabel: string;
};

export function ChartHeader({
  periodLabel,
  onPrevious,
  onNext,
  canGoNext,
  title,
  prevLabel,
  nextLabel,
}: PeriodChartHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full items-center justify-between gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="sm"
              className="gap-2 bg-card border border-border text-secondary hover:bg-border hover:text-primary-foreground"
              onClick={onPrevious}
              aria-label={prevLabel}
            >
              <ChevronLeft className="size-4" />
              <span className="hidden sm:inline">{prevLabel}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{prevLabel}</TooltipContent>
        </Tooltip>

        <div className="flex items-center gap-3">
          <div className="bg-primary flex size-10 items-center justify-center rounded-xl sm:size-12">
            <Flame className="size-5 text-primary-foreground sm:size-6" />
          </div>
          <div className="min-w-0 text-center sm:text-start">
            <h2 className="text-primary-foreground text-lg font-bold sm:text-2xl">
              {title}
            </h2>
            <p className="text-secondary text-xs sm:text-sm">{periodLabel}</p>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              size="sm"
              className="gap-2 bg-card border border-border text-secondary hover:bg-border hover:text-primary-foreground"
              onClick={onNext}
              disabled={!canGoNext}
              aria-label={nextLabel}
            >
              <span className="hidden sm:inline">{nextLabel}</span>
              <ChevronRight className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{nextLabel}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
