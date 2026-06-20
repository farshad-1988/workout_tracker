// // components/WorkoutForm/ActionButtons.tsx
// import React from "react";
// import { CirclePlus } from "lucide-react";
// import { DialogTrigger } from "@/components/ui/dialog";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
// import { getExerciseRegister } from "@/constants";

// export const ActionButtons: React.FC<{ onWorkoutClick: () => void }> = ({
//   onWorkoutClick,
// }) => {
//   const { locale } = useLanguage();
//   const exerciseRegister = getExerciseRegister(locale);

//   return (
//     <DialogTrigger asChild>
//       <button
//         onClick={onWorkoutClick}
//         className="cursor-pointer flex-1 group relative overflow-hidden bg-card border border-primary text-primary rounded-xl px-6 py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary hover:text-primary-foreground"
//       >
//         <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
//         <div className="relative flex items-center justify-center gap-3">
//           <CirclePlus className="w-6 h-6" />
//           <div className="font-bold text-lg">{exerciseRegister.title}</div>
//         </div>
//       </button>
//     </DialogTrigger>
//   );
// };
import React from "react";
import { CirclePlus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
import { getExerciseRegister } from "@/constants";

export const ActionButtons: React.FC<{ onWorkoutClick: () => void }> = ({
  onWorkoutClick,
}) => {
  const { locale } = useLanguage();
  const exerciseRegister = getExerciseRegister(locale);

  return (
    <DialogTrigger asChild>
      <button
        onClick={onWorkoutClick}
        className="w-48 h-16 flex-1 group relative overflow-hidden bg-card border border-border text-primary rounded-xl px-6 py-4 transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.98] cursor-pointer"
      >
        <div className="relative flex items-center justify-center gap-3">
          <CirclePlus className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
          <span className="font-semibold text-base tracking-wide">
            {exerciseRegister.title}
          </span>
        </div>
      </button>
    </DialogTrigger>
  );
};
