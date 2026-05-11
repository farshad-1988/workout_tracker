import React, { useState } from "react";
import type { Exercise } from "@/types/types";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";

interface WorkoutTableRowProps {
  exercise: Exercise;
  dateKey: string;
}

const WorkoutTableRow: React.FC<WorkoutTableRowProps> = ({
  exercise,
  dateKey,
}) => {
  const { dispatch } = useExercise();

  const [isEditing, setIsEditing] = useState(false);
  const [currentValues, setCurrentValues] = useState(exercise);

  const handleChange =
    (field: keyof Exercise) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target.type === "number" ? Number(e.target.value) : e.target.value;

      setCurrentValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const onEdit = () => {
    setCurrentValues(exercise);
    setIsEditing(true);
  };

  const onCancel = () => {
    setCurrentValues(exercise);
    setIsEditing(false);
  };

  const onSave = () => {
    dispatch({
      type: "UPDATE_EXERCISE",
      dateKey,
      id: exercise.id,
      patch: currentValues,
    });

    setIsEditing(false);
  };

  const onRemove = () => {
    if (!window.confirm("آیا از پاک کردن این تمرین اطمینان دارید ؟")) return;
    dispatch({
      type: "REMOVE_EXERCISE",
      dateKey,
      id: exercise.id,
    });
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 text-sm text-gray-900">
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

      <td className="px-6 py-4 text-sm text-gray-700">
        {isEditing ? (
          <input
            className="border rounded-md px-2 py-1 text-sm w-full"
            value={currentValues.exerciseType || ""}
            onChange={handleChange("exerciseType")}
          />
        ) : (
          exercise.exerciseType
        )}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700">
        {isEditing ? (
          <input
            type="number"
            className="border rounded-md px-2 py-1 text-sm w-24"
            value={currentValues.duration ?? ""}
            onChange={handleChange("duration")}
          />
        ) : (
          `${exercise.duration} دقیقه`
        )}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700">
        {isEditing ? (
          <input
            type="number"
            className="border rounded-md px-2 py-1 text-sm w-24"
            value={currentValues.caloriesBurned ?? ""}
            onChange={handleChange("caloriesBurned")}
          />
        ) : (
          `${exercise.caloriesBurned.toLocaleString("fa-IR")} کیلوکالری`
        )}
      </td>

      <td className="px-6 py-4 text-sm text-gray-700">
        {isEditing ? (
          <div className="flex gap-2">
            <button onClick={onSave}>
              <Check className="w-4 h-4" />
            </button>
            <button onClick={onCancel}>
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={onEdit}>
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={onRemove}>
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default WorkoutTableRow;
