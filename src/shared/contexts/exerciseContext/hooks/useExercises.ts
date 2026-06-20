import { useContext } from "react";
import { ExerciseContext } from "../context/contextCreator";

export function useExercise() {
  const ctx = useContext(ExerciseContext);

  if (!ctx) {
    throw new Error("useExercise must be used inside ExerciseProvider");
  }

  return ctx;
}
