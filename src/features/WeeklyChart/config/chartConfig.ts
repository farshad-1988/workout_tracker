// src/config/chartConfig.ts
import type { ChartOptions, TooltipItem } from "chart.js";
import { daysInWeekFa } from "@/lib/constants/persian";

export const chartOptions: ChartOptions<"line"> = {
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
      backgroundColor: "rgba(17, 24, 39, 0.95)",
      titleColor: "#F9FAFB",
      bodyColor: "#F9FAFB",
      cornerRadius: 12,
      padding: 16,
      displayColors: false,
      callbacks: {
        title: (context: TooltipItem<"line">[]) => {
          return daysInWeekFa[context[0].dataIndex];
        },
        label: (context: TooltipItem<"line">) => {
          return context.parsed.y !== null
            ? `${context.parsed.y} کالری`
            : "داده‌ای موجود نیست";
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
        color: "#6B7280",
        font: {
          size: 12,
          weight: 500,
        },
      },
    },
    y: {
      grid: {
        color: "rgba(107, 114, 128, 0.1)",
      },
      border: {
        display: false,
      },
      ticks: {
        color: "#6B7280",
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
