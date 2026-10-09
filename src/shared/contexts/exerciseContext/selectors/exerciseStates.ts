import type { State } from "../types/type";
import { calculateDaysFrom, isCanonicalDateKey } from "@/utils/dateKey";

export { calculateDaysFrom };

export const daysWithWorkout = (state: State) => {
  return [...state.exercisesByDate.keys()]
    .filter((key) => isCanonicalDateKey(key))
    .sort();
};

export const firstLastDay = (state: State) => {
  const sortedDates = daysWithWorkout(state);
  const firstDay = sortedDates[0];
  const lastDay = sortedDates[sortedDates.length - 1];
  return { firstDay, lastDay };
};

export function getTotalCalories(state: State): number {
  let total = 0;
  for (const [, exercises] of state.exercisesByDate) {
    for (const ex of exercises) total += ex.caloriesBurned;
  }
  return total;
}

function getTotaltime(state: State): number {
  let total = 0;
  for (const [, exercises] of state.exercisesByDate) {
    for (const ex of exercises) total += ex.duration;
  }
  return total;
}

export function getActiveDailyAverageDuration(state: State): number {
  const days = state.exercisesByDate.size || 1;
  return getTotaltime(state) / days;
}

export function getActiveDailyAverageColories(state: State): number {
  const days = state.exercisesByDate.size || 1;
  return getTotalCalories(state) / days;
}

export function getActiveDaysAverage(state: State) {
  const activeDays = state.exercisesByDate.size || 1;
  const { firstDay } = firstLastDay(state);
  const daysPassed = calculateDaysFrom(firstDay);
  return (activeDays / daysPassed).toFixed(2);
}

export function getGoals(state: State, dateKey: string) {
  return state.dailyGoalByDate.get(dateKey) || { colories: 200, duration: 60 };
}
export function getExercisesInADay(state: State, dateKey: string) {
  return state.exercisesByDate.get(dateKey) || [];
}
