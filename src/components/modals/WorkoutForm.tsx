import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { calculateDaysFrom } from "@/utils/calculateDaysFrom";
import { useParams, type Params } from "react-router-dom";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Exercise, ExercisesMutateProps, ExtraData } from "@/types/types";
import { CirclePlus } from "lucide-react";
import checkDay from "@/utils/checkDay";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toast } from "sonner";

const WorkoutForm: React.FC<ExercisesMutateProps> = ({
  exercises,
  setExercises,
}) => {
  const { pickedDate }: Readonly<Params<string>> = useParams();
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
  });
  const [formData, setFormData] = useState<Exercise>({
    exerciseName: "",
    exerciseType: "",
    duration: 0,
    caloriesBurned: 0,
    date: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [extraData, setExtraData] = useState(
  //   JSON.parse(localStorage.getItem("extraData") || "{}")
  // );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errorExName, setErrorExName] = useState<boolean>(false);
  // const [exerciseTypes, setExerciseTypes] = useState(
  //   JSON.parse(localStorage.getItem("exerciseTypes") || "[]")
  // );
  const [showAddType, setShowAddType] = useState(false);
  const [newExerciseType, setNewExerciseType] = useState("");

  // useEffect(() => {
  //   if (!localStorage.getItem("exerciseTypes")) {
  //     localStorage.setItem(
  //       "exerciseTypes",
  //       JSON.stringify()
  //     );
  //   }
  //   // if (localStorage.getItem(pickedDate)) {
  //   //   setPrevExercisesInDate(
  //   //     JSON.parse(localStorage.getItem(pickedDate) || "{}")
  //   //   );
  //   // }
  // }, [pickedDate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;

    if (
      name === "exerciseName" &&
      exercises.some((ex) => ex.exerciseName === value.trim())
    ) {
      setErrorExName(true);
    } else if (name === "exerciseName" && errorExName) {
      setErrorExName(false);
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "duration" || name === "caloriesBurned"
          ? Number(value)
          : value.trim(),
    }));
  };

  // const handleDateChange = useCallback((date: string) => {
  //   setFormData((prev) => ({ ...prev, date }));
  // }, []);

  // تابع برای اضافه کردن نوع تمرین جدید
  const handleAddExerciseType = () => {
    if (
      newExerciseType.trim() &&
      !exerciseTypes.includes(newExerciseType.trim())
    ) {
      const updatedTypes = [...exerciseTypes, newExerciseType.trim()];
      setExerciseTypes(updatedTypes);
      setFormData((prev) => ({
        ...prev,
        exerciseType: newExerciseType.trim(),
      }));
      setNewExerciseType("");
      setShowAddType(false);
    }
  };

  // تابع برای کنسل کردن اضافه کردن نوع تمرین
  const handleCancelAddType = () => {
    setNewExerciseType("");
    setShowAddType(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (errorExName) {
      toast("تمرین ثبت نشد", {
        description:
          "لطفاً نام تمرین را تغییر دهید، این نام قبلاً در این تاریخ ثبت شده است.",
        action: {
          label: "X",
          onClick: () => console.log("Undo"),
        },
      });

      setIsSubmitting(false);
      return;
    }

    const updatedData: ExtraData = {};
    if (
      localStorage.getItem(ModifiedPickedDate) &&
      Array.isArray(localStorage.getItem(ModifiedPickedDate)) &&
      localStorage.getItem(ModifiedPickedDate)?.length !== 0
    ) {
      updatedData.totalCalories =
        (extraData.totalCalories || 0) + formData.caloriesBurned;
      updatedData.totalDuration =
        (extraData.totalDuration || 0) + formData.duration;
    } else {
      updatedData.totalCalories =
        (extraData.totalCalories || 0) + formData.caloriesBurned;
      updatedData.totalDuration =
        (extraData.totalDuration || 0) + formData.duration;

      updatedData.firstDay = !extraData.firstDay
        ? ModifiedPickedDate
        : extraData.firstDay > ModifiedPickedDate
        ? ModifiedPickedDate
        : extraData.firstDay;
      updatedData.lastDay = !extraData.lastDay
        ? ModifiedPickedDate
        : extraData.lastDay < ModifiedPickedDate
        ? ModifiedPickedDate
        : extraData.lastDay;
      updatedData.daysPassed = calculateDaysFrom(updatedData.firstDay);
      updatedData.registeredDate =
        !extraData.registeredDate?.includes(ModifiedPickedDate) &&
        extraData.registeredDate
          ? [...extraData.registeredDate, ModifiedPickedDate]
          : extraData.registeredDate
          ? extraData.registeredDate
          : [ModifiedPickedDate];
      updatedData.daysWithWorkouts = updatedData.registeredDate.length;
    }
    console.log(updatedData.registeredDate);
    setExtraData((prev) => ({ ...prev, ...updatedData }));

    setExercises((prev) => [
      ...prev,
      { ...formData, date: ModifiedPickedDate },
    ]);

    toast("تمرین با موفقیت ثبت شد!", {
      description: " در تمرینات " + checkDay(pickedDate ?? ModifiedPickedDate),
      action: {
        label: "X",
        onClick: () => console.log("Undo"),
      },
    });

    // ریست کردن فرم
    setFormData({
      exerciseName: "",
      exerciseType: "",
      duration: 0,
      caloriesBurned: 0,
      date: "",
    });
    setDialogOpen(false);
    setIsSubmitting(false);
  };

  const isFormValid =
    formData.exerciseName &&
    formData.exerciseType &&
    formData.duration > 0 &&
    (ModifiedPickedDate || pickedDate) &&
    formData.caloriesBurned > 0;

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setDialogOpen(true);
          }}
          variant="outline"
          className="cursor-pointer"
        >
          ثبت تمرین{" "}
          <CirclePlus className="w-5 h-5 mr-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="bg-gradient-to-br py-12 px-4 flex justify-center items-center">
          <div className="max-w-md mx-auto flex justify-center items-center">
            <div className="bg-white rounded-2xl pb-8 md:p-8 max-h-[80vh] overflow-y-auto">
              <div className="text-center mb-8">
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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  ثبت تمرین برای {checkDay(pickedDate ?? ModifiedPickedDate)}
                </h1>
                <p className="text-gray-600">جزئیات تمرین خود را وارد کنید</p>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label
                    htmlFor="exerciseName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    نام تمرین
                  </label>
                  <input
                    type="text"
                    id="exerciseName"
                    name="exerciseName"
                    value={formData.exerciseName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="مثال: دویدن در پارک"
                    required
                  />
                  {errorExName && (
                    <p className="text-sm text-red-600 mt-1">
                      این تمرین قبلاً در این تاریخ ثبت شده است.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="exerciseType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    نوع تمرین
                  </label>
                  <div className="flex gap-2">
                    <select
                      id="exerciseType"
                      name="exerciseType"
                      value={formData.exerciseType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      required
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
                </div>

                {/* Modal برای اضافه کردن نوع تمرین جدید */}
                {showAddType && (
                  <div
                    className="fixed inset-0 bg-slate-100 bg-opacity-40 flex items-center justify-center z-50"
                    onClick={handleCancelAddType} // Close when clicking backdrop
                  >
                    <div
                      className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-lg"
                      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        افزودن نوع تمرین جدید
                      </h3>
                      <input
                        type="text"
                        value={newExerciseType}
                        onChange={(e) => setNewExerciseType(e.target.value)}
                        placeholder="نام نوع تمرین را وارد کنید"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddExerciseType();
                          } else if (e.key === "Escape") {
                            handleCancelAddType();
                          }
                        }}
                        autoFocus
                      />
                      <div className="flex gap-3 justify-end">
                        <button
                          type="button"
                          onClick={handleCancelAddType}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                          انصراف
                        </button>
                        <button
                          type="button"
                          onClick={handleAddExerciseType}
                          disabled={
                            !newExerciseType.trim() ||
                            exerciseTypes.includes(newExerciseType.trim())
                          }
                          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200"
                        >
                          افزودن
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      مدت زمان (دقیقه)
                    </label>
                    <input
                      type="number"
                      id="duration"
                      name="duration"
                      value={formData.duration || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="30"
                      min="1"
                      required
                    />
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
                      name="caloriesBurned"
                      value={formData.caloriesBurned || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="250"
                      min="0"
                    />
                  </div>
                </div>

                {/* <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    تاریخ
                  </label>
                  <WorkoutCalender
                    handleDateChange={handleDateChange}
                    className={
                      "w-full  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    }
                  />
                </div> */}

                <button
                  type="button"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                    isFormValid && !isSubmitting
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={handleSubmit}
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
              </div>

              {/* نمایش اطلاعات فرم در هنگام پرکردن */}
              {/* {formData.exerciseName && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                پیش‌نمایش:
              </h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>
                  <span className="font-medium">تمرین:</span>{" "}
                  {formData.exerciseName}
                </p>
                {formData.exerciseType && (
                  <p>
                    <span className="font-medium">نوع:</span>{" "}
                    {formData.exerciseType}
                  </p>
                )}
                {formData.duration > 0 && (
                  <p>
                    <span className="font-medium">مدت:</span>{" "}
                    {formData.duration} دقیقه
                  </p>
                )}
                {formData.caloriesBurned > 0 && (
                  <p>
                    <span className="font-medium">کالری:</span>{" "}
                    {formData.caloriesBurned}
                  </p>
                )}
                {ModifiedPickedDate && (
                  <p>
                    <span className="font-medium">تاریخ:</span> {ModifiedPickedDate}
                  </p>
                )}
              </div>
            </div>
          )} */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkoutForm;
