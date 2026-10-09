import { defaultExercise } from "@/lib/constants/persian";
import { migratePersistedDates } from "@/utils/dateKey";
import type { PersistedState, State } from "../types/type";

/* -------- Helper Serialization -------- */
export function serialize(state: State): PersistedState {
  return {
    exercisesByDate: Object.fromEntries(state.exercisesByDate),
    dailyGoalByDate: Object.fromEntries(state.dailyGoalByDate),
    exerciseType: state.exerciseTypes,
    dateKeyReview: state.dateKeyReview,
  };
}

export function deserialize(raw: unknown): State {
  if (!raw || typeof raw !== "object") {
    return {
      exercisesByDate: new Map(),
      dailyGoalByDate: new Map(),
      exerciseTypes: defaultExercise,
      dateKeyReview: [],
    };
  }

  const data = raw as PersistedState;
  const migrated = migratePersistedDates(data);
  const storedTypes = Array.isArray(data.exerciseType)
    ? data.exerciseType
    : Array.isArray(data.exerciseTypes)
      ? data.exerciseTypes
      : defaultExercise;

  return {
    exercisesByDate: new Map(Object.entries(migrated.exercisesByDate)),
    dailyGoalByDate: new Map(Object.entries(migrated.dailyGoalByDate)),
    exerciseTypes: storedTypes,
    dateKeyReview: migrated.dateKeyReview,
  };
}
