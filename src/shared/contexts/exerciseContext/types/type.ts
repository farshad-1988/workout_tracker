import type { Exercise } from "@/types/types";

export type DateKey = string;

export type DateKeyReviewEntry = {
  sourceKey: string;
  reason: "ambiguous-calendar" | "invalid-date" | "goal-conflict" | "exercise-conflict";
  canonicalKey?: string;
  goal?: { duration: number; colories: number };
  exercise?: Exercise;
};

export interface State {
  exercisesByDate: Map<DateKey, Exercise[]>;
  dailyGoalByDate: Map<DateKey, { duration: number; colories: number }>;
  exerciseTypes: string[];
  /** Legacy keys whose calendar could not be determined, plus values kept during a merge. */
  dateKeyReview: DateKeyReviewEntry[];
}

export type Action =
  | {
      type: "SET_DAILY_GOAL";
      dateKey: DateKey;
      duration: number;
      colories: number;
    }
  | { type: "ADD_EXERCISE"; dateKey: DateKey; exercise: Exercise }
  | { type: "REMOVE_EXERCISE"; dateKey: DateKey; id: string }
  | {
      type: "UPDATE_EXERCISE";
      dateKey: DateKey;
      id: string;
      patch: Partial<Exercise>;
    }
  | { type: "ADD_EXERCISE_TYPE"; payload: string }
  | { type: "DELETE_EXERCISE_TYPE"; payload: string };
export interface ExerciseContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
export type PersistedState = {
  exercisesByDate?: Record<string, Exercise[]>;
  dailyGoalByDate?: Record<string, { duration: number; colories: number }>;
  /** Written by the current serializer. */
  exerciseType?: string[];
  exerciseTypes?: string[];
  dateKeyReview?: DateKeyReviewEntry[];
};
