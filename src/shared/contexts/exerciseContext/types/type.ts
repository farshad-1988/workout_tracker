import type { Exercise } from "@/types/types";

export type DateKey = string;

export interface State {
  exercisesByDate: Map<DateKey, Exercise[]>;
  dailyGoalByDate: Map<DateKey, number>;
}

export type Action =
  | { type: "SET_DAILY_GOAL"; dateKey: DateKey; goal: number }
  | { type: "ADD_EXERCISE"; dateKey: DateKey; exercise: Exercise }
  | { type: "REMOVE_EXERCISE"; dateKey: DateKey; id: string }
  | {
      type: "UPDATE_EXERCISE";
      dateKey: DateKey;
      id: string;
      patch: Partial<Exercise>;
    };
export interface ExerciseContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
export type PersistedState = {
  exercisesByDate?: Record<string, Exercise[]>;
  dailyGoalByDate?: Record<string, number>;
};
