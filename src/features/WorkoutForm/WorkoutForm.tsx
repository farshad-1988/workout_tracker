// components/WorkoutForm/index.tsx
import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import type { ExercisesMutateProps } from "@/types/types";
import { useWorkoutData } from "../../shared/hooks/useWorkoutData";
import { useWorkoutForm } from "./hooks/useWorkoutForm";
import { useGoalsForm } from "./hooks/useGoalsForm";
import { ActionButtons } from "./components/ActionButtons";
import { WorkoutDialog } from "./components/WorkoutDialog";
import { GoalsDialog } from "./components/GoalsDialog";

const WorkoutForm: React.FC<ExercisesMutateProps> = ({
  exercises,
  setExercises,
}) => {
  const [workoutOpen, setWorkoutOpen] = useState(false);
  const [goalsOpen, setGoalsOpen] = useState(false);

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

  const { form: goalsForm, submitGoals } = useGoalsForm({
    extraData,
    setExtraData,
    isOpen: goalsOpen,
    onSuccess: () => setGoalsOpen(false),
  });

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Workout Dialog */}
        <Dialog open={workoutOpen} onOpenChange={setWorkoutOpen}>
          <ActionButtons
            onWorkoutClick={() => setWorkoutOpen(true)}
            onGoalsClick={() => setGoalsOpen(true)}
          />
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

        {/* Goals Dialog */}
        <Dialog open={goalsOpen} onOpenChange={setGoalsOpen}>
          {goalsOpen && (
            <GoalsDialog
              form={goalsForm}
              extraData={extraData}
              onSubmit={submitGoals}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default WorkoutForm;
