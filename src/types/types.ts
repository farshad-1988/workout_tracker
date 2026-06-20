import type { DateObject } from "react-multi-date-picker";
export type Exercise = {
  caloriesBurned: number;
  date: string;
  duration: number;
  exerciseName: string;
  exerciseType: string;
  id: string;
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
  dailyDurationGoal: number;
  dailyCalorieGoal: number;
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
  iconBg: string;
  text: string;
  bar: string;
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
export interface OutletContext {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}
export interface UseDailyWorkoutProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  pickedDate: string;
}
// components/DailyWorkout/useWorkoutActions.ts
export interface UseWorkoutActionsProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  extraData: ExtraData;
  setExtraData: React.Dispatch<React.SetStateAction<ExtraData>>;
  modifiedPickedDate: string;
  editedExercise: Partial<Exercise>;
  setEditedExercise: React.Dispatch<React.SetStateAction<Partial<Exercise>>>;
  editingExercise: string | null;
  setEditingExercise: React.Dispatch<React.SetStateAction<string | null>>;
}
// components/DailyWorkout/EmptyWorkoutState.tsx
export interface EmptyWorkoutStateProps {
  pickedDate: string;
  modifiedPickedDate: string;
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}
// components/DailyWorkout/WorkoutHeader.tsx
export interface WorkoutHeaderProps {
  pickedDate: string;
  modifiedPickedDate: string;
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

export interface ChartFooterProps {
  caloriesData: (number | null)[];
  totalCalories: number;
  pointLabels: string[];
  footerTracking: string;
  bestDayLabel: string;
  periodTotalLabel: string;
  caloriesUnit: string;
}

export type CaloriesData = (number | null)[];

export interface WeekLabel {
  startOfWeek: DateObject;
  endOfWeek: DateObject;
}

export interface UseGoalsFormProps {
  isOpen: boolean;
  onSuccess: () => void;
}

export interface WorkoutComparisonProps {
  comparisons: ComparisonItem[];
}
export interface UseWorkoutFormProps {
  onSuccess: () => void;
}

export interface ComparisonCardProps {
  item: ComparisonItem;
}
export interface ComparisonHeaderProps {
  scheme: ColorScheme;
  icon: string;
  percentDiff: number;
  isPositive: boolean;
  isNeutral: boolean;
  isPercentage?: boolean;
  title: string;
}
export interface ComparisonValueProps {
  displayValue: number;
  scheme: ColorScheme;
  unit: string;
  isPercentage?: boolean;
}
export interface TargetProgressBarProps {
  targetProgress: number;
  target: number;
  current: number;
  unit: string;
  scheme: ColorScheme;
}

export interface AddExerciseTypeProps {
  setShowAddType: (show: boolean) => void;
}
