// components/WorkoutForm/GoalsDialog.tsx
import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, Settings } from "lucide-react";
import type { GoalsDialogProps } from "../types/types";

export const GoalsDialog: React.FC<GoalsDialogProps> = ({
  form,
  extraData,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
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
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Daily Calorie Goal */}
              <div>
                <label
                  htmlFor="dailyCalorieGoal"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  هدف کالری روزانه <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="dailyCalorieGoal"
                  {...register("dailyCalorieGoal", { valueAsNumber: true })}
                  className={`w-full px-4 py-3 border ${
                    errors.dailyCalorieGoal
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200`}
                  placeholder="۵۰۰"
                  min="0"
                  step="1"
                />
                {errors.dailyCalorieGoal && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.dailyCalorieGoal.message}</span>
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
                  {...register("dailyDurationGoal", { valueAsNumber: true })}
                  className={`w-full px-4 py-3 border ${
                    errors.dailyDurationGoal
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200`}
                  placeholder="۶۰"
                  min="0"
                  step="1"
                />
                {errors.dailyDurationGoal && (
                  <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.dailyDurationGoal.message}</span>
                  </div>
                )}
              </div>

              {/* Current Goals Display */}
              {(extraData.dailyCalorieGoal > 0 ||
                extraData.dailyDurationGoal > 0) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm font-medium text-blue-900 mb-2">
                    اهداف فعلی:
                  </div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>کالری: {extraData.dailyCalorieGoal || 0} کالری</div>
                    <div>زمان: {extraData.dailyDurationGoal || 0} دقیقه</div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isSubmitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
                  "ذخیره اهداف"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
