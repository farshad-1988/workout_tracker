// // hooks/useGoalsForm.ts
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect } from "react";
// import { toast } from "sonner";

// import type { UseGoalsFormProps } from "@/types/types";
// import { goalsSchema, type GoalsFormData } from "../schemas/goalSchema";

// export const useGoalsForm = ({
//   isOpen,
//   onSuccess,
// }: UseGoalsFormProps) => {
//   const form = useForm<GoalsFormData>({
//     resolver: zodResolver(goalsSchema),
//     mode: "onChange",
//   });

//   useEffect(() => {
//     if (isOpen) {
//       form.reset({
//         dailyCalorieGoal: ,
//         dailyDurationGoal: ,
//       });
//     }
//   }, [isOpen, form]);

//   const submitGoals = async (data: GoalsFormData) => {
//     try {

//       toast.success("اهداف روزانه با موفقیت ثبت شد!", {
//         description: `هدف کالری: ${data.dailyCalorieGoal} | هدف زمان: ${data.dailyDurationGoal} دقیقه`,
//       });

//       onSuccess();
//     } catch (error) {
//       toast.error("خطا در ثبت اهداف", {
//         description: "لطفاً دوباره تلاش کنید",
//       });
//       console.error("Error submitting goals:", error);
//     }
//   };

//   return {
//     form,
//     submitGoals,
//   };
// };
// hooks/useGoalsForm.ts
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import type { UseGoalsFormProps } from "@/types/types";
import { goalsSchema, type GoalsFormData } from "../schemas/goalSchema";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
import { getGoals } from "@/shared/contexts/exerciseContext/selectors/exerciseStates";
import { useModifiedPickedDate } from "@/features/dailyWorkout/hooks/useModifiedPickedDate";

// اگر در پروژه‌ات useWorkoutDispatch اسمش فرق دارد بگو
export const useGoalsForm = ({ isOpen, onSuccess }: UseGoalsFormProps) => {
  const { dispatch, state } = useExercise();

  const dateKey = useModifiedPickedDate();
  const form = useForm<GoalsFormData>({
    resolver: zodResolver(goalsSchema),
    mode: "onChange",
    defaultValues: {
      dailyCalorieGoal: 0,
      dailyDurationGoal: 0,
    },
  });

  // وقتی دیالوگ باز میشه، فرم رو با مقادیر فعلی پر کن
  useEffect(() => {
    if (!isOpen) return;
    const goals = getGoals(state, dateKey);
    console.log(goals);
    form.reset({
      dailyCalorieGoal: goals.colories ?? 0,
      dailyDurationGoal: goals.duration ?? 0,
    });
  }, [dateKey, form, isOpen, state]);

  const submitGoals = async (data: GoalsFormData) => {
    try {
      // dispatch به reducer
      dispatch({
        type: "SET_DAILY_GOAL",
        dateKey,
        duration: data.dailyDurationGoal,
        colories: data.dailyCalorieGoal, // توجه: reducer شما نوشته colories
      });

      toast.success("اهداف روزانه با موفقیت ثبت شد!", {
        description: `هدف کالری: ${data.dailyCalorieGoal} | هدف زمان: ${data.dailyDurationGoal} دقیقه`,
      });

      onSuccess();
    } catch (error) {
      toast.error("خطا در ثبت اهداف", {
        description: "لطفاً دوباره تلاش کنید",
      });
      console.error("Error submitting goals:", error);
    }
  };

  return { form, submitGoals };
};
