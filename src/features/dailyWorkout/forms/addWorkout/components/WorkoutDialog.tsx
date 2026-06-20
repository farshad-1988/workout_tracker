// import {
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { AlertCircle } from "lucide-react";
// import { Controller } from "react-hook-form";
// import { getBioText, getWorkoutFormCopy } from "@/constants";
// import { getDayLabel } from "@/utils/getDayLabel";
// import type { WorkoutDialogProps } from "../types/types";
// import AddExerciseType from "../../addExerciseType/AddExerciseType";
// import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

// const EMPTY_VALUE = "__none__";

// export const WorkoutDialog: React.FC<WorkoutDialogProps> = ({
//   form,
//   isDuplicateExerciseName,
//   onSubmit,
//   displayDate,
// }) => {
//   const { locale } = useLanguage();
//   const bio = getBioText(locale);
//   const copy = getWorkoutFormCopy(locale);
//   const { state } = useExercise();
//   const exerciseTypes = [...state.exerciseTypes];
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = form;

//   const dayLabel = getDayLabel(displayDate, locale, bio);

//   return (
//     <DialogContent className="sm:max-w-[500px]">
//       <div className="flex justify-center px-2 py-6">
//         <div className="bg-card w-full max-w-md overflow-y-auto rounded-2xl border p-6 shadow-sm md:p-8">
//           <DialogTitle className="mb-2 text-center">
//             <div className="from-primary to-chart-3 mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-r">
//               <svg
//                 className="text-primary-foreground size-8"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 10V3L4 14h7v7l9-11h-7z"
//                 />
//               </svg>
//             </div>
//             <div className="text-foreground text-2xl font-bold">
//               {copy.dialogTitlePrefix} {dayLabel}
//             </div>
//           </DialogTitle>
//           <DialogDescription className="text-muted-foreground mb-6 text-center">
//             {copy.dialogDescription}
//           </DialogDescription>

//           <form
//             className="flex flex-col gap-4"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <div className="space-y-2">
//               <Label htmlFor="exerciseName">
//                 {copy.exerciseName} <span className="text-destructive">*</span>
//               </Label>
//               <Input
//                 id="exerciseName"
//                 placeholder={copy.namePlaceholder}
//                 aria-invalid={!!errors.exerciseName || isDuplicateExerciseName}
//                 {...register("exerciseName")}
//               />
//               {errors.exerciseName && (
//                 <div className="text-destructive flex items-center gap-1 text-sm">
//                   <AlertCircle className="size-4" />
//                   <span>{errors.exerciseName.message}</span>
//                 </div>
//               )}
//               {isDuplicateExerciseName && !errors.exerciseName && (
//                 <div className="text-destructive flex items-center gap-1 text-sm">
//                   <AlertCircle className="size-4" />
//                   <span>{copy.duplicateExercise}</span>
//                 </div>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="exerciseType">
//                 {copy.exerciseType} <span className="text-destructive">*</span>
//               </Label>
//               <Controller
//                 name="exerciseType"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     value={field.value ? field.value : EMPTY_VALUE}
//                     onValueChange={(v) =>
//                       field.onChange(v === EMPTY_VALUE ? "" : v)
//                     }
//                   >
//                     <SelectTrigger
//                       id="exerciseType"
//                       className="w-full"
//                       aria-invalid={!!errors.exerciseType}
//                     >
//                       <SelectValue placeholder={copy.selectTypePlaceholder} />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value={EMPTY_VALUE}>
//                         {copy.selectTypePlaceholder}
//                       </SelectItem>
//                       {exerciseTypes.map((type: string) => (
//                         <SelectItem key={type} value={type}>
//                           {type}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 )}
//               />
//               {errors.exerciseType && (
//                 <div className="text-destructive flex items-center gap-1 text-sm">
//                   <AlertCircle className="size-4" />
//                   <span>{errors.exerciseType.message}</span>
//                 </div>
//               )}
//               <AddExerciseType />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="duration">
//                   {copy.duration} <span className="text-destructive">*</span>
//                 </Label>
//                 <Input
//                   id="duration"
//                   type="number"
//                   min={0}
//                   step={1}
//                   placeholder={copy.durationPlaceholder}
//                   aria-invalid={!!errors.duration}
//                   {...register("duration", { valueAsNumber: true })}
//                 />
//                 {errors.duration && (
//                   <div className="text-destructive flex items-center gap-1 text-sm">
//                     <AlertCircle className="size-4" />
//                     <span>{errors.duration.message}</span>
//                   </div>
//                 )}
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="caloriesBurned">{copy.caloriesBurned}</Label>
//                 <Input
//                   id="caloriesBurned"
//                   type="number"
//                   min={0}
//                   step={1}
//                   placeholder={copy.caloriesPlaceholder}
//                   aria-invalid={!!errors.caloriesBurned}
//                   {...register("caloriesBurned", { valueAsNumber: true })}
//                 />
//                 {errors.caloriesBurned && (
//                   <div className="text-destructive flex items-center gap-1 text-sm">
//                     <AlertCircle className="size-4" />
//                     <span>{errors.caloriesBurned.message}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full"
//               disabled={isSubmitting || isDuplicateExerciseName}
//             >
//               {isSubmitting ? copy.submitting : copy.submit}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </DialogContent>
//   );
// };
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { Controller } from "react-hook-form";
import { getBioText, getWorkoutFormCopy } from "@/constants";
import { getDayLabel } from "@/utils/getDayLabel";
import type { WorkoutDialogProps } from "../types/types";
import AddExerciseType from "../../addExerciseType/AddExerciseType";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

