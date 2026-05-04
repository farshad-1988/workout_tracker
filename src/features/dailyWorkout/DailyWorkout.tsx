import React from "react";
import { useOutletContext, useParams, type Params } from "react-router-dom";
import WorkoutHeader from "./components/WorkoutHeader";
import EmptyWorkoutState from "./components/EmptyWorkoutState";
import WorkoutTable from "./table/components/WorkoutTable";
import WorkoutComparison from "./comparisons/WorkoutComparison";
import { useDailyWorkout } from "./hooks/useDailyWorkout";
import type { OutletContext } from "@/types/types";

const DailyWorkout: React.FC = () => {
  const { exercises, setExercises } = useOutletContext<OutletContext>();
  const { pickedDate } = useParams<keyof Params>() as { pickedDate: string };

  const { modifiedPickedDate, comparisons } = useDailyWorkout({
    exercises,
    setExercises,
    pickedDate,
  });
  const dateKey = modifiedPickedDate;
  return (
    <div className="bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12 my-10 sm:my-16 md:my-20 flex flex-col gap-4 w-full max-w-7xl mx-auto h-full">
      <WorkoutHeader
        pickedDate={pickedDate}
        modifiedPickedDate={modifiedPickedDate}
        exercises={exercises}
        setExercises={setExercises}
      />

      {!exercises.length ? (
        <EmptyWorkoutState
          pickedDate={pickedDate}
          modifiedPickedDate={modifiedPickedDate}
          exercises={exercises}
          setExercises={setExercises}
        />
      ) : (
        <>
          <WorkoutTable dateKey={dateKey} />
          <WorkoutComparison comparisons={comparisons} />
        </>
      )}
    </div>
  );
};

export default DailyWorkout;
