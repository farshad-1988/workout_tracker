import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import DailyWorkout from "./features/dailyWorkout/DailyWorkout";
import { useLanguage } from "./shared/contexts/languageContext/hook/useLanguage.ts";

const WorkoutCharts = lazy(
  () => import("./features/workoutChart/WorkoutCharts.tsx"),
);

function App() {
  const { locale } = useLanguage();

  useEffect(() => {
    if (locale === "en") {
      document.body.style.direction = "ltr";
    } else if (locale === "fa") {
      document.body.style.direction = "rtl";
    }
  }, [locale]);

  const chartFallback = (
    <div className="flex h-64 items-center justify-center">
      <div className="border-primary size-8 animate-spin rounded-full border-2 border-t-transparent" />
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<DailyWorkout />} />
          <Route path="/dailyworkout/:pickedDate" element={<DailyWorkout />} />
          <Route
            path="/workoutchart"
            element={
              <Suspense fallback={chartFallback}>
                <WorkoutCharts />
              </Suspense>
            }
          />
          <Route
            path="/workoutchart/week"
            element={
              <Suspense fallback={chartFallback}>
                <WorkoutCharts />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
