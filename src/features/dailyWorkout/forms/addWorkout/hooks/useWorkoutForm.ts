import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import checkDay from "@/utils/checkDay";

import type { Exercise, ExtraData, UpdatedData } from "@/types/types";
import { workoutSchema, type WorkoutFormData } from "../schemas/workoutSchemas";
import { useContext } from "react";
import { ExerciseContext } from "@/shared/contexts/exerciseContext/utils/contextCreator";
import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";

interface UseWorkoutFormProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  modifiedPickedDate: string;
  extraData: ExtraData;
  setExtraData: React.Dispatch<React.SetStateAction<ExtraData>>;
  onSuccess: () => void;
}

export const useWorkoutForm = ({
  modifiedPickedDate,
  extraData,
  setExtraData,
  onSuccess,
}: UseWorkoutFormProps) => {
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
  const { dispatch } = useContext(ExerciseContext);

  const { exercises } = useDailyData(modifiedPickedDate);
  const watchedExerciseName = form.watch("exerciseName");

  const isDuplicateExerciseName = exercises.some(
    (ex) =>
      ex.exerciseName.trim().toLowerCase() ===
        watchedExerciseName?.trim().toLowerCase() &&
      ex.date === modifiedPickedDate,
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
      const updatedData: UpdatedData = {};

      updatedData.totalCalories =
        (extraData.totalCalories || 0) + data.caloriesBurned;
      updatedData.totalDuration =
        (extraData.totalDuration || 0) + data.duration;

      setExtraData((prev) => ({ ...prev, ...updatedData }));

      toast.success("تمرین با موفقیت ثبت شد!", {
        description: " در تمرینات " + checkDay(modifiedPickedDate),
      });

      dispatch({
        type: "ADD_EXERCISE",
        dateKey: modifiedPickedDate,
        exercise: {
          ...data,
          exerciseName: data.exerciseName.trim(),
          date: modifiedPickedDate,
          id: crypto.getRandomValues,
        },
      });

      form.reset();
      onSuccess();
    } catch (error) {
      toast.error("خطا در ثبت تمرین", {
        description: "لطفاً دوباره تلاش کنید",
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
