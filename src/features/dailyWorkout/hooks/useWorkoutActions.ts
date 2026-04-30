// components/DailyWorkout/useWorkoutActions.ts
import type { Exercise, ExtraData } from "@/types/types";
import { toast } from "sonner";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { calculateDaysFrom } from "@/utils/calculateDaysFrom";

interface UseWorkoutActionsProps {
  exercises: Exercise[];
  setExercises: any;
  extraData: ExtraData;
  setExtraData: any;
  modifiedPickedDate: string;
  editedExercise: Partial<Exercise>;
  setEditedExercise: any;
  editingExercise: string | null;
  setEditingExercise: any;
}

export const useWorkoutActions = ({
  exercises,
  setExercises,
  extraData,
  setExtraData,
  modifiedPickedDate,
  editedExercise,
  setEditedExercise,
  editingExercise,
  setEditingExercise,
}: UseWorkoutActionsProps) => {
  const handleRemove = (exerName: string) => {
    if (!window.confirm("آیا از حذف این تمرین مطمئن هستید؟")) return;

    const exerciseToRemove = exercises.find(
      (ex) => ex.exerciseName === exerName,
    );
    if (!exerciseToRemove) {
      toast("تمرین یافت نشد.");
      return;
    }

    const remainingExercises = exercises.filter(
      (ex) => ex.exerciseName !== exerName,
    );
    const isDateEmptyAfterRemoval = remainingExercises.length === 0;

    const prevTotalCalories = extraData.totalCalories || 0;
    const prevTotalDuration = extraData.totalDuration || 0;
    const prevDaysWithWorkouts = extraData.daysWithWorkouts || 0;
    const prevRegisteredDates = extraData.registeredDate || [];

    const nextTotalCalories =
      prevTotalCalories - exerciseToRemove.caloriesBurned;
    const nextTotalDuration = prevTotalDuration - exerciseToRemove.duration;

    let nextRegisteredDates = prevRegisteredDates;
    let nextDaysWithWorkouts = prevDaysWithWorkouts;
    let nextFirstDay: string | undefined = extraData.firstDay;
    let nextLastDay: string | undefined = extraData.lastDay;
    let nextDaysPassed: number | undefined = extraData.daysPassed;

    if (isDateEmptyAfterRemoval) {
      nextRegisteredDates = prevRegisteredDates.filter(
        (d) => d !== modifiedPickedDate,
      );
      nextDaysWithWorkouts = Math.max(0, prevDaysWithWorkouts - 1);

      if (nextRegisteredDates.length === 0) {
        nextFirstDay = undefined;
        nextLastDay = undefined;
        nextDaysPassed = 0;
      } else {
        const getValue = (s: string) =>
          new DateObject({
            date: s,
            format: "YYYY-MM-DD",
            calendar: persian,
            locale: persian_fa,
          }).valueOf();
        const sortedDates = nextRegisteredDates.sort(
          (a, b) => getValue(a) - getValue(b),
        );
        nextFirstDay = sortedDates[0];
        nextLastDay = sortedDates[sortedDates.length - 1];
        nextDaysPassed = calculateDaysFrom(nextFirstDay);
      }
    }

    setExtraData((prev: ExtraData) => ({
      ...prev,
      totalCalories: nextTotalCalories,
      totalDuration: nextTotalDuration,
      daysWithWorkouts: nextDaysWithWorkouts,
      firstDay: nextFirstDay,
      lastDay: nextLastDay,
      daysPassed: nextDaysPassed,
      registeredDate: nextRegisteredDates,
    }));

    setExercises(() => {
      if (isDateEmptyAfterRemoval) {
        localStorage.removeItem(modifiedPickedDate);
        return [];
      }
      return remainingExercises;
    });
  };

  const handleEdit = (exerName: string) => {
    setEditingExercise(exerName);
    setEditedExercise(
      exercises.find((ex) => ex.exerciseName === exerName) || {},
    );
  };

  const handleCancel = () => {
    setEditingExercise(null);
    setEditedExercise({});
  };

  const handleSave = (exerName: string) => {
    if (
      JSON.stringify(editedExercise) ===
      JSON.stringify(exercises.find((ex) => ex.exerciseName === exerName))
    ) {
      toast("هیچ تغییری برای ذخیره وجود ندارد.");
      setEditedExercise({});
      setEditingExercise(null);
      return;
    }
    if (!editedExercise.exerciseName || !editedExercise.exerciseType) {
      toast("لطفاً نام و نوع تمرین را وارد کنید.");
      return;
    }
    if (
      editedExercise.duration !== undefined &&
      (isNaN(editedExercise.duration) || editedExercise.duration <= 0)
    ) {
      toast("لطفاً مدت زمان معتبر وارد کنید.");
      return;
    }
    if (
      editedExercise.caloriesBurned !== undefined &&
      (isNaN(editedExercise.caloriesBurned) ||
        editedExercise.caloriesBurned <= 0)
    ) {
      toast("لطفاً کالری سوخته معتبر وارد کنید.");
      return;
    }
    if (!window.confirm("آیا از ذخیره تغییرات مطمئن هستید؟")) return;

    const original = exercises.find((ex) => ex.exerciseName === exerName);
    if (!original) {
      toast("تمرین برای ویرایش یافت نشد.");
      return;
    }

    const newCalories =
      editedExercise.caloriesBurned !== undefined
        ? editedExercise.caloriesBurned
        : original.caloriesBurned;
    const newDuration =
      editedExercise.duration !== undefined
        ? editedExercise.duration
        : original.duration;

    const caloriesDiff = newCalories - original.caloriesBurned;
    const durationDiff = newDuration - original.duration;

    setExtraData((prev: ExtraData) => ({
      ...prev,
      totalCalories: Math.max(0, (prev.totalCalories || 0) + caloriesDiff),
      totalDuration: Math.max(0, (prev.totalDuration || 0) + durationDiff),
    }));

    setExercises((prev: Exercise[]) =>
      prev.map((ex) =>
        ex.exerciseName === exerName ? { ...ex, ...editedExercise } : ex,
      ),
    );
    setEditingExercise(null);
    setEditedExercise({});
  };

  return {
    handleRemove,
    handleEdit,
    handleCancel,
    handleSave,
  };
};
