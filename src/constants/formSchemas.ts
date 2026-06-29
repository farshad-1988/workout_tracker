export const workoutValidationMessagesFa = {
  exerciseName: {
    required: "نام تمرین الزامی است",
    max: "نام تمرین نباید بیشتر از ۱۰۰ کاراکتر باشد",
  },
  exerciseType: {
    required: "نوع تمرین الزامی است",
  },
  duration: {
    invalidType: "مدت زمان باید عدد باشد",
    positive: "مدت زمان باید بیشتر از صفر باشد",
    max: "مدت زمان نباید بیشتر از ۱۴۴۰ دقیقه (۲۴ ساعت) باشد",
  },
  caloriesBurned: {
    invalidType: "کالری سوخته باید عدد باشد",
    nonnegative: "کالری سوخته نمی‌تواند منفی باشد",
    max: "کالری سوخته نباید بیشتر از ۱۰۰۰۰ باشد",
  },
} as const;

export const workoutValidationMessagesEn = {
  exerciseName: {
    required: "Exercise name is required",
    max: "Exercise name must not exceed 100 characters",
  },
  exerciseType: {
    required: "Exercise type is required",
  },
  duration: {
    invalidType: "Duration must be a number",
    positive: "Duration must be greater than zero",
    max: "Duration must not exceed 1440 minutes (24 hours)",
  },
  caloriesBurned: {
    invalidType: "Calories burned must be a number",
    nonnegative: "Calories burned cannot be negative",
    max: "Calories burned must not exceed 10,000",
  },
} as const;
export const goalsValidationMessagesFa = {
  dailyCalorieGoal: {
    invalidType: "هدف کالری باید عدد باشد",
    positive: "هدف کالری باید بیشتر از صفر باشد",
    max: "هدف کالری نباید بیشتر از ۱۰۰۰۰ باشد",
  },
  dailyDurationGoal: {
    invalidType: "هدف زمان باید عدد باشد",
    positive: "هدف زمان باید بیشتر از صفر باشد",
    max: "هدف زمان نباید بیشتر از ۱۴۴۰ دقیقه (۲۴ ساعت) باشد",
  },
} as const;

export const goalsValidationMessagesEn = {
  dailyCalorieGoal: {
    invalidType: "Daily calorie goal must be a number",
    positive: "Daily calorie goal must be greater than zero",
    max: "Daily calorie goal must not exceed 10,000",
  },
  dailyDurationGoal: {
    invalidType: "Daily duration goal must be a number",
    positive: "Daily duration goal must be greater than zero",
    max: "Daily duration goal must not exceed 1440 minutes (24 hours)",
  },
} as const;
