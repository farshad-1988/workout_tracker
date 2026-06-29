import type {
  AppLocale,
  BioText,
  ChartText,
  GoalFormCopy,
  UiCopy,
  WorkoutFormCopy,
} from "./types";
import {
  bioText as bioEn,
  chartText as chartEn,
  uiCopy as uiEn,
  workoutFormCopy as workoutFormEn,
  goalFormCopy as goalFormEn,
  exerciseRegister as exerciseRegisterEn,
  calendarText as calendarTextEn,
  addExerciseType as addExerciseTypeEn,
  workoutTable as workoutTableEn,
  comparisons as comparisonsEn,
} from "./en";
import {
  bioText as bioFa,
  chartText as chartFa,
  uiCopy as uiFa,
  workoutFormCopy as workoutFormFa,
  goalFormCopy as goalFormFa,
  exerciseRegister as exerciseRegisterFa,
  calendarText as calendarTextFa,
  addExerciseType as addExerciseTypeFa,
  workoutTable as workoutTableFa,
  comparisons as comparisonsFa,
} from "./fa";
import {
  goalsValidationMessagesEn,
  goalsValidationMessagesFa,
  workoutValidationMessagesEn,
  workoutValidationMessagesFa,
} from "./formSchemas";

export type {
  AppLocale,
  BioText,
  ChartText,
  GoalFormCopy,
  UiCopy,
  WorkoutFormCopy,
} from "./types";
export type { NavText } from "./navText";
export { getNavText } from "./navText";
export { bioText as bioTextEn, chartText as chartTextEn } from "./en";
export { bioText as bioTextFa, chartText as chartTextFa } from "./fa";

export function getBioText(locale: AppLocale): BioText {
  return locale === "en" ? bioEn : bioFa;
}

export function getChartText(locale: AppLocale): ChartText {
  return locale === "en" ? chartEn : chartFa;
}

export function getUiCopy(locale: AppLocale): UiCopy {
  return locale === "en" ? uiEn : uiFa;
}

export function getWorkoutFormCopy(locale: AppLocale): WorkoutFormCopy {
  return locale === "en" ? workoutFormEn : workoutFormFa;
}

export function getGoalFormCopy(locale: AppLocale): GoalFormCopy {
  return locale === "en" ? goalFormEn : goalFormFa;
}
export function getExerciseRegister(locale: AppLocale) {
  return locale === "en" ? exerciseRegisterEn : exerciseRegisterFa;
}

export function getCalendarText(locale: AppLocale) {
  return locale === "en" ? calendarTextEn : calendarTextFa;
}
export function getWorkoutFormSchema(locale: AppLocale) {
  return locale === "en"
    ? workoutValidationMessagesEn
    : workoutValidationMessagesFa;
}
export function getGoalFormSchema(locale: AppLocale) {
  return locale === "en"
    ? goalsValidationMessagesEn
    : goalsValidationMessagesFa;
}
export function getAddExerciseType(locale: AppLocale) {
  return locale === "en" ? addExerciseTypeEn : addExerciseTypeFa;
}
export function getWorkoutTable(locale: AppLocale) {
  return locale === "en" ? workoutTableEn : workoutTableFa;
}
export function getComparisonsText(locale: AppLocale) {
  return locale === "en" ? comparisonsEn : comparisonsFa;
}
