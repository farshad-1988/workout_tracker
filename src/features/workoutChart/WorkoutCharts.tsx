// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Filler,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { Calendar, Flame, TrendingUp } from "lucide-react";
// import { useMemo, useState } from "react";

// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { getChartText } from "@/constants";
// import { createLineChartOptions } from "@/features/weeklyChart/config/chartConfig";

// import { ChartFooter } from "@/features/weeklyChart/components/ChartFooter";
// import { ChartHeader } from "@/features/weeklyChart/components/ChartHeader";
// import { LoadingOverlay } from "@/features/weeklyChart/components/LoadingOverlay";
// import { StatCard } from "@/features/weeklyChart/components/StatCard";
// import {
//   useWorkoutChartData,
//   type ChartPeriod,
// } from "./hooks/useWorkoutChartData";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Tooltip,
//   Filler,
// );

// export default function WorkoutCharts() {
//   const { locale } = useLanguage();
//   const copy = getChartText(locale);
//   const [tab, setTab] = useState<ChartPeriod>("week");
//   const [weekOffset, setWeekOffset] = useState(0);
//   const [monthOffset, setMonthOffset] = useState(0);
//   const [yearOffset, setYearOffset] = useState(0);

//   const week = useWorkoutChartData("week", weekOffset, locale);
//   const month = useWorkoutChartData("month", monthOffset, locale);
//   const year = useWorkoutChartData("year", yearOffset, locale);

//   const active = tab === "week" ? week : tab === "month" ? month : year;

//   const activeLabel = tab === "year" ? copy.activeMonths : copy.activeBuckets;

//   return (
//     <div className="relative w-full p-2 sm:p-8 lg:p-16">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-8 text-center sm:mb-12">
//           <div className="border-border/60 bg-card text-muted-foreground mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur-sm">
//             <TrendingUp className="text-primary size-5" />
//             <span>{copy.analyticsBadge}</span>
//           </div>
//           <h1 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
//             {copy.pageTitle}{" "}
//             <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
//               {copy.pageHighlight}
//             </span>
//           </h1>
//         </div>

//         <Card className="border-border/60 shadow-lg transition-shadow hover:shadow-xl">
//           <CardContent className="space-y-6 p-4 sm:p-8">
//             <Tabs
//               value={tab}
//               onValueChange={(v) => setTab(v as ChartPeriod)}
//               className="gap-6"
//             >
//               <TabsList className="mx-auto flex w-full max-w-md flex-wrap justify-center sm:flex-nowrap">
//                 <TabsTrigger value="week">{copy.tabWeek}</TabsTrigger>
//                 <TabsTrigger value="month">{copy.tabMonth}</TabsTrigger>
//                 <TabsTrigger value="year">{copy.tabYear}</TabsTrigger>
//               </TabsList>

//               <TabsContent value="week" className="space-y-6">
//                 <ChartHeader
//                   periodLabel={week.periodLabel}
//                   onPrevious={() => setWeekOffset((o) => o - 1)}
//                   onNext={() => setWeekOffset((o) => o + 1)}
//                   canGoNext={week.canGoNext}
//                   title={copy.caloriesBurned}
//                   prevLabel={copy.prevPeriod}
//                   nextLabel={copy.nextPeriod}
//                 />
//                 <ChartBody
//                   chartInstanceKey={`week-${weekOffset}`}
//                   copy={copy}
//                   active={week}
//                 />
//               </TabsContent>

//               <TabsContent value="month" className="space-y-6">
//                 <ChartHeader
//                   periodLabel={month.periodLabel}
//                   onPrevious={() => setMonthOffset((o) => o - 1)}
//                   onNext={() => setMonthOffset((o) => o + 1)}
//                   canGoNext={month.canGoNext}
//                   title={copy.caloriesBurned}
//                   prevLabel={copy.prevPeriod}
//                   nextLabel={copy.nextPeriod}
//                 />
//                 <ChartBody
//                   chartInstanceKey={`month-${monthOffset}`}
//                   copy={copy}
//                   active={month}
//                 />
//               </TabsContent>

