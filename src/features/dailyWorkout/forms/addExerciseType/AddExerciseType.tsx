import React, { useState } from "react";
import AddExerciseTypeIn from "./components/AddExerciseTypeIn";

const AddExerciseType = () => {
  const [showAddType, setShowAddType] = useState(false);

  if (showAddType) {
    return <AddExerciseTypeIn setShowAddType={setShowAddType} />;
  }

  return (
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
  );
};

export default AddExerciseType;
