import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getBioText, getUiCopy } from "@/constants";
import { getDayLabel } from "@/utils/getDayLabel";
import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
import { useModifiedPickedDate } from "@/features/dailyWorkout/hooks/useModifiedPickedDate";
import type { UseWorkoutFormProps } from "@/types/types";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
import useWorkoutSchema from "./useWorkoutSchema";
import type { WorkoutFormData } from "../schemas/workoutSchemas";

export const useWorkoutForm = ({ onSuccess }: UseWorkoutFormProps) => {
  const { locale } = useLanguage();
  const workoutSchema = useWorkoutSchema();
  const ui = getUiCopy(locale);
  const bio = getBioText(locale);
  const form = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutSchema),
    mode: "onChange",
    defaultValues: {
      exerciseName: "",
      exerciseType: "",
      duration: 0,
      caloriesBurned: 0,
    },
  });
  const { dispatch } = useExercise();
  const dateKey = useModifiedPickedDate();
  const { exercises } = useDailyData(dateKey);
  const watchedExerciseName = form.watch("exerciseName");

  const isDuplicateExerciseName = exercises.some(
    (ex) =>
      ex.exerciseName.trim().toLowerCase() ===
        watchedExerciseName?.trim().toLowerCase() && ex.date === dateKey,
  );

  const submitForm = async (data: WorkoutFormData) => {
    // if (isDuplicateExerciseName) {
    //   toast.error("تمرین ثبت نشد", {
    //     description:
    //       "لطفاً نام تمرین را تغییر دهید، این نام قبلاً در این تاریخ ثبت شده است.",
    //   });
    //   return;
    // }

    try {
      dispatch({
        type: "ADD_EXERCISE",
        dateKey,
        exercise: {
          ...data,
          exerciseName: data.exerciseName.trim(),
          date: dateKey,
          id: crypto.randomUUID().replace(/-/g, ""),
        },
      });
      toast.success(ui.toastWorkoutSaved, {
        description:
          ui.toastWorkoutSavedDescriptionPrefix +
          getDayLabel(dateKey, locale, bio),
      });

      form.reset();
      onSuccess();
    } catch (error) {
      toast.error(ui.toastWorkoutError, {
        description: ui.toastWorkoutErrorDescription,
      });
      console.error("Error submitting workout:", error);
    }
  };

  return {
    form,
    isDuplicateExerciseName,
    submitForm,
  };
};
