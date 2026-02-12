import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { calculateDaysFrom } from "@/utils/calculateDaysFrom";
import { useParams, type Params } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";
import type {
  ExercisesMutateProps,
  ExtraData,
  UpdatedData,
} from "@/types/types";
import { CirclePlus, AlertCircle, Target, Settings } from "lucide-react";
import checkDay from "@/utils/checkDay";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AddExerciseType from "../AddExerciseType";

// Define Zod schema for workout form
const schema = z.object({
  exerciseName: z
    .string()
    .min(1, "نام تمرین الزامی است")
    .max(100, "نام تمرین نباید بیشتر از ۱۰۰ کاراکتر باشد"),
  exerciseType: z.string().min(1, "نوع تمرین الزامی است"),
  duration: z
    .number({ error: "مدت زمان باید عدد باشد" })
    .positive("مدت زمان باید بیشتر از صفر باشد")
    .max(1440, "مدت زمان نباید بیشتر از ۱۴۴۰ دقیقه (۲۴ ساعت) باشد"),
  caloriesBurned: z
    .number({ error: "کالری سوخته باید عدد باشد" })
    .nonnegative("کالری سوخته نمی‌تواند منفی باشد")
    .max(10000, "کالری سوخته نباید بیشتر از ۱۰۰۰۰ باشد"),
});

// Define Zod schema for goals
const goalsSchema = z.object({
  dailyCalorieGoal: z
    .number({ error: "هدف کالری باید عدد باشد" })
    .positive("هدف کالری باید بیشتر از صفر باشد")
    .max(10000, "هدف کالری نباید بیشتر از ۱۰۰۰۰ باشد"),
  dailyDurationGoal: z
    .number({ error: "هدف زمان باید عدد باشد" })
    .positive("هدف زمان باید بیشتر از صفر باشد")
    .max(1440, "هدف زمان نباید بیشتر از ۱۴۴۰ دقیقه (۲۴ ساعت) باشد"),
});

type FormData = z.infer<typeof schema>;
type GoalsFormData = z.infer<typeof goalsSchema>;

