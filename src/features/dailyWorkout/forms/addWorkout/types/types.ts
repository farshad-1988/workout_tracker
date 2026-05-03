import type { UseFormReturn } from "react-hook-form";
import type { WorkoutFormData } from "../schemas/workoutSchemas";

export interface WorkoutDialogProps {
  form: UseFormReturn<WorkoutFormData>;
  exerciseTypes: string[];
  setExerciseTypes: React.Dispatch<React.SetStateAction<string[]>>;
  isDuplicateExerciseName: boolean;
  onSubmit: (data: WorkoutFormData) => Promise<void>;
  displayDate: string;
}

export interface ActionButtonsProps {
  onWorkoutClick: () => void;
  onGoalsClick: () => void;
}
