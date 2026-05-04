import { DateObject } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";

export function calculateDaysFrom(selectedDate: string): number {
  const past = new DateObject({
    date: selectedDate,
    format: "YYYY-MM-DD",
    calendar: persian,
    locale: persian_fa,
  });
  const today = new DateObject({
    format: "YYYY-MM-DD",
    calendar: persian,
    locale: persian_fa,
  });

  // Difference in milliseconds
  const diffMs = today.valueOf() - past.valueOf();

  // Convert milliseconds to days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays + 1;
}

export const calDayValue = (dateStr) => {
  return new DateObject({
    date: dateStr,
    format: "YYYY-MM-DD",
    calendar: persian,
    locale: persian_fa,
  }).valueOf();
};

export const daysWithWorkout = (state) => {
  return [...state.exercisesByDate.keys()].sort(
    (a, b) => calDayValue(a) - calDayValue(b),
  );
};

export const firstLastDay = (state) => {
  const sortedDates = daysWithWorkout(state);
  const firstDay = sortedDates[0];
  const lastDay = sortedDates[sortedDates.length - 1];
  return { firstDay, lastDay };
};

export function getTotalCalories(state): number {
  let total = 0;
  for (const [, exercises] of state.exercisesByDate) {
    for (const ex of exercises) total += ex.caloriesBurned;
  }
  return total;
}

function getTotaltime(state): number {
  let total = 0;
  for (const [, exercises] of state.exercisesByDate) {
    for (const ex of exercises) total += ex.duration;
  }
  return total;
}

export function getActiveDailyAverageDuration(state): number {
  const days = state.exercisesByDate.size || 1;
  return getTotaltime(state) / days;
}

export function getActiveDailyAverageColories(state): number {
  const days = state.exercisesByDate.size || 1;
  return getTotalCalories(state) / days;
}

export function getActiveDaysAverage(state): number {
  const activeDays = state.exercisesByDate.size || 1;
  const { firstDay } = firstLastDay(state);
  const daysPassed = calculateDaysFrom(firstDay);
  return (activeDays / daysPassed).toFixed(2);
}

export function getGoals(state, dateKey) {
  return state.dailyGoalByDate.get(dateKey) || { colories: 200, duration: 60 };
}
