// import React from "react";
// import {
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { AlertCircle, Settings } from "lucide-react";

// import { getGoalFormCopy } from "@/constants";
// import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
// import { useModifiedPickedDate } from "@/features/dailyWorkout/hooks/useModifiedPickedDate";
// import type { GoalsDialogProps } from "../schemas/types";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

// export const GoalsDialog: React.FC<GoalsDialogProps> = ({ form, onSubmit }) => {
//   const { locale } = useLanguage();
//   const copy = getGoalFormCopy(locale);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = form;
//   const dateKey = useModifiedPickedDate();
//   const { state } = useExercise();
//   const goal = state.dailyGoalByDate.get(dateKey);

//   return (
//     <DialogContent className="sm:max-w-[500px]">
//       <div className="flex justify-center px-2 py-6">
//         <div className="bg-card w-full max-w-md rounded-2xl border p-6 shadow-sm md:p-8">
//           <DialogTitle className="mb-2 text-center">
//             <div className="from-primary to-destructive mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r">
//               <Settings className="text-primary-foreground size-8" />
//             </div>
//             <div className="text-foreground text-2xl font-bold">
//               {copy.title}
//             </div>
//           </DialogTitle>
//           <DialogDescription className="text-muted-foreground mb-6 text-center">
//             {copy.description}
//           </DialogDescription>

//           <form
//             className="flex flex-col gap-4"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div className="space-y-2">
//               <Label htmlFor="dailyCalorieGoal">
//                 {copy.calorieGoal} <span className="text-destructive">*</span>
//               </Label>
//               <Input
//                 id="dailyCalorieGoal"
//                 type="number"
//                 min={0}
//                 step={1}
//                 aria-invalid={!!errors.dailyCalorieGoal}
//                 {...register("dailyCalorieGoal", { valueAsNumber: true })}
//               />
//               {errors.dailyCalorieGoal && (
//                 <div className="text-destructive flex items-center gap-1 text-sm">
//                   <AlertCircle className="size-4" />
//                   <span>{errors.dailyCalorieGoal.message}</span>
//                 </div>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="dailyDurationGoal">
//                 {copy.durationGoal} <span className="text-destructive">*</span>
//               </Label>
//               <Input
//                 id="dailyDurationGoal"
//                 type="number"
//                 min={0}
//                 step={1}
//                 aria-invalid={!!errors.dailyDurationGoal}
//                 {...register("dailyDurationGoal", { valueAsNumber: true })}
//               />
//               {errors.dailyDurationGoal && (
//                 <div className="text-destructive flex items-center gap-1 text-sm">
//                   <AlertCircle className="size-4" />
//                   <span>{errors.dailyDurationGoal.message}</span>
//                 </div>
//               )}
//             </div>

//             {(goal?.colories || goal?.duration) && (
//               <div className="bg-muted/50 border-border rounded-lg border p-4">
//                 <div className="text-foreground mb-2 text-sm font-medium">
//                   {copy.currentGoals}
//                 </div>
//                 <div className="text-muted-foreground space-y-1 text-sm">
//                   <div>
//                     {copy.caloriesLine}: {goal?.colories ?? 0}
//                   </div>
//                   <div>
//                     {copy.durationLine}: {goal?.duration ?? 0}
//                   </div>
//                 </div>
//               </div>
//             )}

//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? copy.saving : copy.save}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </DialogContent>
//   );
// };
import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, Settings } from "lucide-react";

import { getGoalFormCopy } from "@/constants";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
import { useModifiedPickedDate } from "@/features/dailyWorkout/hooks/useModifiedPickedDate";
import type { GoalsDialogProps } from "../schemas/types";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

export const GoalsDialog: React.FC<GoalsDialogProps> = ({ form, onSubmit }) => {
  const { locale } = useLanguage();
  const copy = getGoalFormCopy(locale);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;
  const dateKey = useModifiedPickedDate();
  const { state } = useExercise();
  const goal = state.dailyGoalByDate.get(dateKey);

  return (
    <DialogContent className="sm:max-w-[500px] bg-background border-border">
      <div className="flex justify-center px-2 py-6">
        <div className="bg-card w-full max-w-md rounded-2xl border border-border p-6 shadow-sm md:p-8">
          <DialogTitle className="mb-2 text-center">
            <div className="from-primary to-danger mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br">
              <Settings className="text-primary-foreground size-8" />
            </div>
            <div className="text-primary-foreground text-2xl font-bold tracking-tight">
              {copy.title}
            </div>
          </DialogTitle>
          <DialogDescription className="text-secondary mb-6 text-center text-sm">
            {copy.description}
          </DialogDescription>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="dailyCalorieGoal"
                className="text-secondary text-xs font-semibold uppercase tracking-wider"
              >
                {copy.calorieGoal} <span className="text-danger">*</span>
              </Label>
              <Input
                id="dailyCalorieGoal"
                type="number"
                min={0}
                step={1}
                aria-invalid={!!errors.dailyCalorieGoal}
                className="bg-background border-border text-primary-foreground placeholder:text-secondary focus-visible:ring-primary"
                {...register("dailyCalorieGoal", { valueAsNumber: true })}
              />
              {errors.dailyCalorieGoal && (
                <div className="text-danger flex items-center gap-1.5 text-xs">
                  <AlertCircle className="size-3.5" />
                  <span>{errors.dailyCalorieGoal.message}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="dailyDurationGoal"
                className="text-secondary text-xs font-semibold uppercase tracking-wider"
              >
                {copy.durationGoal} <span className="text-danger">*</span>
              </Label>
              <Input
                id="dailyDurationGoal"
                type="number"
                min={0}
                step={1}
                aria-invalid={!!errors.dailyDurationGoal}
                className="bg-background border-border text-primary-foreground placeholder:text-secondary focus-visible:ring-primary"
                {...register("dailyDurationGoal", { valueAsNumber: true })}
              />
              {errors.dailyDurationGoal && (
                <div className="text-danger flex items-center gap-1.5 text-xs">
                  <AlertCircle className="size-3.5" />
                  <span>{errors.dailyDurationGoal.message}</span>
                </div>
              )}
            </div>

            {(goal?.colories || goal?.duration) && (
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-secondary mb-2 text-xs font-semibold uppercase tracking-wider">
                  {copy.currentGoals}
                </div>
                <div className="text-primary-foreground space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-secondary">{copy.caloriesLine}</span>
                    <span className="text-success font-medium">
                      {goal?.colories ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-secondary">{copy.durationLine}</span>
                    <span className="text-success font-medium">
                      {goal?.duration ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide disabled:opacity-40"
              disabled={isSubmitting}
            >
              {isSubmitting ? copy.saving : copy.save}
            </Button>
          </form>
        </div>
      </div>
    </DialogContent>
  );
};
