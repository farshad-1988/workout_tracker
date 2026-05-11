// components/WorkoutForm/index.tsx
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { useWorkoutForm } from "./hooks/useWorkoutForm";
import { ActionButtons } from "./components/ActionButtons";
import { WorkoutDialog } from "./components/WorkoutDialog";
import { useModifiedPickedDate } from "../../hooks/useModifiedPickedDate";

const AddWorkout = () => {
  const [workoutOpen, setWorkoutOpen] = useState(false);
  const dateKey = useModifiedPickedDate();
  const {
    form: workoutForm,
    isDuplicateExerciseName,
    submitForm,
  } = useWorkoutForm({
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
              isDuplicateExerciseName={isDuplicateExerciseName}
              onSubmit={submitForm}
              displayDate={dateKey}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default AddWorkout;
