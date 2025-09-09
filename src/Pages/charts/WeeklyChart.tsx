import { useEffect, useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Calendar,
  Flame,
} from "lucide-react";

// Mock Exercise type since we don't have access to the actual type
interface Exercise {
  caloriesBurned?: number;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const makeDO = (input?: Date | string) =>
  new DateObject({
    date: input,
    calendar: persian,
    locale: persian_fa,
  });

const cloneDO = (d: DateObject) => makeDO(d.toDate());

const safeParseExercises = (raw: string | null): Exercise[] => {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Exercise[]) : [];
  } catch {
    return [];
  }
};

const daysInWeekFa = [
  "شنبه",
  "یک‌شنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];

const daysInWeekEn = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const getStartOfWeek = (dateObj: DateObject) => {
  const d = makeDO(dateObj.toDate());
  for (let i = 0; i < 7; i++) {
    if (d.weekDay && d.weekDay.name === "شنبه") {
      return makeDO(d.toDate());
    }
    d.subtract(1, "day");
  }
  const idx = daysInWeekFa.indexOf(dateObj.weekDay?.name || "");
  const fallback = makeDO(dateObj.toDate());
  fallback.subtract(idx === -1 ? 0 : idx, "day");
  return fallback;
};

export default function WeeklyChart() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [caloriesData, setCaloriesData] = useState<(number | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCalories, setTotalCalories] = useState(0);
  const [avgCalories, setAvgCalories] = useState(0);

  const today = useMemo(() => makeDO(), []);

  const startOfWeek = useMemo(() => {
    const base = getStartOfWeek(today);
    const shifted = makeDO(base.toDate());
    shifted.add(weekOffset * 7, "day");
    return shifted;
  }, [today, weekOffset]);

  const endOfWeek = useMemo(() => {
    const e = makeDO(startOfWeek.toDate());
    e.add(6, "day");
    return e;
  }, [startOfWeek]);

  useEffect(() => {
    setIsLoading(true);
    const result: (number | null)[] = [];
    let total = 0;
    let validDays = 0;

    for (let i = 0; i < 7; i++) {
      const dayDate = cloneDO(startOfWeek);
      dayDate.add(i, "day");

      const key = dayDate.format("YYYY-MM-DD");

      const exercises = safeParseExercises(localStorage.getItem(key));

      const caloriesForDay = exercises.reduce(
        (total, ex) => total + (ex.caloriesBurned || 0),
        0
      );

      const isFutureInThisWeek =
        weekOffset === 0 &&
        dayDate.toDate().getTime() > today.toDate().getTime();

      const finalCalories = isFutureInThisWeek ? null : caloriesForDay;
      result.push(finalCalories);

      if (finalCalories !== null) {
        total += finalCalories;
        validDays++;
      }
    }

    setCaloriesData(result);
    setTotalCalories(total);
    setAvgCalories(validDays > 0 ? Math.round(total / validDays) : 0);

    // Simulate loading for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  }, [startOfWeek, today, weekOffset]);

  const chartOptions: any = {
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
          title: (context: any) => {
            return daysInWeekFa[context[0].dataIndex];
          },
          label: (context: any) => {
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
            weight: "500",
          },
        },
      },
      y: {
        grid: {
          color: "rgba(107, 114, 128, 0.1)",
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
          callback: (value: any) => `${value}`,
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

  const chartData = {
    labels: daysInWeekEn,
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
    "YYYY/MM/DD"
  )}`;

  const StatCard = ({
    icon: Icon,
    label,
    value,
    color,
  }: {
    icon: any;
    label: string;
    value: string | number;
    color: string;
  }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${color}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 truncate">{label}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            {value}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
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

        {/* Chart Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-500">
          {/* Chart Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="w-full flex justify-between items-center">
              <button
                className="group flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-indigo-500 text-gray-700 hover:text-white font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
                onClick={() => setWeekOffset((prev) => prev - 1)}
                aria-label="هفته قبل"
              >
                <ChevronRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">هفته قبل</span>
              </button>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="p-2 rounded-xl ml-2 bg-gradient-to-br from-blue-500 to-indigo-500">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    کالری سوزانده‌شده
                  </h2>
                  <p className="text-sm text-gray-500">{weekLabel}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  className="group flex items-center space-x-2 rtl:space-x-reverse px-4 py-2.5 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 hover:from-blue-500 hover:to-indigo-500 text-gray-700 hover:text-white font-medium transition-all duration-300 hover:shadow-md hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:from-gray-100 disabled:hover:to-gray-200 disabled:hover:text-gray-700"
                  onClick={() => setWeekOffset((prev) => prev + 1)}
                  disabled={weekOffset >= 0}
                  aria-label="هفته بعد"
                >
                  <span className="hidden sm:inline">هفته بعد</span>
                  <ChevronLeft className="w-4 h-4 group-hover:scale-110 transition-transform group-disabled:scale-100" />
                </button>
              </div>
            </div>
          </div>

          {/* Chart Container */}
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <span className="text-gray-600 font-medium">
                    Loading chart...
                  </span>
                </div>
              </div>
            )}

            <div
              className={`h-64 sm:h-80 lg:h-96 transition-opacity duration-300 ${
                isLoading ? "opacity-30" : "opacity-100"
              }`}
            >
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>
          {/* Stats Cards */}
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

          {/* Chart Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <span>Daily calorie burn tracking</span>
              </div>
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span>
                  Best day:{" "}
                  {daysInWeekFa[
                    caloriesData.indexOf(
                      Math.max(
                        ...(caloriesData.filter((c) => c !== null) as number[])
                      )
                    )
                  ] || "N/A"}
                </span>
                <span>•</span>
                <span>Week total: {totalCalories.toLocaleString()} cal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
