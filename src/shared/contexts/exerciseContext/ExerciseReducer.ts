import type { Action, State } from "./types/type";

export default function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_DAILY_GOAL": {
      const nextGoal = new Map(state.dailyGoalByDate);
      nextGoal.set(action.dateKey, action.goal);
      return { ...state, dailyGoalByDate: nextGoal };
    }

    case "ADD_EXERCISE": {
      const nextExercises = new Map(state.exercisesByDate);
      const existing = nextExercises.get(action.dateKey) ?? [];
      nextExercises.set(action.dateKey, [...existing, action.exercise]);
      return { ...state, exercisesByDate: nextExercises };
    }

    case "REMOVE_EXERCISE": {
      const nextExercises = new Map(state.exercisesByDate);
      const existing = nextExercises.get(action.dateKey) ?? [];
      nextExercises.set(
        action.dateKey,
        existing.filter((e) => e.id !== action.id),
      );
      return { ...state, exercisesByDate: nextExercises };
    }

    case "UPDATE_EXERCISE": {
      const nextExercises = new Map(state.exercisesByDate);
      const existing = nextExercises.get(action.dateKey) ?? [];
      nextExercises.set(
        action.dateKey,
        existing.map((e) =>
          e.id === action.id ? { ...e, ...action.patch } : e,
        ),
      );
      return { ...state, exercisesByDate: nextExercises };
    }

    default:
      return state;
  }
}
