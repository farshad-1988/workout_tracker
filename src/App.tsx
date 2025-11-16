import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";

// Lazy load heavy components
const WeeklyChart = lazy(() => import("./Pages/charts/WeeklyChart"));
const DailyWorkoutPage = lazy(() => import("./Pages/DailyWorkoutPage"));

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/dailyworkout/:pickedDate"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                }
              >
                <DailyWorkoutPage />
              </Suspense>
            }
          />
          <Route
            path="/workoutchart/week"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                }
              >
                <WeeklyChart />
              </Suspense>
            }
          />
          {/* <Route path="/workoutchart/month" element={<WorkoutChart />} />
          <Route path="/workoutchart/year" element={<WorkoutChart />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