//               <TabsContent value="year" className="space-y-6">
//                 <ChartHeader
//                   periodLabel={year.periodLabel}
//                   onPrevious={() => setYearOffset((o) => o - 1)}
//                   onNext={() => setYearOffset((o) => o + 1)}
//                   canGoNext={year.canGoNext}
//                   title={copy.caloriesBurned}
//                   prevLabel={copy.prevPeriod}
//                   nextLabel={copy.nextPeriod}
//                 />
//                 <ChartBody
//                   chartInstanceKey={`year-${yearOffset}`}
//                   copy={copy}
//                   active={year}
//                 />
//               </TabsContent>
//             </Tabs>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
//               <StatCard
//                 icon={Flame}
//                 label={copy.totalCalories}
//                 value={active.stats.totalCalories.toLocaleString()}
//                 iconClassName="bg-destructive/90 text-destructive-foreground"
//               />
//               <StatCard
//                 icon={TrendingUp}
//                 label={copy.dailyAverage}
//                 value={active.stats.avgCalories}
//                 iconClassName="bg-primary text-primary-foreground"
//               />
//               <StatCard
//                 icon={Calendar}
//                 label={activeLabel}
//                 value={active.stats.activeBuckets}
//                 iconClassName="bg-secondary text-secondary-foreground"
//               />
//             </div>

//             <ChartFooter
//               caloriesData={active.stats.values}
//               totalCalories={active.stats.totalCalories}
//               pointLabels={active.pointLabels}
//               footerTracking={copy.footerTracking}
//               bestDayLabel={copy.bestDay}
//               periodTotalLabel={copy.periodTotal}
//               caloriesUnit={copy.caloriesUnit}
//             />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// function ChartBody({
//   active,
//   copy,
//   chartInstanceKey,
// }: {
//   active: ReturnType<typeof useWorkoutChartData>;
//   copy: ReturnType<typeof getChartText>;
//   chartInstanceKey: string;
// }) {
//   const chartOptions = useMemo(
//     () =>
//       createLineChartOptions(active.pointLabels, {
//         tooltipCalories: copy.tooltipCalories,
//         tooltipNoData: copy.tooltipNoData,
//       }),
//     [active.pointLabels, copy.tooltipCalories, copy.tooltipNoData],
//   );

//   return (
//     <div className="relative">
//       <LoadingOverlay isLoading={active.isLoading} label={copy.loadingChart} />
//       <div
//         className={`h-64 transition-opacity duration-300 sm:h-80 lg:h-96 ${
//           active.isLoading ? "opacity-30" : "opacity-100"
//         }`}
//       >
//         <Line
//           key={chartInstanceKey}
//           data={active.chartData}
//           options={chartOptions}
//         />
//       </div>
//     </div>
//   );
// }
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Calendar, Flame, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getChartText } from "@/constants";
import { createLineChartOptions } from "@/features/workoutChart/config/chartConfig";

import { ChartFooter } from "@/features/workoutChart/components/ChartFooter";
import { ChartHeader } from "@/features/workoutChart/components/ChartHeader";
import { LoadingOverlay } from "@/features/workoutChart/components/LoadingOverlay";
import { StatCard } from "@/features/workoutChart/components/StatCard";
import {
  useWorkoutChartData,
  type ChartPeriod,
} from "./hooks/useWorkoutChartData";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

