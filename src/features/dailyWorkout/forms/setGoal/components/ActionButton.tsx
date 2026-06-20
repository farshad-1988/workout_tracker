// // components/WorkoutForm/ActionButtons.tsx
// import React from "react";
// import { Target } from "lucide-react";
// import { DialogTrigger } from "@/components/ui/dialog";
// import { getGoalFormCopy } from "@/constants";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

// export const ActionButtons: React.FC<{ onGoalsClick: () => void }> = ({
//   onGoalsClick,
// }) => {
//   const { locale } = useLanguage();

//   const dailyGoal = getGoalFormCopy(locale);

//   return (
//     <DialogTrigger asChild>
//       <button
//         onClick={onGoalsClick}
//         className="cursor-pointer group relative overflow-hidden bg-primary text-primary-foreground rounded-xl px-6 py-4 transition-all duration-300 hover:scale-105 hover:shadow-lg"
//       >
//         <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-15 transition-opacity duration-300" />
//         <div className="relative flex items-center justify-center gap-3">
//           <Target className="w-6 h-6" />
//           <div className="font-bold text-lg">{dailyGoal.title}</div>
//         </div>
//       </button>
//     </DialogTrigger>
//   );
// };
import React from "react";
import { Target } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { getGoalFormCopy } from "@/constants";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

export const ActionButtons: React.FC<{ onGoalsClick: () => void }> = ({
  onGoalsClick,
}) => {
  const { locale } = useLanguage();
  const dailyGoal = getGoalFormCopy(locale);

  return (
    <DialogTrigger asChild>
      <button
        onClick={onGoalsClick}
        className="w-48 h-16 cursor-pointer group relative overflow-hidden bg-primary text-primary-foreground rounded-xl px-6 py-4 transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
      >
        <div className="relative flex items-center justify-center gap-3">
          <Target className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
          <span className="font-semibold text-base tracking-wide">
            {dailyGoal.title}
          </span>
        </div>
      </button>
    </DialogTrigger>
  );
};
