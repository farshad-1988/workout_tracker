// components/WorkoutForm/index.tsx
import React, { useState } from "react";
import { Dialog } from "@/components/ui/dialog";

import { GoalsDialog } from "./components/GoalsDialog";
import { useWorkoutData } from "@/shared/hooks/useWorkoutData";
import { useGoalsForm } from "./hooks/useGoalsForm";
import { ActionButtons } from "./components/ActionButton";

const SetGoal = () => {
  const [goalsOpen, setGoalsOpen] = useState(false);

  const { extraData, setExtraData } = useWorkoutData();

  const { form: goalsForm, submitGoals } = useGoalsForm({
    extraData,
    setExtraData,
    isOpen: goalsOpen,
    onSuccess: () => setGoalsOpen(false),
  });

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-4 items-stretch">
        {/* Goals Dialog */}
        <Dialog open={goalsOpen} onOpenChange={setGoalsOpen}>
          <ActionButtons onGoalsClick={() => setGoalsOpen(true)} />

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

export default SetGoal;