export default function WorkoutCharts() {
  const { locale } = useLanguage();
  const copy = getChartText(locale);
  const [tab, setTab] = useState<ChartPeriod>("week");
  const [weekOffset, setWeekOffset] = useState(0);
  const [monthOffset, setMonthOffset] = useState(0);
  const [yearOffset, setYearOffset] = useState(0);

  const week = useWorkoutChartData("week", weekOffset, locale);
  const month = useWorkoutChartData("month", monthOffset, locale);
  const year = useWorkoutChartData("year", yearOffset, locale);

  const active = tab === "week" ? week : tab === "month" ? month : year;
  const activeLabel = tab === "year" ? copy.activeMonths : copy.activeBuckets;

  return (
    <div className="relative w-full p-2 sm:p-8 lg:p-16">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="mb-8 text-center sm:mb-12">
          <div className="bg-card border border-border text-secondary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold">
            <TrendingUp className="text-primary size-5" />
            <span>{copy.analyticsBadge}</span>
          </div>
          {/* <h1 className="text-primary-foreground mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            {copy.pageTitle}{" "}
            <span className="text-primary">{copy.pageHighlight}</span>
          </h1> */}
        </div>

        {/* Main card */}
        <Card className="border-border bg-card shadow-lg">
          <CardContent className="space-y-6 p-4 sm:p-8">
            <Tabs
              value={tab}
              onValueChange={(v) => setTab(v as ChartPeriod)}
              className="gap-6"
            >
              <TabsList className="bg-background border border-border mx-auto flex w-full max-w-md flex-wrap justify-center sm:flex-nowrap">
                <TabsTrigger
                  value="week"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-secondary"
                >
                  {copy.tabWeek}
                </TabsTrigger>
                <TabsTrigger
                  value="month"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-secondary"
                >
                  {copy.tabMonth}
                </TabsTrigger>
                <TabsTrigger
                  value="year"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-secondary"
                >
                  {copy.tabYear}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="week" className="space-y-6">
                <ChartHeader
                  periodLabel={week.periodLabel}
                  onPrevious={() => setWeekOffset((o) => o - 1)}
                  onNext={() => setWeekOffset((o) => o + 1)}
                  canGoNext={week.canGoNext}
                  title={copy.caloriesBurned}
                  prevLabel={copy.prevPeriod}
                  nextLabel={copy.nextPeriod}
                />
                <ChartBody
                  chartInstanceKey={`week-${weekOffset}`}
                  copy={copy}
                  active={week}
                />
              </TabsContent>

              <TabsContent value="month" className="space-y-6">
                <ChartHeader
                  periodLabel={month.periodLabel}
                  onPrevious={() => setMonthOffset((o) => o - 1)}
                  onNext={() => setMonthOffset((o) => o + 1)}
                  canGoNext={month.canGoNext}
                  title={copy.caloriesBurned}
                  prevLabel={copy.prevPeriod}
                  nextLabel={copy.nextPeriod}
                />
                <ChartBody
                  chartInstanceKey={`month-${monthOffset}`}
                  copy={copy}
                  active={month}
                />
              </TabsContent>

              <TabsContent value="year" className="space-y-6">
                <ChartHeader
                  periodLabel={year.periodLabel}
                  onPrevious={() => setYearOffset((o) => o - 1)}
                  onNext={() => setYearOffset((o) => o + 1)}
                  canGoNext={year.canGoNext}
                  title={copy.caloriesBurned}
                  prevLabel={copy.prevPeriod}
                  nextLabel={copy.nextPeriod}
                />
                <ChartBody
                  chartInstanceKey={`year-${yearOffset}`}
                  copy={copy}
                  active={year}
                />
              </TabsContent>
            </Tabs>

            {/* Stat cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              <StatCard
                icon={Flame}
                label={copy.totalCalories}
                value={active.stats.totalCalories}
                iconClassName="bg-danger text-primary-foreground"
              />
              <StatCard
                icon={TrendingUp}
                label={copy.dailyAverage}
                value={active.stats.avgCalories}
                iconClassName="bg-primary text-primary-foreground"
              />
              <StatCard
                icon={Calendar}
                label={activeLabel}
                value={active.stats.activeBuckets}
                iconClassName="bg-card border border-border text-secondary"
              />
            </div>

            <ChartFooter
              caloriesData={active.stats.values}
              totalCalories={active.stats.totalCalories}
              pointLabels={active.pointLabels}
              footerTracking={copy.footerTracking}
              bestDayLabel={copy.bestDay}
              periodTotalLabel={copy.periodTotal}
              caloriesUnit={copy.caloriesUnit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChartBody({
  active,
  copy,
  chartInstanceKey,
}: {
  active: ReturnType<typeof useWorkoutChartData>;
  copy: ReturnType<typeof getChartText>;
  chartInstanceKey: string;
}) {
  const chartOptions = useMemo(
    () =>
      createLineChartOptions(active.pointLabels, {
        tooltipCalories: copy.tooltipCalories,
        tooltipNoData: copy.tooltipNoData,
      }),
    [active.pointLabels, copy.tooltipCalories, copy.tooltipNoData],
  );

  return (
    <div className="relative">
      <LoadingOverlay isLoading={active.isLoading} label={copy.loadingChart} />
      <div
        className={`h-64 transition-opacity duration-300 sm:h-80 lg:h-96 ${
          active.isLoading ? "opacity-30" : "opacity-100"
        }`}
      >
        <Line
          key={chartInstanceKey}
          data={active.chartData}
          options={chartOptions}
        />
      </div>
    </div>
  );
}
