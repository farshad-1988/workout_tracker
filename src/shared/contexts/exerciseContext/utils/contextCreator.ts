import { createContext } from "react";
import type { ExerciseContextType } from "../types/type";

export const ExerciseContext = createContext<ExerciseContextType | null>(null);
