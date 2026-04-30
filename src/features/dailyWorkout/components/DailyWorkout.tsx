// components/DailyWorkout/DailyWorkout.tsx
import React from "react";
import { useOutletContext, useParams, type Params } from "react-router-dom";
import { useDailyWorkout } from "../hooks/useDailyWorkout";
import WorkoutHeader from "./WorkoutHeader";
import EmptyWorkoutState from "./EmptyWorkoutState";
import WorkoutTable from "./WorkoutTable";
import WorkoutComparison from "./WorkoutComparison";

const DailyWorkout: React.FC = () => {
  const { exercises, setExercises } = useOutletContext<any>();
  const { pickedDate } = useParams<keyof Params>() as { pickedDate: string };

  const {
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
  } = useDailyWorkout({ exercises, setExercises, pickedDate });

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
          <WorkoutTable
            exercises={exercises}
            pickedDate={pickedDate}
            modifiedPickedDate={modifiedPickedDate}
            exerciseTypes={exerciseTypes}
            editingExercise={editingExercise}
            editedExercise={editedExercise}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onSave={handleSave}
            onCancel={handleCancel}
            onEditedExerciseChange={setEditedExercise}
          />
          <WorkoutComparison comparisons={comparisons} />
        </>
      )}
    </div>
  );
};

export default DailyWorkout;
