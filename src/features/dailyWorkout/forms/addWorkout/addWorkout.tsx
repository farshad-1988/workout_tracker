// components/WorkoutForm/index.tsx
import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import type { ExercisesMutateProps } from "@/types/types";
import { useWorkoutForm } from "./hooks/useWorkoutForm";
import { ActionButtons } from "./components/ActionButtons";
import { WorkoutDialog } from "./components/WorkoutDialog";
import { useWorkoutData } from "@/shared/hooks/useWorkoutData";

const AddWorkout: React.FC<ExercisesMutateProps> = ({
  exercises,
  setExercises,
}) => {
  const [workoutOpen, setWorkoutOpen] = useState(false);

  const {
    modifiedPickedDate,
    exerciseTypes,
    setExerciseTypes,
    extraData,
    setExtraData,
  } = useWorkoutData();

  const {
    form: workoutForm,
    isDuplicateExerciseName,
    submitForm,
  } = useWorkoutForm({
    exercises,
    setExercises,
    modifiedPickedDate,
    extraData,
    setExtraData,
    onSuccess: () => setWorkoutOpen(false),
  });

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Workout Dialog */}
        <Dialog open={workoutOpen} onOpenChange={setWorkoutOpen}>
          <ActionButtons onWorkoutClick={() => setWorkoutOpen(true)} />
          {workoutOpen && (
            <WorkoutDialog
              form={workoutForm}
              exerciseTypes={exerciseTypes}
              setExerciseTypes={setExerciseTypes}
              isDuplicateExerciseName={isDuplicateExerciseName}
              onSubmit={submitForm}
              displayDate={modifiedPickedDate}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default AddWorkout;
