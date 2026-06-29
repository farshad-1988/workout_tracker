import type {
  BioText,
  ChartText,
  GoalFormCopy,
  UiCopy,
  WorkoutFormCopy,
} from "./types";

export const bioText: BioText = {
  dashboardTitle: "Workout dashboard",
  dashboardSubtitle: "Track and manage your daily workouts",
  mobileDashboardShort: "Dashboard",
  today: "Today",
  yesterday: "Yesterday",
};

export const chartText: ChartText = {
  analyticsBadge: "Workout analytics",
  pageTitle: "Calorie",
  pageHighlight: "progress",
  caloriesBurned: "Calories burned",
  prevPeriod: "Previous",
  nextPeriod: "Next",
  totalCalories: "Total calories",
  dailyAverage: "Average",
  activeBuckets: "Active days",
  activeMonths: "Active months",
  footerTracking: "Calorie burn tracking",
  bestDay: "Best day",
  periodTotal: "Period total",
  caloriesUnit: "kcal",
  tooltipCalories: "Calories",
  tooltipNoData: "No data",
  tabWeek: "Week",
  tabMonth: "Month",
  tabYear: "Year",
  loadingChart: "Loading chart…",
};

export const uiCopy: UiCopy = {
  workoutsListPrefix: "Workouts for",
  toastWorkoutSaved: "Workout saved",
  toastWorkoutSavedDescriptionPrefix: "Added to your log for ",
  toastWorkoutError: "Could not save workout",
  toastWorkoutErrorDescription: "Please try again.",
  colExerciseName: "Exercise",
  colType: "Type",
  colDuration: "Duration",
  colCalories: "Calories",
  colActions: "Actions",
};

export const workoutFormCopy: WorkoutFormCopy = {
  dialogTitlePrefix: "Log workout for",
  dialogDescription: "Enter the details of your session.",
  exerciseName: "Exercise name",
  exerciseType: "Exercise type",
  duration: "Duration (minutes)",
  caloriesBurned: "Calories burned",
  selectTypePlaceholder: "Select a type",
  submit: "Save workout",
  submitting: "Saving…",
  duplicateExercise: "This exercise is already logged for this date.",
  namePlaceholder: "e.g. Park run",
  durationPlaceholder: "30",
  caloriesPlaceholder: "200",
};

export const goalFormCopy: GoalFormCopy = {
  title: "Daily goals",
  description: "Set your daily calorie and duration targets.",
  calorieGoal: "Daily calorie goal",
  durationGoal: "Daily duration goal (minutes)",
  currentGoals: "Current goals",
  caloriesLine: "Calories",
  durationLine: "Duration",
  save: "Save goals",
  saving: "Saving…",
};
export const calendarText = {
  title: "Select Date",
  calenderHeader: "Choose Exercise Date",
};

export const exerciseRegister = {
  title: "Add Exercise",
};

export const addExerciseType = {
  title: "Add New Exercise Type",
  placeholder: "Enter exercise type name",
  duplicate: "This exercise already exists.",
  cancel: "Cancel",
  add: "Add",
};

export const workoutTable = {
  exerciseName: "Exercise Name",
  exerciseType: "Type",
  duration: "Duration (min)",
  calories: "Calories",
  save: "Save",
  cancel: "Cancel",
  deleteConfirm: "Are you sure you want to delete this exercise?",
  durationUnit: "min",
  caloriesUnit: "kcal",
  durationLabel: "Duration",
  caloriesBurnedLabel: "Calories Burned",
  editAriaLabel: "Edit",
  deleteAriaLabel: "Delete",
};

export const comparisons = {
  increase: "increase",
  decrease: "decrease",
  comparedToAverage: "compared to average",
  dailyTarget: "Daily Target",
  goalAchieved: "✓ Goal Achieved!",
  ofGoal: "of goal",
  remaining: "remaining",
  complete: "complete",

  // workout comparisons
  todayWorkoutDuration: "Today's Workout Duration",
  caloriesBurned: "Calories Burned",
  minute: "minute",
  calorie: "calorie",

  // goals form
  goalsSavedSuccess: "Daily goals saved successfully!",
  calorieGoalLabel: "Calorie Goal",
  timeGoalLabel: "Time Goal",
  goalsSaveError: "Error saving goals",
  tryAgain: "Please try again",
};
