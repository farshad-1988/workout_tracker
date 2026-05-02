import { daysInWeekFa } from "@/lib/constants/persian";
import type { CaloriesData, WeekLabel } from "@/types/types";

export function calBestDay(caloriesData: CaloriesData) {
  const validCalories = caloriesData.filter((c) => c !== null) as number[];
  const maxCalories = validCalories.length > 0 ? Math.max(...validCalories) : 0;
  const bestDayIndex = caloriesData.indexOf(maxCalories);
  const bestDay = bestDayIndex !== -1 ? daysInWeekFa[bestDayIndex] : "N/A";

  return bestDay;
}

export function makeChartData(caloriesData: CaloriesData) {
  return {
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
}

export function makeWeekLabel({ startOfWeek, endOfWeek }: WeekLabel) {
  console.log("start", startOfWeek);
  return `${startOfWeek.format("YYYY/MM/DD")} – ${endOfWeek.format(
    "YYYY/MM/DD",
  )}`;
}
