// import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
// import type { AddExerciseTypeProps } from "@/types/types";
// import { useState } from "react";

// const AddExerciseTypeIn = ({ setShowAddType }: AddExerciseTypeProps) => {
//   const [newExerciseType, setNewExerciseType] = useState("");

//   const { state, dispatch } = useExercise();
//   const exerciseTypes = state.exerciseTypes;

//   const handleAddExerciseType = () => {
//     const value = newExerciseType.trim();
//     if (!value) return;

//     if (!exerciseTypes.includes(value)) {
//       dispatch({
//         type: "ADD_EXERCISE_TYPE",
//         payload: value,
//       });
//     }

//     setNewExerciseType("");
//     setShowAddType(false);
//   };

//   const handleCancelAddType = () => {
//     setNewExerciseType("");
//     setShowAddType(false);
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-slate-100 bg-opacity-40 flex items-center justify-center z-50"
//       onClick={handleCancelAddType}
//     >
//       <div
//         className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-lg"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//           افزودن نوع تمرین جدید
//         </h3>

//         <input
//           type="text"
//           value={newExerciseType}
//           onChange={(e) => setNewExerciseType(e.target.value)}
//           placeholder="نام نوع تمرین را وارد کنید"
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
//           onKeyDown={(e) => {
//             if (e.key === "Enter") handleAddExerciseType();
//             if (e.key === "Escape") handleCancelAddType();
//           }}
//           autoFocus
//         />

//         <div
//           className={`text-red-700 ${
//             !exerciseTypes.includes(newExerciseType.trim()) && "hidden"
//           }`}
//         >
//           این تمرین تکراری است.
//         </div>

//         <div className="flex gap-3 justify-end">
//           <button
//             type="button"
//             onClick={handleCancelAddType}
//             className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//           >
//             انصراف
//           </button>

//           <button
//             type="button"
//             onClick={handleAddExerciseType}
//             disabled={
//               !newExerciseType.trim() ||
//               exerciseTypes.includes(newExerciseType.trim())
//             }
//             className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200"
//           >
//             افزودن
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddExerciseTypeIn;
import { getAddExerciseType } from "@/constants";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
import type { AddExerciseTypeProps } from "@/types/types";
import { useState } from "react";

const AddExerciseTypeIn = ({ setShowAddType }: AddExerciseTypeProps) => {
  const [newExerciseType, setNewExerciseType] = useState("");
  const { state, dispatch } = useExercise();
  const exerciseTypes = state.exerciseTypes;
  const { locale } = useLanguage();

  // change this later to real language state
  const t = getAddExerciseType(locale);

  const handleAddExerciseType = () => {
    const value = newExerciseType.trim();
    if (!value) return;

    if (!exerciseTypes.includes(value)) {
      dispatch({
        type: "ADD_EXERCISE_TYPE",
        payload: value,
      });
    }

    setNewExerciseType("");
    setShowAddType(false);
  };

  const handleCancelAddType = () => {
    setNewExerciseType("");
    setShowAddType(false);
  };

  return (
    <div
      className="fixed inset-0 bg-background/80 flex items-center justify-center z-50 "
      onClick={handleCancelAddType}
    >
      <div
        className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-primary mb-4">{t.title}</h3>

        <input
          type="text"
          value={newExerciseType}
          onChange={(e) => setNewExerciseType(e.target.value)}
          placeholder={t.placeholder}
          className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary mb-4 text-primary"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddExerciseType();
            if (e.key === "Escape") handleCancelAddType();
          }}
          autoFocus
        />

        <div
          className={`text-danger ${
            !exerciseTypes.includes(newExerciseType.trim()) && "hidden"
          }`}
        >
          {t.duplicate}
        </div>

        <div className="flex gap-3 justify-end mt-4">
          <button
            type="button"
            onClick={handleCancelAddType}
            className="px-4 py-2 text-secondary hover:text-primary transition-colors"
          >
            {t.cancel}
          </button>

          <button
            type="button"
            onClick={handleAddExerciseType}
            disabled={
              !newExerciseType.trim() ||
              exerciseTypes.includes(newExerciseType.trim())
            }
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            {t.add}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExerciseTypeIn;
