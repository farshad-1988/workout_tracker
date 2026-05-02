// components/DailyWorkout/WorkoutTable.tsx
import React from "react";
import type { Exercise } from "@/types/types";
import checkDay from "@/utils/checkDay";
import WorkoutTableRow from "./WorkoutTableRow";

interface WorkoutTableProps {
  exercises: Exercise[];
  pickedDate: string;
  modifiedPickedDate: string;
  exerciseTypes: string[];
  editingExercise: string | null;
  editedExercise: Partial<Exercise>;
  onEdit: (name: string) => void;
  onRemove: (name: string) => void;
  onSave: (name: string) => void;
  onCancel: () => void;
  onEditedExerciseChange: (exercise: Partial<Exercise>) => void;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({
  exercises,
  pickedDate,
  modifiedPickedDate,
  exerciseTypes,
  editingExercise,
  editedExercise,
  onEdit,
  onRemove,
  onSave,
  onCancel,
  onEditedExerciseChange,
}) => {
  return (
    <div className="mx-auto flex flex-col gap-6 w-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            لیست تمرین‌های {checkDay(pickedDate ?? modifiedPickedDate)}
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
            <tbody className="bg-white divide-y divide-gray-100">
              {exercises.map((exercise) => (
                <WorkoutTableRow
                  key={exercise.exerciseName}
                  exercise={exercise}
                  exerciseTypes={exerciseTypes}
                  isEditing={editingExercise === exercise.exerciseName}
                  editedExercise={editedExercise}
                  onEdit={() => onEdit(exercise.exerciseName)}
                  onRemove={() => onRemove(exercise.exerciseName)}
                  onSave={() => onSave(exercise.exerciseName)}
                  onCancel={onCancel}
                  onEditedExerciseChange={onEditedExerciseChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WorkoutTable;
