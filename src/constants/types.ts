export type AppLocale = "en" | "fa";

export type BioText = {
  dashboardTitle: string;
  dashboardSubtitle: string;
  mobileDashboardShort: string;
  today: string;
  yesterday: string;
};

export type UiCopy = {
  workoutsListPrefix: string;
  toastWorkoutSaved: string;
  toastWorkoutSavedDescriptionPrefix: string;
  toastWorkoutError: string;
  toastWorkoutErrorDescription: string;
  colExerciseName: string;
  colType: string;
  colDuration: string;
  colCalories: string;
  colActions: string;
};

export type ChartText = {
  analyticsBadge: string;
  pageTitle: string;
  pageHighlight: string;
  caloriesBurned: string;
  prevPeriod: string;
  nextPeriod: string;
  totalCalories: string;
  dailyAverage: string;
  activeBuckets: string;
  activeMonths: string;
  footerTracking: string;
  bestDay: string;
  periodTotal: string;
  caloriesUnit: string;
  tooltipCalories: string;
  tooltipNoData: string;
  tabWeek: string;
  tabMonth: string;
  tabYear: string;
  loadingChart: string;
};

export type WorkoutFormCopy = {
  dialogTitlePrefix: string;
  dialogDescription: string;
  exerciseName: string;
  exerciseType: string;
  duration: string;
  caloriesBurned: string;
  selectTypePlaceholder: string;
  submit: string;
  submitting: string;
  duplicateExercise: string;
  namePlaceholder: string;
  durationPlaceholder: string;
  caloriesPlaceholder: string;
};

export type GoalFormCopy = {
  title: string;
  description: string;
  calorieGoal: string;
  durationGoal: string;
  currentGoals: string;
  caloriesLine: string;
  durationLine: string;
  save: string;
  saving: string;
};
