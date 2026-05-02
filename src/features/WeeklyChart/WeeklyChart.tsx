// src/components/WeeklyChart/index.tsx
import { useState } from "react";
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
import { TrendingUp, Flame, Calendar } from "lucide-react";
import { daysInWeekFa } from "@/lib/constants/persian";
import { useWeeklyCalories } from "./hooks/useWeeklyCalories";
import { ChartHeader } from "./components/ChartHeader";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { chartOptions } from "./config/chartConfig";
import { StatCard } from "./components/StatCard";
import { ChartFooter } from "./components/ChartFooter";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

export default function WeeklyChart() {
  const [weekOffset, setWeekOffset] = useState<number>(0);

  const {
    caloriesData,
    isLoading,
    totalCalories,
    avgCalories,
    startOfWeek,
    endOfWeek,
  } = useWeeklyCalories(weekOffset);

  const chartData = {
    labels: daysInWeekFa,
    datasets: [
      {
        label: "Calories Burned",
        data: caloriesData,
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "#ffffff",
        fill: true,
        spanGaps: true,
      },
    ],
  };

  const weekLabel = `${startOfWeek.format("YYYY/MM/DD")} – ${endOfWeek.format(
    "YYYY/MM/DD",
  )}`;

  return (
    <div className="w-full h-full p-2 sm:p-8 lg:p-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-gray-700">
              Workout Analytics
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Weekly{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Calorie Tracker
            </span>
          </h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500">
          <ChartHeader
            weekLabel={weekLabel}
            weekOffset={weekOffset}
            onPreviousWeek={() => setWeekOffset((prev) => prev - 1)}
            onNextWeek={() => setWeekOffset((prev) => prev + 1)}
          />

          <div className="relative">
            <LoadingOverlay isLoading={isLoading} />

            <div
              className={`h-64 sm:h-80 lg:h-96 transition-opacity duration-300 ${
                isLoading ? "opacity-30" : "opacity-100"
              }`}
            >
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-8">
            <StatCard
              icon={Flame}
              label="Total Calories"
              value={`${totalCalories.toLocaleString()}`}
              color="from-red-500 to-orange-500"
            />
            <StatCard
              icon={TrendingUp}
              label="Daily Average"
              value={`${avgCalories}`}
              color="from-green-500 to-emerald-500"
            />
            <StatCard
              icon={Calendar}
              label="Active Days"
              value={
                caloriesData.filter((cal) => cal !== null && cal > 0).length
              }
              color="from-blue-500 to-indigo-500"
            />
          </div>

          <ChartFooter
            caloriesData={caloriesData}
            totalCalories={totalCalories}
          />
        </div>
      </div>
    </div>
  );
}
