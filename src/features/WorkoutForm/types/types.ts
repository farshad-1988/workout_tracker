import type { UseFormReturn } from "react-hook-form";
import type { GoalsFormData, WorkoutFormData } from "../schemas/workoutSchemas";
import type { ExtraData } from "@/types/types";

export interface WorkoutDialogProps {
  form: UseFormReturn<WorkoutFormData>;
  exerciseTypes: string[];
  setExerciseTypes: React.Dispatch<React.SetStateAction<string[]>>;
  isDuplicateExerciseName: boolean;
  onSubmit: (data: WorkoutFormData) => Promise<void>;
  displayDate: string;
}

export interface GoalsDialogProps {
  form: UseFormReturn<GoalsFormData>;
  extraData: ExtraData;
  onSubmit: (data: GoalsFormData) => Promise<void>;
}
export interface ActionButtonsProps {
  onWorkoutClick: () => void;
  onGoalsClick: () => void;
}
