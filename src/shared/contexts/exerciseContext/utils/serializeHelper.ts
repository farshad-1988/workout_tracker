import { defaultExercise } from "@/lib/constants/persian";
import type { PersistedState, State } from "../types/type";

/* -------- Helper Serialization -------- */
export function serialize(state: State) {
  return {
    exercisesByDate: Object.fromEntries(state.exercisesByDate),
    dailyGoalByDate: Object.fromEntries(state.dailyGoalByDate),
    exerciseType: state.exerciseTypes,
  };
}

export function deserialize(raw: unknown): State {
  if (!raw || typeof raw !== "object") {
    return {
      exercisesByDate: new Map(),
      dailyGoalByDate: new Map(),
      exerciseTypes: defaultExercise,
    };
  }

  const data = raw as PersistedState;

  return {
    exercisesByDate: new Map(Object.entries(data.exercisesByDate ?? {})),
    dailyGoalByDate: new Map(Object.entries(data.dailyGoalByDate ?? {})),
    exerciseTypes: data.exerciseTypes || defaultExercise,
  };
}
