import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { calculateDaysFrom } from "@/utils/calculateDaysFrom";
import checkDay from "@/utils/checkDay";

import type { Exercise, ExtraData, UpdatedData } from "@/types/types";
import { workoutSchema, type WorkoutFormData } from "../schemas/workoutSchemas";

interface UseWorkoutFormProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  modifiedPickedDate: string;
  extraData: ExtraData;
  setExtraData: React.Dispatch<React.SetStateAction<ExtraData>>;
  onSuccess: () => void;
}

export const useWorkoutForm = ({
  exercises,
  setExercises,
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

  const watchedExerciseName = form.watch("exerciseName");

  const isDuplicateExerciseName = exercises.some(
    (ex) =>
      ex.exerciseName.trim().toLowerCase() ===
        watchedExerciseName?.trim().toLowerCase() &&
      ex.date === modifiedPickedDate,
  );

  const submitForm = async (data: WorkoutFormData) => {
    if (isDuplicateExerciseName) {
      toast.error("تمرین ثبت نشد", {
        description:
          "لطفاً نام تمرین را تغییر دهید، این نام قبلاً در این تاریخ ثبت شده است.",
      });
      return;
    }

    try {
      const updatedData: UpdatedData = {};
      const hasExistingExercises =
        localStorage.getItem(modifiedPickedDate) &&
        Array.isArray(JSON.parse(localStorage.getItem(modifiedPickedDate)!)) &&
        JSON.parse(localStorage.getItem(modifiedPickedDate)!).length !== 0;

      updatedData.totalCalories =
        (extraData.totalCalories || 0) + data.caloriesBurned;
      updatedData.totalDuration =
        (extraData.totalDuration || 0) + data.duration;

      if (!hasExistingExercises) {
        updatedData.firstDay = !extraData.firstDay
          ? modifiedPickedDate
          : extraData.firstDay > modifiedPickedDate
            ? modifiedPickedDate
            : extraData.firstDay;

        updatedData.lastDay = !extraData.lastDay
          ? modifiedPickedDate
          : extraData.lastDay < modifiedPickedDate
            ? modifiedPickedDate
            : extraData.lastDay;

        updatedData.daysPassed = calculateDaysFrom(updatedData.firstDay);

        updatedData.registeredDate =
          !extraData.registeredDate?.includes(modifiedPickedDate) &&
          extraData.registeredDate
            ? [...extraData.registeredDate, modifiedPickedDate]
            : extraData.registeredDate || [modifiedPickedDate];

        updatedData.daysWithWorkouts = updatedData.registeredDate.length;
      }

      setExtraData((prev) => ({ ...prev, ...updatedData }));

      setExercises((prev) => [
        ...prev,
        {
          ...data,
          exerciseName: data.exerciseName.trim(),
          date: modifiedPickedDate,
        },
      ]);

      toast.success("تمرین با موفقیت ثبت شد!", {
        description: " در تمرینات " + checkDay(modifiedPickedDate),
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