const EMPTY_VALUE = "__none__";

export const WorkoutDialog: React.FC<WorkoutDialogProps> = ({
  form,
  isDuplicateExerciseName,
  onSubmit,
  displayDate,
}) => {
  const { locale } = useLanguage();
  const bio = getBioText(locale);
  const copy = getWorkoutFormCopy(locale);
  const { state } = useExercise();
  const exerciseTypes = [...state.exerciseTypes];
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const dayLabel = getDayLabel(displayDate, locale, bio);

  return (
    <DialogContent className="sm:max-w-[500px] bg-background border-border">
      <div className="flex justify-center px-2 py-6">
        <div className="bg-card w-full max-w-md overflow-y-auto rounded-2xl border border-border p-6 shadow-sm md:p-8">
          <DialogTitle className="mb-2 text-center">
            <div className="from-primary to-danger mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-gradient-to-br">
              <svg
                className="text-primary-foreground size-8"
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
            <div className="text-primary-foreground text-2xl font-bold tracking-tight">
              {copy.dialogTitlePrefix} {dayLabel}
            </div>
          </DialogTitle>
          <DialogDescription className="text-secondary mb-6 text-center text-sm">
            {copy.dialogDescription}
          </DialogDescription>

          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-1.5">
              <Label
                htmlFor="exerciseName"
                className="text-secondary text-xs font-semibold uppercase tracking-wider"
              >
                {copy.exerciseName} <span className="text-danger">*</span>
              </Label>
              <Input
                id="exerciseName"
                placeholder={copy.namePlaceholder}
                aria-invalid={!!errors.exerciseName || isDuplicateExerciseName}
                className="bg-background border-border text-primary-foreground placeholder:text-secondary focus-visible:ring-primary"
                {...register("exerciseName")}
              />
              {errors.exerciseName && (
                <div className="text-danger flex items-center gap-1.5 text-xs">
                  <AlertCircle className="size-3.5" />
                  <span>{errors.exerciseName.message}</span>
                </div>
              )}
              {isDuplicateExerciseName && !errors.exerciseName && (
                <div className="text-danger flex items-center gap-1.5 text-xs">
                  <AlertCircle className="size-3.5" />
                  <span>{copy.duplicateExercise}</span>
                </div>
              )}
            </div>

            <div className="space-y-1.5 flex-1">
              <Label
                htmlFor="exerciseType"
                className="text-secondary text-xs font-semibold uppercase tracking-wider"
              >
                {copy.exerciseType} <span className="text-danger">*</span>
              </Label>
              <div
                // style={{ direction: "rtl" }}
                className="flex w-full items-center justify-center gap-3"
              >
                <Controller
                  name="exerciseType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ? field.value : EMPTY_VALUE}
                      onValueChange={(v) =>
                        field.onChange(v === EMPTY_VALUE ? "" : v)
                      }
                    >
                      <SelectTrigger
                        id="exerciseType"
                        className="w-full bg-background border-border text-primary-foreground focus:ring-primary"
                        aria-invalid={!!errors.exerciseType}
                      >
                        <SelectValue placeholder={copy.selectTypePlaceholder} />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border">
                        <SelectItem
                          value={EMPTY_VALUE}
                          className="text-secondary"
                        >
                          {copy.selectTypePlaceholder}
                        </SelectItem>
                        {exerciseTypes.map((type: string) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <AddExerciseType />
              </div>
              {errors.exerciseType && (
                <div className="text-danger flex items-center gap-1.5 text-xs">
                  <AlertCircle className="size-3.5" />
                  <span>{errors.exerciseType.message}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="duration"
                  className="text-secondary text-xs font-semibold uppercase tracking-wider"
                >
                  {copy.duration} <span className="text-danger">*</span>
                </Label>
                <Input
                  id="duration"
                  type="number"
                  min={0}
                  step={1}
                  placeholder={copy.durationPlaceholder}
                  aria-invalid={!!errors.duration}
                  className="bg-background border-border text-primary-foreground placeholder:text-secondary focus-visible:ring-primary"
                  {...register("duration", { valueAsNumber: true })}
                />
                {errors.duration && (
                  <div className="text-danger flex items-center gap-1.5 text-xs">
                    <AlertCircle className="size-3.5" />
                    <span>{errors.duration.message}</span>
                  </div>
                )}
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="caloriesBurned"
                  className="text-secondary text-xs font-semibold uppercase tracking-wider"
                >
                  {copy.caloriesBurned}
                </Label>
                <Input
                  id="caloriesBurned"
                  type="number"
                  min={0}
                  step={1}
                  placeholder={copy.caloriesPlaceholder}
                  aria-invalid={!!errors.caloriesBurned}
                  className="bg-background border-border text-primary-foreground placeholder:text-secondary focus-visible:ring-primary"
                  {...register("caloriesBurned", { valueAsNumber: true })}
                />
                {errors.caloriesBurned && (
                  <div className="text-danger flex items-center gap-1.5 text-xs">
                    <AlertCircle className="size-3.5" />
                    <span>{errors.caloriesBurned.message}</span>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide disabled:opacity-40"
              disabled={isSubmitting || isDuplicateExerciseName}
            >
              {isSubmitting ? copy.submitting : copy.submit}
            </Button>
          </form>
        </div>
      </div>
    </DialogContent>
  );
};
