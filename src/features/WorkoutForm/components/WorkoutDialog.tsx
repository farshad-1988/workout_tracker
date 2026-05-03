// components/WorkoutForm/WorkoutDialog.tsx
import React, { useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import checkDay from "@/utils/checkDay";
import AddExerciseType from "@/features/forms/addExerciseType/components/AddExerciseTypeIn";
import type { WorkoutDialogProps } from "../types/types";

export const WorkoutDialog: React.FC<WorkoutDialogProps> = ({
  form,
  exerciseTypes,
  setExerciseTypes,
  isDuplicateExerciseName,
  onSubmit,
  displayDate,
}) => {
  const [showAddType, setShowAddType] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = form;

  return (
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
                ثبت تمرین برای {checkDay(displayDate)}
              </div>
            </DialogTitle>
            <DialogDescription className="text-center mb-6 text-gray-600">
              جزئیات تمرین خود را وارد کنید
            </DialogDescription>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
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
                    <span>این تمرین قبلاً در این تاریخ ثبت شده است.</span>
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

              {showAddType && (
                <AddExerciseType
                  setExerciseTypes={setExerciseTypes}
                  exerciseTypes={exerciseTypes}
                  setShowAddType={setShowAddType}
                  setValue={setValue}
                />
              )}

              {/* Duration and Calories */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    مدت زمان (دقیقه) <span className="text-red-500">*</span>
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
                    {...register("caloriesBurned", { valueAsNumber: true })}
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
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
  );
};
