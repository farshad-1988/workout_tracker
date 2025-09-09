import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
// import WorkoutChart from "./Pages/WorkoutChart";
import WeeklyChart from "./Pages/charts/WeeklyChart";
import DailyWorkoutPage from "./Pages/DailyWorkoutPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/dailyworkout/:pickedDate"
            element={<DailyWorkoutPage />}
          />
          <Route path="/workoutchart/week" element={<WeeklyChart />} />
          {/* <Route path="/workoutchart/month" element={<WorkoutChart />} />
          <Route path="/workoutchart/year" element={<WorkoutChart />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
