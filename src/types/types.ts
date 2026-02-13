// export interface ExerciseForm {
//   exerciseName: string;
//   exerciseType: string;
//   duration: number;
//   caloriesBurned: number;
//   date: string;
// }

export type Exercise = {
  caloriesBurned: number;
  date: string;
  duration: number;
  exerciseName: string;
  exerciseType: string;
};
export interface ExercisesMutateProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  // extraData: ExtraData;
  // setExtraData: React.Dispatch<React.SetStateAction<ExtraData[]>>;
}

export type ExtraData = {
  totalCalories?: number;
  totalDuration?: number;
  daysWithWorkouts?: number;
  firstDay?: string;
  lastDay?: string;
  daysPassed?: number;
  registeredDate?: string[];
  dailyDurationGoal?: number;
  dailyCalorieGoal?: number;
};
export type UpdatedData = {
  totalCalories?: number;
  totalDuration?: number;
  daysWithWorkouts?: number;
  firstDay?: string;
  lastDay?: string;
  daysPassed?: number;
  registeredDate?: string[];
};
export type Comparisons = {
  title: string;
  today: number;
  avg: number;
  unit: string;
};

// types/comparison.types.ts (or add to your existing types file)
export type ColorType = "blue" | "orange" | "purple" | "green";

export interface ColorScheme {
  bg: string;
  text: string;
  gradient: string;
}

export type ColorSchemes = Record<ColorType, ColorScheme>;

export interface ComparisonItem {
  title: string;
  current: number;
  average: number;
  target?: number;
  unit: string;
  color: ColorType;
  icon: string;
  isPercentage?: boolean;
}
