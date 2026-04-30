// components/DailyWorkout/useDailyWorkout.ts
import { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Exercise, ExtraData } from "@/types/types";
import { defaultExercise } from "@/lib/constants/persian";
import { useModifiedPickedDate } from "./useModifiedPickedDate";
import { useWorkoutComparisons } from "./useWorkoutComparisons";
import { useWorkoutActions } from "./useWorkoutActions";

interface UseDailyWorkoutProps {
  exercises: Exercise[];
  setExercises: any;
  pickedDate: string;
}

export const useDailyWorkout = ({
  exercises,
  setExercises,
  pickedDate,
}: UseDailyWorkoutProps) => {
  const [extraData, setExtraData] = useLocalStorage<ExtraData>("extraData", {});
  const [editedExercise, setEditedExercise] = useState<Partial<Exercise>>({});
  const [editingExercise, setEditingExercise] = useState<string | null>(null);
  const [exerciseTypes] = useLocalStorage<string[]>(
    "exerciseTypes",
    defaultExercise,
  );

  const modifiedPickedDate = useModifiedPickedDate(pickedDate);
  const comparisons = useWorkoutComparisons({ exercises, extraData });

  const { handleRemove, handleEdit, handleCancel, handleSave } =
    useWorkoutActions({
      exercises,
      setExercises,
      extraData,
      setExtraData,
      modifiedPickedDate,
      editedExercise,
      setEditedExercise,
      editingExercise,
      setEditingExercise,
    });

  return {
    modifiedPickedDate,
    comparisons,
    exerciseTypes,
    editingExercise,
    editedExercise,
    handleRemove,
    handleEdit,
    handleCancel,
    handleSave,
    setEditedExercise,
  };
};
