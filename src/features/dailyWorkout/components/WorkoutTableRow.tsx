// components/DailyWorkout/WorkoutTableRow.tsx
import React from "react";
import type { Exercise } from "@/types/types";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface WorkoutTableRowProps {
  exercise: Exercise;
  exerciseTypes: string[];
  isEditing: boolean;
  editedExercise: Partial<Exercise>;
  onEdit: () => void;
  onRemove: () => void;
  onSave: () => void;
  onCancel: () => void;
  onEditedExerciseChange: (exercise: Partial<Exercise>) => void;
}

const WorkoutTableRow: React.FC<WorkoutTableRowProps> = ({
  exercise,
  exerciseTypes,
  isEditing,
  editedExercise,
  onEdit,
  onRemove,
  onSave,
  onCancel,
  onEditedExerciseChange,
}) => {
  const currentValues = isEditing ? editedExercise : exercise;

  const handleChange =
    (field: keyof Exercise) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        field === "duration" || field === "caloriesBurned"
          ? Number(e.target.value)
          : e.target.value;

      onEditedExerciseChange({
        ...exercise,
        ...editedExercise,
        [field]: value,
      });
    };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {/* نام تمرین */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {isEditing ? (
          <input
            className="border rounded-md px-2 py-1 text-sm w-full"
            value={currentValues.exerciseName || ""}
            onChange={handleChange("exerciseName")}
          />
        ) : (
          exercise.exerciseName
        )}
      </td>

      {/* نوع تمرین */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {isEditing ? (
          <select
            className="border rounded-md px-2 py-1 text-sm w-full bg-white"
            value={currentValues.exerciseType || ""}
            onChange={handleChange("exerciseType")}
          >
            <option value="">انتخاب نوع تمرین</option>
            {exerciseTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        ) : (
          exercise.exerciseType
        )}
      </td>

      {/* مدت زمان */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {isEditing ? (
          <input
            type="number"
            min={0}
            className="border rounded-md px-2 py-1 text-sm w-24"
            value={currentValues.duration ?? ""}
            onChange={handleChange("duration")}
          />
        ) : (
          `${exercise.duration} دقیقه`
        )}
      </td>

      {/* کالری سوخته */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {isEditing ? (
          <input
            type="number"
            min={0}
            className="border rounded-md px-2 py-1 text-sm w-24"
            value={currentValues.caloriesBurned ?? ""}
            onChange={handleChange("caloriesBurned")}
          />
        ) : (
          `${exercise.caloriesBurned.toLocaleString("fa-IR")} کیلوکالری`
        )}
      </td>

      {/* عملیات */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onSave}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-emerald-500 text-white text-xs hover:bg-emerald-600"
            >
              <Check className="w-4 h-4" />
              ذخیره
            </button>
            <button
              onClick={onCancel}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gray-200 text-gray-700 text-xs hover:bg-gray-300"
            >
              <X className="w-4 h-4" />
              انصراف
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={onEdit}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-blue-50 text-blue-600 text-xs hover:bg-blue-100"
            >
              <Pencil className="w-4 h-4" />
              ویرایش
            </button>
            <button
              onClick={onRemove}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-red-50 text-red-600 text-xs hover:bg-red-100"
            >
              <Trash2 className="w-4 h-4" />
              حذف
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default WorkoutTableRow;
