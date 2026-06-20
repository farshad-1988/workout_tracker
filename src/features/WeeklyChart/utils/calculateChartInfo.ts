import type { CaloriesData, WeekLabel } from "@/types/types";
import { chartPalette } from "@/lib/theme/chartPalette";

export function makeWeekLabel({ startOfWeek, endOfWeek }: WeekLabel) {
  return `${startOfWeek.format("YYYY/MM/DD")} – ${endOfWeek.format(
    "YYYY/MM/DD",
  )}`;
}

export function calBestDay(
  caloriesData: CaloriesData,
  pointLabels: string[],
): string {
  const validCalories = caloriesData.filter((c) => c !== null) as number[];
  if (validCalories.length === 0) {
    return "—";
  }
  const maxCalories = Math.max(...validCalories);
  const bestDayIndex = caloriesData.indexOf(maxCalories);
  const bestDay =
    bestDayIndex !== -1 ? pointLabels[bestDayIndex] ?? "—" : "—";

  return bestDay;
}

export function makeChartData(
  caloriesData: CaloriesData,
  labels: string[],
) {
  return {
    labels,
    datasets: [
      {
        label: "Calories Burned",
        data: caloriesData,
        borderColor: chartPalette.lineBorder,
        backgroundColor: chartPalette.lineFill,
        pointBackgroundColor: chartPalette.pointBackground,
        pointBorderColor: chartPalette.pointBorder,
        fill: true,
        spanGaps: true,
      },
    ],
  };
}
