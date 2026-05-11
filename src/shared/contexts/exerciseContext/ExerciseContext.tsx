import { useReducer, useEffect, type ReactNode } from "react";
import { useLocalStorage } from "usehooks-ts";
import type { State } from "./types/type";
import { deserialize, serialize } from "./utils/serializeHelper";
import reducer from "./ExerciseReducer";
import { ExerciseContext } from "./utils/contextCreator";
import { defaultExercise } from "@/lib/constants/persian";

/* -------- Initial State -------- */
const initialState: State = {
  exercisesByDate: new Map(),
  dailyGoalByDate: new Map(),
  exerciseTypes: defaultExercise,
};

/* -------- Provider -------- */
export function ExerciseProvider({ children }: { children: ReactNode }) {
  const [persisted, setPersisted] = useLocalStorage(
    "exerciseStateMap",
    serialize(initialState),
  );

  const [state, dispatch] = useReducer(reducer, deserialize(persisted));

  useEffect(() => {
    setPersisted(serialize(state));
  }, [state, setPersisted]);

  return (
    <ExerciseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExerciseContext.Provider>
  );
}
