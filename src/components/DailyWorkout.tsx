import React, { useEffect, useState, type JSX } from "react";
import { Activity, Check, Edit3, Trash2, X } from "lucide-react";
import { useOutletContext, useParams, type Params } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Exercise, ExercisesMutateProps, ExtraData } from "@/types/types";
import checkDay from "@/utils/checkDay";
import WorkoutForm from "./modals/WorkoutForm";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { Comparisons } from "@/types/types";
import { toast } from "sonner";
import { calculateDaysFrom } from "@/utils/calculateDaysFrom";

const DailyWorkout: React.FC = () => {
  // const [exercises, setExercises] = useLocalStorage<Exercise[]>(pickedDate, []);
  const [extraData, setExtraData] = useLocalStorage<ExtraData>("extraData", {});

  const [editedExercise, setEditedExercise] = useState<Partial<Exercise>>({});
  const [editingExercise, setEditingExercise] = useState<string | null>(null);
  const { exercises, setExercises } = useOutletContext<ExercisesMutateProps>();
  const [exerciseTypes] = useLocalStorage<string[]>("exerciseTypes", [
    "کاردیو",
    "بدنسازی",
    "یوگا",
    "پیلاتس",
    "دویدن",
    "شنا",
    "دوچرخه سواری",
    "پیاده روی",
    "ورزش‌های تیمی",
  ]);
  // Today's stats
  const { pickedDate } = useParams<keyof Params>() as { pickedDate: string };
  const [ModifiedPickedDate, setModifiedPickedDate] = useState<string>("");

  useEffect(() => {
    if (!pickedDate) {
      setModifiedPickedDate(
        new DateObject({
          calendar: persian,
          locale: persian_fa,
        }).format("YYYY-MM-DD")
      );
    } else {
      setModifiedPickedDate(pickedDate);
    }
  }, [pickedDate]);

  //   useEffect(() => {
  //     if (pickedDate) {
  // },[pickedDate])

  const comparisons = [
    {
      title: "مدت زمان",
      today: exercises?.reduce((acc, curr) => acc + curr.duration, 0) || 0,
      avg:
        extraData.totalDuration &&
        extraData.daysPassed &&
        (extraData.totalDuration / extraData.daysPassed).toFixed(0),
      unit: "دقیقه",
    },
    {
      title: "کالری",
      today:
        exercises?.reduce((acc, curr) => acc + curr.caloriesBurned, 0) || 0,
      avg:
        extraData.totalCalories &&
        extraData.daysPassed &&
        (extraData.totalCalories / extraData.daysPassed).toFixed(0),
      unit: "کالری",
    },
  ] as Comparisons[];

  const getDiff = (today: number, avg: number) => {
    if (!avg) return "0%";
    const diff = ((today / avg - 1) * 100).toFixed(0);
    return today >= avg ? `+${diff}%` : `${diff}%`;
  };

  const handleRemove = (exerName: string) => {
    if (!window.confirm("آیا از حذف این تمرین مطمئن هستید؟")) return;

    const exerciseToRemove = exercises.find(
      (ex) => ex.exerciseName === exerName
    );
    if (!exerciseToRemove) {
      toast("تمرین یافت نشد.");
      return;
    }

    // Filter exercises after removal (for this date)
    const remainingExercises = exercises.filter(
      (ex) => ex.exerciseName !== exerName
    );
    const isDateEmptyAfterRemoval = remainingExercises.length === 0;
    // Safely compute updated extra data
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
      // Remove the date entirely from registry
      nextRegisteredDates = prevRegisteredDates.filter(
        (d) => d !== ModifiedPickedDate
      );
      nextDaysWithWorkouts = Math.max(0, prevDaysWithWorkouts - 1);

      if (nextRegisteredDates.length === 0) {
        nextFirstDay = undefined;
        nextLastDay = undefined;
        nextDaysPassed = 0;
      } else {
        // Determine min/max using DateObject to support Persian digits like "۱۴۰۴-۰۶-۱۹"
        const getValue = (s: string) =>
          new DateObject({
            date: s,
            format: "YYYY-MM-DD",
            calendar: persian,
            locale: persian_fa,
          }).valueOf();
        const sortedDates = nextRegisteredDates.sort(
          (a, b) => getValue(a) - getValue(b)
        );
        nextFirstDay = sortedDates[0];
        //   nextRegisteredDates.reduce(
        //   (min, d) => (getValue(d) < getValue(min) ? d : min),
        //   nextRegisteredDates[0]
        // );
        nextLastDay = sortedDates[sortedDates.length - 1];
        // nextRegisteredDates.reduce(
        // (max, d) => (getValue(d) > getValue(max) ? d : max),
        // nextRegisteredDates[0]
        // );
        nextDaysPassed = calculateDaysFrom(nextFirstDay);
      }
    }
    console.log(
      nextTotalCalories,
      nextTotalCalories,
      nextDaysWithWorkouts,
      nextFirstDay,
      nextLastDay,
      nextDaysPassed,
      nextRegisteredDates
    );
    setExtraData((prev) => ({
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
        localStorage.removeItem(ModifiedPickedDate);
        return [];
      }
      return remainingExercises;
    });
  };

  const handleEdit = (exerName: string) => {
    setEditingExercise(exerName);
    setEditedExercise(
      exercises.find((ex) => ex.exerciseName === exerName) || {}
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

    // Find original values to compute deltas
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

    // Update extraData totals by diff, keep other metadata unchanged
    setExtraData((prev) => ({
      ...prev,
      totalCalories: Math.max(0, (prev.totalCalories || 0) + caloriesDiff),
      totalDuration: Math.max(0, (prev.totalDuration || 0) + durationDiff),
    }));

    setExercises((prev) =>
      prev.map((ex) =>
        ex.exerciseName === exerName ? { ...ex, ...editedExercise } : ex
      )
    );
    setEditingExercise(null);
    setEditedExercise({});
  };

  return (
    <div className=" bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-12 my-10 sm:my-16 md:my-20 flex flex-col gap-4 w-full max-w-7xl mx-auto h-full">
      <div className="relative  backdrop-blur-sm rounded-3xl p-4 border border-white/50 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            {window.innerWidth > 500 && (
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  داشبورد ورزشی {checkDay(pickedDate ?? ModifiedPickedDate)}
                </h1>
                <p className="text-gray-600 mt-1">
                  پیگیری و مدیریت تمرین‌های روزانه
                </p>
              </div>
            )}
          </div>
          {exercises.length !== 0 ? (
            <WorkoutForm exercises={exercises} setExercises={setExercises} />
          ) : (
            <div className="text-xl  md:hidden text-gray-900 italic">
              داشبورد {checkDay(pickedDate ?? ModifiedPickedDate)}
            </div>
          )}
        </div>
      </div>

      {!exercises.length ? (
        <div className="flex gap-6 text-2xl font-bold items-center justify-center mt-32! text-center text-gray-900">
          هنوز تمرینی برای این تاریخ ثبت نکرده اید
          <WorkoutForm exercises={exercises} setExercises={setExercises} />
        </div>
      ) : (
        <>
          <div className=" mx-auto flex flex-col gap-6 w-full ">
            {/* Exercises List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  لیست تمرین‌های {checkDay(pickedDate ?? ModifiedPickedDate)}
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        نام تمرین
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        نوع
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        مدت زمان
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        کالری سوخته
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                        عملیات
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {exercises?.map(
                      (exercise: Exercise): JSX.Element => (
                        <tr
                          key={exercise.exerciseName}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4">
                            {editingExercise === exercise.exerciseName ? (
                              <input
                                type="text"
                                value={
                                  editedExercise.exerciseName ??
                                  exercise.exerciseName
                                }
                                onChange={(e) =>
                                  setEditedExercise({
                                    ...editedExercise,
                                    exerciseName: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            ) : (
                              exercise.exerciseName
                            )}
                          </td>
                          <td className="px-6 py-4">
                            {editingExercise === exercise.exerciseName ? (
                              <select
                                value={
                                  editedExercise.exerciseType ??
                                  exercise.exerciseType
                                }
                                onChange={(e) =>
                                  setEditedExercise({
                                    ...editedExercise,
                                    exerciseType: e.target.value,
                                  })
                                }
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                {exerciseTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                {exercise.exerciseType}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {editingExercise === exercise.exerciseName ? (
                              <input
                                type="number"
                                value={
                                  editedExercise.duration ?? exercise.duration
                                }
                                onChange={(e) =>
                                  setEditedExercise({
                                    ...editedExercise,
                                    duration: parseInt(e.target.value),
                                  })
                                }
                                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                              />
                            ) : (
                              `${exercise.duration} دقیقه`
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {editingExercise === exercise.exerciseName ? (
                              <input
                                type="number"
                                value={
                                  editedExercise.caloriesBurned ??
                                  exercise.caloriesBurned
                                }
                                onChange={(e) =>
                                  setEditedExercise({
                                    ...editedExercise,
                                    caloriesBurned: parseInt(e.target.value),
                                  })
                                }
                                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="1"
                              />
                            ) : (
                              `${exercise.caloriesBurned} کالری`
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="flex space-x-3 space-x-reverse">
                              {editingExercise === exercise.exerciseName ? (
                                <>
                                  <button
                                    onClick={() =>
                                      handleSave(exercise.exerciseName)
                                    }
                                    className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleCancel()}
                                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() =>
                                      handleEdit(exercise.exerciseName)
                                    }
                                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                                  >
                                    <Edit3 className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleRemove(exercise.exerciseName)
                                    }
                                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Comparison Bars */}
          <div className="grid gap-6 mb-10 md:grid-cols-2">
            {comparisons?.map((item, idx) => {
              console.log(item);
              const maxValue = Math.max(item.today, item.avg);
              const todayWidth = `${(item.today / maxValue) * 100}%`;
              const avgWidth = `${(item.avg / maxValue) * 100}%`;

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    {item.title}
                  </h2>

                  <div className="space-y-3">
                    {/* Today Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>
                          {checkDay(pickedDate ?? ModifiedPickedDate)}
                        </span>
                        <span>
                          {item.today} {item.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-blue-500 h-4 rounded-full"
                          style={{ width: todayWidth }}
                        ></div>
                      </div>
                    </div>
                    {/* Average Bar */}
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>میانگین</span>
                        <span>
                          {item.avg} {item.unit}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div
                          className="bg-gray-500 h-4 rounded-full"
                          style={{ width: avgWidth }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Difference */}
                  <div className="mt-3 text-center">
                    <span
                      className={`font-semibold ${
                        item.today >= item.avg
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {getDiff(item.today, item.avg)}
                    </span>
                    <span className="ml-2 text-gray-600 text-sm">
                      نسبت به میانگین
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default DailyWorkout;