const WorkoutForm: React.FC<ExercisesMutateProps> = ({
  exercises,
  setExercises,
}) => {
  const { pickedDate }: Readonly<Params<string>> = useParams();
  const [modifiedPickedDate, setModifiedPickedDate] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [goalsDialogOpen, setGoalsDialogOpen] = useState(false);
  const [showAddType, setShowAddType] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      exerciseName: "",
      exerciseType: "",
      duration: 0,
      caloriesBurned: 0,
    },
  });

  const {
    handleSubmit: handleGoalsSubmit,
    register: registerGoals,
    formState: { errors: goalsErrors, isSubmitting: isGoalsSubmitting },
    reset: resetGoals,
  } = useForm<GoalsFormData>({
    resolver: zodResolver(goalsSchema),
    mode: "onChange",
  });

  const watchedExerciseName = watch("exerciseName");

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

  const [exerciseTypes, setExerciseTypes] = useLocalStorage("exerciseTypes", [
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

  const [extraData, setExtraData] = useLocalStorage<ExtraData>("extraData", {
    registeredDate: [],
    dailyCalorieGoal: 0,
    dailyDurationGoal: 0,
  });

  // Set default values for goals form when dialog opens
  useEffect(() => {
    if (goalsDialogOpen) {
      resetGoals({
        dailyCalorieGoal: extraData.dailyCalorieGoal || 0,
        dailyDurationGoal: extraData.dailyDurationGoal || 0,
      });
    }
  }, [
    goalsDialogOpen,
    extraData.dailyCalorieGoal,
    extraData.dailyDurationGoal,
    resetGoals,
  ]);

  // Check for duplicate exercise name
  const isDuplicateExerciseName = exercises.some(
    (ex) =>
      ex.exerciseName.trim().toLowerCase() ===
        watchedExerciseName?.trim().toLowerCase() &&
      ex.date === modifiedPickedDate,
  );

  const submitForm = async (data: FormData) => {
    // Final check for duplicate name
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

      if (hasExistingExercises) {
        updatedData.totalCalories =
          (extraData.totalCalories || 0) + data.caloriesBurned;
        updatedData.totalDuration =
          (extraData.totalDuration || 0) + data.duration;
      } else {
        updatedData.totalCalories =
          (extraData.totalCalories || 0) + data.caloriesBurned;
        updatedData.totalDuration =
          (extraData.totalDuration || 0) + data.duration;

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
            : extraData.registeredDate
              ? extraData.registeredDate
              : [modifiedPickedDate];
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
        description:
          " در تمرینات " + checkDay(pickedDate ?? modifiedPickedDate),
      });

      // Reset form and close dialog
      reset();
      setDialogOpen(false);
    } catch (error) {
      toast.error("خطا در ثبت تمرین", {
        description: "لطفاً دوباره تلاش کنید",
      });
      console.error("Error submitting workout:", error);
    }
  };

  const submitGoals = async (data: GoalsFormData) => {
    try {
      setExtraData((prev) => ({
        ...prev,
        dailyCalorieGoal: data.dailyCalorieGoal,
        dailyDurationGoal: data.dailyDurationGoal,
      }));

      toast.success("اهداف روزانه با موفقیت ثبت شد!", {
        description: `هدف کالری: ${data.dailyCalorieGoal} | هدف زمان: ${data.dailyDurationGoal} دقیقه`,
      });

      setGoalsDialogOpen(false);
    } catch (error) {
      toast.error("خطا در ثبت اهداف", {
        description: "لطفاً دوباره تلاش کنید",
      });
      console.error("Error submitting goals:", error);
    }
  };

  return (
    <>
      <div className=" ">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => setDialogOpen(true)}
                className="cursor-pointer flex-1 group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <CirclePlus className="w-6 h-6" />
                  <div className="text-right">
                    <div className="font-bold text-lg">ثبت تمرین</div>
                    {/* <div className="text-xs opacity-90">افزودن تمرین جدید</div> */}
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <div className="bg-gradient-to-br py-8 px-2 flex justify-center items-center">
                <div className="w-full max-w-md mx-auto">
                  <div className="bg-white rounded-2xl pb-8 md:p-8 max-h-[80vh] overflow-y-auto">
                    <DialogTitle className="text-center mb-2">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        ثبت تمرین برای{" "}
                        {checkDay(pickedDate ?? modifiedPickedDate)}
                      </div>
                    </DialogTitle>
                    <DialogDescription className="text-center mb-6 text-gray-600">
                      جزئیات تمرین خود را وارد کنید
                    </DialogDescription>

                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleSubmit(submitForm)}
                    >
                      {/* Exercise Name */}
                      <div>
                        <label
                          htmlFor="exerciseName"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          نام تمرین <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="exerciseName"
                          {...register("exerciseName")}
                          className={`w-full px-4 py-3 border ${
                            errors.exerciseName || isDuplicateExerciseName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          } rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200`}
                          placeholder="مثال: دویدن در پارک"
                        />
                        {errors.exerciseName && (
                          <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.exerciseName.message}</span>
                          </div>
                        )}
                        {isDuplicateExerciseName && !errors.exerciseName && (
                          <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>
                              این تمرین قبلاً در این تاریخ ثبت شده است.
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Exercise Type */}
                      <div>
                        <label
                          htmlFor="exerciseType"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          نوع تمرین <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            id="exerciseType"
                            {...register("exerciseType")}
                            className={`flex-1 px-4 py-3 border ${
                              errors.exerciseType
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                            } rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200`}
                          >
                            <option value="">نوع تمرین را انتخاب کنید</option>
                            {exerciseTypes.map((type: string) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => setShowAddType(true)}
                            className="px-3 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 flex items-center justify-center group"
                            title="افزودن نوع تمرین جدید"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>
                        </div>
                        {errors.exerciseType && (
                          <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.exerciseType.message}</span>
                          </div>
                        )}
                      </div>

                      {/* Add Exercise Type Dialog */}
                      {showAddType && (
                        <AddExerciseType
                          setExerciseTypes={setExerciseTypes}
                          exerciseTypes={exerciseTypes}
                          setShowAddType={setShowAddType}
                          setValue={setValue}
                        />
                      )}

                      {/* Duration and Calories Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Duration */}
                        <div>
                          <label
                            htmlFor="duration"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            مدت زمان (دقیقه){" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            id="duration"
                            {...register("duration", { valueAsNumber: true })}
                            className={`w-full px-4 py-3 border ${
                              errors.duration
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                            } rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200`}
                            placeholder="۳۰"
                            min="0"
                            step="1"
                          />
                          {errors.duration && (
                            <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors.duration.message}</span>
                            </div>
                          )}
                        </div>

                        {/* Calories Burned */}
                        <div>
                          <label
                            htmlFor="caloriesBurned"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            کالری سوخته
                          </label>
                          <input
                            type="number"
                            id="caloriesBurned"
                            {...register("caloriesBurned", {
                              valueAsNumber: true,
                            })}
                            className={`w-full px-4 py-3 border ${
                              errors.caloriesBurned
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                            } rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200`}
                            placeholder="۲۰۰"
                            min="0"
                            step="1"
                          />
                          {errors.caloriesBurned && (
                            <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span>{errors.caloriesBurned.message}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting || isDuplicateExerciseName}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                          isSubmitting || isDuplicateExerciseName
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            در حال ثبت...
                          </div>
                        ) : (
                          "ثبت تمرین"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Set Goals Button */}
          <Dialog open={goalsDialogOpen} onOpenChange={setGoalsDialogOpen}>
            <DialogTrigger asChild>
              <button
                onClick={() => setGoalsDialogOpen(true)}
                className="cursor-pointer group relative overflow-hidden bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white rounded-xl px-6 py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Target className="w-6 h-6" />
                  <div className="text-right">
                    <div className="font-bold text-lg">تنظیم اهداف</div>
                    {/* <div className="text-xs opacity-90">اهداف روزانه شما</div> */}
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <div className="bg-gradient-to-br py-8 px-2 flex justify-center items-center">
                <div className="w-full max-w-md mx-auto">
                  <div className="bg-white rounded-2xl pb-8 md:p-8">
                    <DialogTitle className="text-center mb-2">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <Settings className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        تنظیم اهداف روزانه
                      </div>
                    </DialogTitle>
                    <DialogDescription className="text-center mb-6 text-gray-600">
                      اهداف کالری و زمان ورزش روزانه خود را تعیین کنید
                    </DialogDescription>

                    <form
                      className="flex flex-col gap-4"
                      onSubmit={handleGoalsSubmit(submitGoals)}
                    >
                      {/* Daily Calorie Goal */}
                      <div>
                        <label
                          htmlFor="dailyCalorieGoal"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          هدف کالری روزانه{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          id="dailyCalorieGoal"
                          {...registerGoals("dailyCalorieGoal", {
                            valueAsNumber: true,
                          })}
                          className={`w-full px-4 py-3 border ${
                            goalsErrors.dailyCalorieGoal
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          } rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200`}
                          placeholder="۵۰۰"
                          min="0"
                          step="1"
                        />
                        {goalsErrors.dailyCalorieGoal && (
                          <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>{goalsErrors.dailyCalorieGoal.message}</span>
                          </div>
                        )}
                      </div>

                      {/* Daily Duration Goal */}
                      <div>
                        <label
                          htmlFor="dailyDurationGoal"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          هدف زمان ورزش روزانه (دقیقه){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          id="dailyDurationGoal"
                          {...registerGoals("dailyDurationGoal", {
                            valueAsNumber: true,
                          })}
                          className={`w-full px-4 py-3 border ${
                            goalsErrors.dailyDurationGoal
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          } rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200`}
                          placeholder="۶۰"
                          min="0"
                          step="1"
                        />
                        {goalsErrors.dailyDurationGoal && (
                          <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            <span>{goalsErrors.dailyDurationGoal.message}</span>
                          </div>
                        )}
                      </div>

                      {/* Current Goals Display */}
                      {(extraData.dailyCalorieGoal ||
                        extraData.dailyDurationGoal) && (
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
                          <p className="text-sm font-medium text-orange-900 mb-2">
                            اهداف فعلی:
                          </p>
                          <div className="space-y-1 text-sm text-orange-700">
                            {extraData.dailyCalorieGoal && (
                              <p>
                                • کالری روزانه: {extraData.dailyCalorieGoal}{" "}
                                کالری
                              </p>
                            )}
                            {extraData.dailyDurationGoal && (
                              <p>
                                • زمان ورزش روزانه:{" "}
                                {extraData.dailyDurationGoal} دقیقه
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isGoalsSubmitting}
                        className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                          isGoalsSubmitting
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        }`}
                      >
                        {isGoalsSubmitting ? (
                          <div className="flex items-center justify-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            در حال ذخیره...
                          </div>
                        ) : (
                          "ذخیره اهداف"
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default WorkoutForm;
