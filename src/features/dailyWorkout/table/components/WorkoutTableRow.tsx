// import React, { useState } from "react";
// import type { Exercise } from "@/types/types";
// import { Pencil, Trash2, Check, X } from "lucide-react";
// import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";

// interface WorkoutTableRowProps {
//   exercise: Exercise;
//   dateKey: string;
// }

// const WorkoutTableRow: React.FC<WorkoutTableRowProps> = ({
//   exercise,
//   dateKey,
// }) => {
//   const { dispatch } = useExercise();

//   const [isEditing, setIsEditing] = useState(false);
//   const [currentValues, setCurrentValues] = useState(exercise);

//   const handleChange =
//     (field: keyof Exercise) =>
//     (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//       const value =
//         e.target.type === "number" ? Number(e.target.value) : e.target.value;

//       setCurrentValues((prev) => ({
//         ...prev,
//         [field]: value,
//       }));
//     };

//   const onEdit = () => {
//     setCurrentValues(exercise);
//     setIsEditing(true);
//   };

//   const onCancel = () => {
//     setCurrentValues(exercise);
//     setIsEditing(false);
//   };

//   const onSave = () => {
//     dispatch({
//       type: "UPDATE_EXERCISE",
//       dateKey,
//       id: exercise.id,
//       patch: currentValues,
//     });

//     setIsEditing(false);
//   };

//   const onRemove = () => {
//     if (!window.confirm("آیا از پاک کردن این تمرین اطمینان دارید ؟")) return;
//     dispatch({
//       type: "REMOVE_EXERCISE",
//       dateKey,
//       id: exercise.id,
//     });
//   };

//   return (
//     <tr className="hover:bg-gray-50 transition-colors">
//       <td className="px-6 py-4 text-sm text-gray-900">
//         {isEditing ? (
//           <input
//             className="border rounded-md px-2 py-1 text-sm w-full"
//             value={currentValues.exerciseName || ""}
//             onChange={handleChange("exerciseName")}
//           />
//         ) : (
//           exercise.exerciseName
//         )}
//       </td>

//       <td className="px-6 py-4 text-sm text-gray-700">
//         {isEditing ? (
//           <input
//             className="border rounded-md px-2 py-1 text-sm w-full"
//             value={currentValues.exerciseType || ""}
//             onChange={handleChange("exerciseType")}
//           />
//         ) : (
//           exercise.exerciseType
//         )}
//       </td>

//       <td className="px-6 py-4 text-sm text-gray-700">
//         {isEditing ? (
//           <input
//             type="number"
//             className="border rounded-md px-2 py-1 text-sm w-24"
//             value={currentValues.duration ?? ""}
//             onChange={handleChange("duration")}
//           />
//         ) : (
//           `${exercise.duration} دقیقه`
//         )}
//       </td>

//       <td className="px-6 py-4 text-sm text-gray-700">
//         {isEditing ? (
//           <input
//             type="number"
//             className="border rounded-md px-2 py-1 text-sm w-24"
//             value={currentValues.caloriesBurned ?? ""}
//             onChange={handleChange("caloriesBurned")}
//           />
//         ) : (
//           `${exercise.caloriesBurned.toLocaleString("fa-IR")} کیلوکالری`
//         )}
//       </td>

