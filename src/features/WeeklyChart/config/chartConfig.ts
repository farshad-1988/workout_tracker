import type { ChartOptions, TooltipItem } from "chart.js";
import type { ChartText } from "@/constants/types";
import { chartPalette } from "@/lib/theme/chartPalette";

export function createLineChartOptions(
  pointLabels: string[],
  copy: Pick<ChartText, "tooltipCalories" | "tooltipNoData">,
): ChartOptions<"line"> {
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: chartPalette.tooltipBackground,
        titleColor: chartPalette.tooltipForeground,
        bodyColor: chartPalette.tooltipForeground,
        cornerRadius: 12,
        padding: 16,
        displayColors: false,
        callbacks: {
          title: (context: TooltipItem<"line">[]) => {
            const idx = context[0]?.dataIndex ?? 0;
            return pointLabels[idx] ?? "";
          },
          label: (context: TooltipItem<"line">) => {
            return context.parsed.y !== null
              ? `${context.parsed.y} ${copy.tooltipCalories}`
              : copy.tooltipNoData;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: chartPalette.axisTick,
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      y: {
        grid: {
          color: chartPalette.gridLine,
        },
        border: {
          display: false,
        },
        ticks: {
          color: chartPalette.axisTick,
          font: {
            size: 12,
          },
          callback: (tickValue: string | number) => `${tickValue}`,
        },
      },
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
        borderWidth: 3,
        hoverBorderWidth: 4,
      },
      line: {
        borderWidth: 3,
        tension: 0.4,
      },
    },
  };
}
