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
}

export type ExtraData = {
  totalCalories?: number;
  totalDuration?: number;
  daysWithWorkouts?: number;
  firstDay?: string;
  lastDay?: string;
  daysPassed?: number;
};
export type Comparisons = {
  title: string;
  today: number;
  avg: number;
  unit: string;
};
