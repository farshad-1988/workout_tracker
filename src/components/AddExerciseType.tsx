import React, { useState } from "react";

const AddExerciseType = ({
  setShowAddType,
  exerciseTypes,
  setExerciseTypes,
  setValue,
}) => {
  const [newExerciseType, setNewExerciseType] = useState("");

  const handleAddExerciseType = () => {
    if (
      newExerciseType.trim() &&
      !exerciseTypes.includes(newExerciseType.trim())
    ) {
      const updatedTypes = [...exerciseTypes, newExerciseType.trim()];
      setExerciseTypes(updatedTypes);
      setValue("exerciseType", newExerciseType.trim());
      setNewExerciseType("");
      setShowAddType(false);
    }
  };
  const handleCancelAddType = () => {
    setNewExerciseType("");
    setShowAddType(false);
  };
  return (
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
        <div
          className={`text-red-700 ${
            !exerciseTypes.includes(newExerciseType.trim()) && "hidden"
          }`}
        >
          این تمرین تکراری است.
        </div>
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
  );
};

export default AddExerciseType;
