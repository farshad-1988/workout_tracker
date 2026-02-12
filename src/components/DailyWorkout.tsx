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
import { toast } from "sonner";
import { calculateDaysFrom } from "@/utils/calculateDaysFrom";
import { TrendingUp, TrendingDown } from "lucide-react";
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
        }).format("YYYY-MM-DD"),
      );
    } else {
      setModifiedPickedDate(pickedDate);
    }
  }, [pickedDate]);

  //   useEffect(() => {
  //     if (pickedDate) {
  // },[pickedDate])

  // Add this helper function before your component or in a utils file
  const getPercentageDiff = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  // Updated comparisons array with better calculations
  const comparisons = [
    {
      title: "مدت ورزش امروز",
      current: exercises?.reduce((acc, curr) => acc + curr.duration, 0) || 0,
      average:
        extraData.totalDuration && extraData.daysWithWorkouts
          ? Math.round(extraData.totalDuration / extraData.daysWithWorkouts)
          : 0,
      target: extraData.dailyDurationGoal || 60, // 60 minutes daily target
      unit: "دقیقه",
      color: "blue",
      icon: "⏱️",
    },
    {
      title: "کالری سوخته",
      current:
        exercises?.reduce((acc, curr) => acc + curr.caloriesBurned, 0) || 0,
      average:
        extraData.totalCalories && extraData.daysWithWorkouts
          ? Math.round(extraData.totalCalories / extraData.daysWithWorkouts)
          : 0,
      target: extraData.dailyCalorieGoal || 500, // 500 calories daily target
      unit: "کالری",
      color: "orange",
      icon: "🔥",
    },
    // {
    //   title: "تعداد تمرینات",
    //   current: exercises?.length || 0,
    //   average:
    //     extraData.totalDuration && extraData.daysWithWorkouts
    //       ? Math.round(
    //           extraData.totalDuration / extraData.daysWithWorkouts / 30,
    //         ) // Assuming avg 30 min per workout
    //       : 0,
    //   target: 3,
    //   unit: "تمرین",
    //   color: "purple",
    //   icon: "💪",
    // },
    {
      title: "نرخ فعالیت",
      current: extraData.daysWithWorkouts || 0,
      average: extraData.daysPassed || 0,
      unit: "روز فعال",
      color: "green",
      icon: "📅",
      isPercentage: true,
    },
  ];

  // Updated JSX for comparison bars
  // const comparisons = [
  //   {
  //     title: "مدت زمان",
  //     today: exercises?.reduce((acc, curr) => acc + curr.duration, 0) || 0,
  //     avg:
  //       extraData.totalDuration &&
  //       extraData.daysPassed &&
  //       (extraData.totalDuration / extraData.daysPassed).toFixed(0),
  //     unit: "دقیقه",
  //   },
  //   {
  //     title: "کالری",
  //     today:
  //       exercises?.reduce((acc, curr) => acc + curr.caloriesBurned, 0) || 0,
  //     avg:
  //       extraData.totalCalories &&
  //       extraData.daysPassed &&
  //       (extraData.totalCalories / extraData.daysPassed).toFixed(0),
  //     unit: "کالری",
  //   },
  // ] as Comparisons[];

  const getDiff = (today: number, avg: number) => {
    if (!avg) return "0%";
    const diff = ((today / avg - 1) * 100).toFixed(0);
    return today >= avg ? `+${diff}%` : `${diff}%`;
  };

  const handleRemove = (exerName: string) => {
    if (!window.confirm("آیا از حذف این تمرین مطمئن هستید؟")) return;

    const exerciseToRemove = exercises.find(
      (ex) => ex.exerciseName === exerName,
    );
    if (!exerciseToRemove) {
      toast("تمرین یافت نشد.");
      return;
    }

    // Filter exercises after removal (for this date)
    const remainingExercises = exercises.filter(
      (ex) => ex.exerciseName !== exerName,
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
        (d) => d !== ModifiedPickedDate,
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
          (a, b) => getValue(a) - getValue(b),
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
      nextRegisteredDates,
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
        ex.exerciseName === exerName ? { ...ex, ...editedExercise } : ex,
      ),
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
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Comparison Bars */}

          <div className="grid gap-5 mb-10 md:grid-cols-1 lg:grid-cols-3">
            {comparisons.map((item, idx) => {
              const percentDiff = getPercentageDiff(item.current, item.average);
              const isPositive = percentDiff > 0;
              const isNeutral = percentDiff === 0;

              // Calculate target progress
              const targetProgress = item.target
                ? Math.min((item.current / item.target) * 100, 100)
                : null;

              // For percentage-based metrics (like activity rate)
              const displayValue =
                item.isPercentage && item.average > 0
                  ? Math.round((item.current / item.average) * 100)
                  : item.current;

              // Color schemes
              const colorSchemes = {
                blue: {
                  bg: "bg-blue-50",
                  text: "text-blue-600",
                  gradient: "from-blue-400 to-blue-600",
                },
                orange: {
                  bg: "bg-orange-50",
                  text: "text-orange-600",
                  gradient: "from-orange-400 to-orange-600",
                },
                purple: {
                  bg: "bg-purple-50",
                  text: "text-purple-600",
                  gradient: "from-purple-400 to-purple-600",
                },
                green: {
                  bg: "bg-green-50",
                  text: "text-green-600",
                  gradient: "from-green-400 to-green-600",
                },
              };

              const scheme = colorSchemes[item.color];

              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                >
                  {/* Header with Icon and Trend */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`${scheme.bg} p-2 rounded-lg text-2xl`}>
                      {item.icon}
                    </div>
                    {!isNeutral && !item.isPercentage && (
                      <div
                        className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
                          isPositive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{Math.abs(percentDiff)}%</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-medium text-gray-600 mb-2">
                    {item.title}
                  </h3>

                  {/* Current Value */}
                  <div className="flex items-baseline gap-1.5 mb-4">
                    <span className={`text-3xl font-bold ${scheme.text}`}>
                      {displayValue.toLocaleString("fa-IR")}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.isPercentage ? "%" : item.unit}
                    </span>
                  </div>

                  {/* Progress Bar - Comparison with Average */}
                  {!item.isPercentage && item.average > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1.5">
                        <span>مقایسه با میانگین</span>
                        <span className="font-medium">
                          {item.average.toLocaleString("fa-IR")} {item.unit}
                        </span>
                      </div>
                      <div className="relative w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${
                            isPositive
                              ? `bg-gradient-to-r from-green-400 to-green-600`
                              : isNeutral
                                ? "bg-gray-400"
                                : `bg-gradient-to-r from-red-400 to-red-600`
                          }`}
                          style={{
                            width: `${Math.min((item.current / (item.average * 2)) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Target Progress Bar */}
                  {targetProgress !== null && (
                    <div>
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-1.5">
                        <span>هدف روزانه</span>
                        <span className="font-medium">
                          {item.target} {item.unit}
                        </span>
                      </div>
                      <div className="relative w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${
                            targetProgress >= 100
                              ? "from-green-400 to-green-600"
                              : targetProgress >= 50
                                ? "from-yellow-400 to-orange-500"
                                : `${scheme.gradient}`
                          }`}
                          style={{ width: `${targetProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1.5 text-left">
                        {targetProgress >= 100 ? (
                          <span className="text-green-600 font-semibold">
                            ✓ هدف محقق شد!
                          </span>
                        ) : (
                          <span>
                            {Math.round(targetProgress)}% از هدف (
                            {item.target - item.current > 0
                              ? `${item.target - item.current} ${item.unit} مانده`
                              : "کامل"}
                            )
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Activity Rate Special Display */}
                  {item.isPercentage && item.average > 0 && (
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">
                        {item.current} روز
                      </span>{" "}
                      از{" "}
                      <span className="font-semibold text-gray-700">
                        {item.average} روز
                      </span>
                    </div>
                  )}
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
