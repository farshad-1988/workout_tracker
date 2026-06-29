// import { Activity } from "lucide-react";
// import { useMediaQuery } from "usehooks-ts";

// import { Card, CardContent } from "@/components/ui/card";
// import { getBioText } from "@/constants";

// import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";
// import { getDayLabel } from "@/utils/getDayLabel";
// import AddWorkout from "../forms/addWorkout/addWorkout";
// import SetGoal from "../forms/setGoal/SetGoal";
// import { useModifiedPickedDate } from "../hooks/useModifiedPickedDate";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

// const WorkoutHeader = () => {
//   const dateKey = useModifiedPickedDate();
//   const { exercises } = useDailyData(dateKey);
//   const { locale } = useLanguage();
//   const bio = getBioText(locale);
//   const dayLabel = getDayLabel(dateKey, locale, bio);
//   const isWide = useMediaQuery("(min-width: 500px)");

//   const heading = `${bio.dashboardTitle} ${dayLabel}`;

//   return (
//     <Card className="border-border/60 bg-card/80 backdrop-blur-sm shadow-sm">
//       <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
//         <div className="flex items-center gap-4">
//           <div className="bg-primary flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-md sm:size-16">
//             <Activity className="text-primary-foreground size-7 sm:size-8" />
//           </div>
//           {isWide ? (
//             <div>
//               <h1 className="text-foreground text-2xl font-bold sm:text-3xl">
//                 {heading}
//               </h1>
//               <p className="text-muted-foreground mt-1">
//                 {bio.dashboardSubtitle}
//               </p>
//             </div>
//           ) : null}
//         </div>
//         {exercises.length !== 0 ? (
//           <div className="flex flex-wrap items-center justify-end gap-2">
//             <AddWorkout />
//             <SetGoal />
//           </div>
//         ) : (
//           <div className="text-foreground text-lg italic md:hidden">
//             {bio.mobileDashboardShort} {dayLabel}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default WorkoutHeader;
import { Activity } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { Card, CardContent } from "@/components/ui/card";
import { getBioText } from "@/constants";

import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";
import { getDayLabel } from "@/utils/getDayLabel";
import AddWorkout from "../forms/addWorkout/addWorkout";
import SetGoal from "../forms/setGoal/SetGoal";
import { useModifiedPickedDate } from "../hooks/useModifiedPickedDate";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

const WorkoutHeader = () => {
  const dateKey = useModifiedPickedDate();
  console.log(dateKey);
  const { exercises } = useDailyData(dateKey);
  const { locale } = useLanguage();
  const bio = getBioText(locale);
  const dayLabel = getDayLabel(dateKey, locale, bio);
  const isWide = useMediaQuery("(min-width: 500px)");

  const heading = `${bio.dashboardTitle} ${dayLabel}`;

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        {isWide && (
          <div className="flex items-center gap-4">
            <div className="bg-primary flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-md sm:size-16">
              <Activity className="text-primary-foreground size-7 sm:size-8" />
            </div>
            <div>
              <h1 className="text-primary text-2xl font-bold sm:text-3xl">
                {heading}
              </h1>
              <p className="text-secondary mt-1 text-sm">
                {bio.dashboardSubtitle}
              </p>
            </div>
          </div>
        )}

        {exercises.length !== 0 ? (
          <div className="flex flex-wrap items-center justify-end gap-2">
            <AddWorkout />
            <SetGoal />
          </div>
        ) : (
          <div className="text-secondary text-lg italic md:hidden">
            {bio.mobileDashboardShort} {dayLabel}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkoutHeader;
