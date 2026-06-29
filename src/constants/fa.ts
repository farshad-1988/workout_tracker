import type {
  BioText,
  ChartText,
  GoalFormCopy,
  UiCopy,
  WorkoutFormCopy,
} from "./types";

export const bioText: BioText = {
  dashboardTitle: "داشبورد ورزشی",
  dashboardSubtitle: "پیگیری و مدیریت تمرین‌های روزانه",
  mobileDashboardShort: "داشبورد",
  today: "امروز",
  yesterday: "دیروز",
};

export const chartText: ChartText = {
  analyticsBadge: "تحلیل تمرین",
  pageTitle: "پیگیری",
  pageHighlight: "کالری",
  caloriesBurned: "کالری سوزانده‌شده",
  prevPeriod: "قبل",
  nextPeriod: "بعد",
  totalCalories: "مجموع کالری",
  dailyAverage: "میانگین",
  activeBuckets: "روزهای فعال",
  activeMonths: "ماه‌های فعال",
  footerTracking: "ردیابی کالری روزانه",
  bestDay: "بهترین روز",
  periodTotal: "مجموع دوره",
  caloriesUnit: "کالری",
  tooltipCalories: "کالری",
  tooltipNoData: "داده‌ای موجود نیست",
  tabWeek: "هفته",
  tabMonth: "ماه",
  tabYear: "سال",
  loadingChart: "در حال بارگذاری نمودار…",
};

export const uiCopy: UiCopy = {
  workoutsListPrefix: "لیست تمرین‌های",
  toastWorkoutSaved: "تمرین با موفقیت ثبت شد!",
  toastWorkoutSavedDescriptionPrefix: "در تمرینات ",
  toastWorkoutError: "خطا در ثبت تمرین",
  toastWorkoutErrorDescription: "لطفاً دوباره تلاش کنید",
  colExerciseName: "نام تمرین",
  colType: "نوع",
  colDuration: "مدت زمان",
  colCalories: "کالری سوخته",
  colActions: "عملیات",
};

export const workoutFormCopy: WorkoutFormCopy = {
  dialogTitlePrefix: "ثبت تمرین برای",
  dialogDescription: "جزئیات تمرین خود را وارد کنید",
  exerciseName: "نام تمرین",
  exerciseType: "نوع تمرین",
  duration: "مدت زمان (دقیقه)",
  caloriesBurned: "کالری سوخته",
  selectTypePlaceholder: "نوع تمرین را انتخاب کنید",
  submit: "ثبت تمرین",
  submitting: "در حال ثبت...",
  duplicateExercise: "این تمرین قبلاً در این تاریخ ثبت شده است.",
  namePlaceholder: "مثال: دویدن در پارک",
  durationPlaceholder: "۳۰",
  caloriesPlaceholder: "۲۰۰",
};

export const goalFormCopy: GoalFormCopy = {
  title: "هدف این روز ",
  description: "اهداف کالری و زمان ورزش روزانه خود را تعیین کنید",
  calorieGoal: "هدف کالری روزانه",
  durationGoal: "هدف زمان ورزش روزانه (دقیقه)",
  currentGoals: "اهداف فعلی:",
  caloriesLine: "کالری",
  durationLine: "زمان",
  save: "ذخیره اهداف",
  saving: "در حال ثبت...",
};
export const calendarText = {
  title: "انتخاب تاریخ",
  calenderHeader: "تاریخ تمرین را انتخاب کنید",
};
export const exerciseRegister = {
  title: "ثبت تمرین",
};
export const addExerciseType = {
  title: "افزودن نوع تمرین جدید",
  placeholder: "نام نوع تمرین را وارد کنید",
  duplicate: "این تمرین تکراری است.",
  cancel: "انصراف",
  add: "افزودن",
};
export const workoutTable = {
  exerciseName: "نام تمرین",
  exerciseType: "نوع",
  duration: "مدت (دقیقه)",
  calories: "کالری",
  save: "ذخیره",
  cancel: "لغو",
  deleteConfirm: "آیا از پاک کردن این تمرین اطمینان دارید ؟",
  durationUnit: "دقیقه",
  caloriesUnit: "کیلوکالری",
  durationLabel: "مدت زمان",
  caloriesBurnedLabel: "کالری سوزانده",
  editAriaLabel: "ویرایش",
  deleteAriaLabel: "حذف",
};
export const comparisons = {
  increase: "افزایش",
  decrease: "کاهش",
  comparedToAverage: "نسبت به میانگین",
  dailyTarget: "هدف روزانه",
  goalAchieved: "✓ هدف محقق شد!",
  ofGoal: "از هدف",
  remaining: "مانده",
  complete: "کامل",

  // workout comparisons
  todayWorkoutDuration: "مدت ورزش امروز",
  caloriesBurned: "کالری سوخته",
  minute: "دقیقه",
  calorie: "کالری",

  // goals form
  goalsSavedSuccess: "اهداف روزانه با موفقیت ثبت شد!",
  calorieGoalLabel: "هدف کالری",
  timeGoalLabel: "هدف زمان",
  goalsSaveError: "خطا در ثبت اهداف",
  tryAgain: "لطفاً دوباره تلاش کنید",
};