//       <td className="px-6 py-4 text-sm text-gray-700">
//         {isEditing ? (
//           <div className="flex gap-2">
//             <button onClick={onSave}>
//               <Check className="w-4 h-4" />
//             </button>
//             <button onClick={onCancel}>
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         ) : (
//           <div className="flex gap-2">
//             <button onClick={onEdit}>
//               <Pencil className="w-4 h-4" />
//             </button>
//             <button onClick={onRemove}>
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>
//         )}
//       </td>
//     </tr>
//   );
// };

// export default WorkoutTableRow;
import React, { useState } from "react";
import type { Exercise } from "@/types/types";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
import { TableCell, TableRow } from "@/components/ui/table";
import { getWorkoutTable } from "@/constants";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

interface WorkoutTableRowProps {
  exercise: Exercise;
  dateKey: string;
}

const WorkoutTableRow: React.FC<WorkoutTableRowProps> = ({
  exercise,
  dateKey,
}) => {
  const { locale } = useLanguage();
  const fa = getWorkoutTable(locale);
  const { dispatch } = useExercise();

  const [isEditing, setIsEditing] = useState(false);
  const [currentValues, setCurrentValues] = useState(exercise);

  const handleChange =
    (field: keyof Exercise) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target.type === "number" ? Number(e.target.value) : e.target.value;
      setCurrentValues((prev) => ({ ...prev, [field]: value }));
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
    if (!window.confirm(fa.deleteConfirm)) return;
    dispatch({ type: "REMOVE_EXERCISE", dateKey, id: exercise.id });
  };

  const inputClass =
    "w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-primary-foreground placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow";

  const actionBtn =
    "flex items-center justify-center rounded-md p-1.5 transition-colors";

  /* ── Mobile card layout (shown on sm and below) ── */
  const MobileCard = () => (
    <tr className="sm:hidden">
      <td colSpan={5} className="px-0 py-0">
        <div className="mx-3 my-2 rounded-xl border border-border bg-card p-4 shadow-sm">
          {isEditing ? (
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-secondary">
                  {fa.exerciseName}
                </span>
                <input
                  className={inputClass}
                  value={currentValues.exerciseName || ""}
                  onChange={handleChange("exerciseName")}
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-xs font-medium uppercase tracking-wide text-secondary">
                  {fa.exerciseType}
                </span>
                <input
                  className={inputClass}
                  value={currentValues.exerciseType || ""}
                  onChange={handleChange("exerciseType")}
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-secondary">
                    {fa.duration}
                  </span>
                  <input
                    type="number"
                    className={inputClass}
                    value={currentValues.duration ?? ""}
                    onChange={handleChange("duration")}
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-xs font-medium uppercase tracking-wide text-secondary">
                    {fa.calories}
                  </span>
                  <input
                    type="number"
                    className={inputClass}
                    value={currentValues.caloriesBurned ?? ""}
                    onChange={handleChange("caloriesBurned")}
                  />
                </label>
              </div>

              <div className="mt-1 flex gap-2">
                <button
                  onClick={onSave}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-success/15 px-3 py-2 text-sm font-medium text-success transition-colors hover:bg-success/25"
                >
                  <Check className="h-4 w-4" />
                  {fa.save}
                </button>
                <button
                  onClick={onCancel}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-border px-3 py-2 text-sm font-medium text-secondary transition-colors hover:bg-border/70"
                >
                  <X className="h-4 w-4" />
                  {fa.cancel}
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-base font-semibold text-primary-foreground leading-tight">
                    {exercise.exerciseName}
                  </p>
                  <span className="mt-0.5 inline-block rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
                    {exercise.exerciseType}
                  </span>
                </div>

                <div className="flex shrink-0 gap-1">
                  <button
                    onClick={onEdit}
                    aria-label={fa.editAriaLabel}
                    className={`${actionBtn} text-secondary hover:bg-primary/15 hover:text-primary`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={onRemove}
                    aria-label={fa.deleteAriaLabel}
                    className={`${actionBtn} text-secondary hover:bg-danger/15 hover:text-danger`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-lg bg-background/60 px-3 py-2">
                  <p className="text-xs text-secondary">{fa.durationLabel}</p>
                  <p className="mt-0.5 text-sm font-medium text-primary-foreground">
                    {exercise.duration} {fa.durationUnit}
                  </p>
                </div>
                <div className="rounded-lg bg-background/60 px-3 py-2">
                  <p className="text-xs text-secondary">
                    {fa.caloriesBurnedLabel}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-primary-foreground">
                    {exercise.caloriesBurned} {fa.caloriesUnit}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  /* ── Desktop table row (hidden on sm and below) ── */
  const DesktopRow = () => (
    <TableRow className="hidden sm:table-row border-border transition-colors hover:bg-card text-primary">
      <TableCell className="text-center font-medium">
        {isEditing ? (
          <input
            className={inputClass}
            value={currentValues.exerciseName || ""}
            onChange={handleChange("exerciseName")}
          />
        ) : (
          exercise.exerciseName
        )}
      </TableCell>

      <TableCell className="text-center">
        {isEditing ? (
          <input
            className={inputClass}
            value={currentValues.exerciseType || ""}
            onChange={handleChange("exerciseType")}
          />
        ) : (
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {exercise.exerciseType}
          </span>
        )}
      </TableCell>

      <TableCell className="text-center">
        {isEditing ? (
          <input
            type="number"
            className={`${inputClass} mx-auto w-24`}
            value={currentValues.duration ?? ""}
            onChange={handleChange("duration")}
          />
        ) : (
          `${exercise.duration} ${fa.durationUnit}`
        )}
      </TableCell>

      <TableCell className="text-center">
        {isEditing ? (
          <input
            type="number"
            className={`${inputClass} mx-auto w-28`}
            value={currentValues.caloriesBurned ?? ""}
            onChange={handleChange("caloriesBurned")}
          />
        ) : (
          `${exercise.caloriesBurned} ${fa.caloriesUnit}`
        )}
      </TableCell>

      <TableCell>
        <div className="flex items-center justify-center gap-1.5">
          {isEditing ? (
            <>
              <button
                onClick={onSave}
                className={`${actionBtn} text-success hover:bg-success/15`}
              >
                <Check className="h-4 w-4" />
              </button>

              <button
                onClick={onCancel}
                className={`${actionBtn} text-secondary hover:bg-border`}
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onEdit}
                aria-label={fa.editAriaLabel}
                className={`${actionBtn} text-secondary hover:bg-primary/15 hover:text-primary`}
              >
                <Pencil className="h-4 w-4" />
              </button>

              <button
                onClick={onRemove}
                aria-label={fa.deleteAriaLabel}
                className={`${actionBtn} text-secondary hover:bg-danger/15 hover:text-danger`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      <MobileCard />
      <DesktopRow />
    </>
  );
};

export default WorkoutTableRow;
