// import WorkoutTableRow from "./WorkoutTableRow";
// import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";
// import { useModifiedPickedDate } from "../../hooks/useModifiedPickedDate";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { getBioText, getUiCopy } from "@/constants";
// import { getDayLabel } from "@/utils/getDayLabel";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

// const WorkoutTable = () => {
//   const dateKey = useModifiedPickedDate();
//   const { exercises } = useDailyData(dateKey);
//   const { locale } = useLanguage();
//   const bio = getBioText(locale);
//   const ui = getUiCopy(locale);
//   const dayLabel = getDayLabel(dateKey, locale, bio);

//   return (
//     <Card className="border-border/60 w-full overflow-hidden shadow-sm">
//       <CardHeader className="border-border/60 border-b">
//         <CardTitle className="text-lg font-semibold">
//           {ui.workoutsListPrefix} {dayLabel}
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-0">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-muted/50">
//               <tr>
//                 <th className="text-muted-foreground px-6 py-3 text-right text-xs font-medium uppercase">
//                   {ui.colExerciseName}
//                 </th>
//                 <th className="text-muted-foreground px-6 py-3 text-right text-xs font-medium uppercase">
//                   {ui.colType}
//                 </th>
//                 <th className="text-muted-foreground px-6 py-3 text-right text-xs font-medium uppercase">
//                   {ui.colDuration}
//                 </th>
//                 <th className="text-muted-foreground px-6 py-3 text-right text-xs font-medium uppercase">
//                   {ui.colCalories}
//                 </th>
//                 <th className="text-muted-foreground px-6 py-3 text-right text-xs font-medium uppercase">
//                   {ui.colActions}
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-border/60 divide-y">
//               {exercises.map((exercise) => (
//                 <WorkoutTableRow
//                   key={exercise.id}
//                   exercise={exercise}
//                   dateKey={dateKey}
//                 />
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default WorkoutTable;
import WorkoutTableRow from "./WorkoutTableRow";
import { useDailyData } from "@/shared/contexts/exerciseContext/hooks/useDailyData";
import { useModifiedPickedDate } from "../../hooks/useModifiedPickedDate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBioText, getUiCopy, getWorkoutTable } from "@/constants";
import { getDayLabel } from "@/utils/getDayLabel";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
import { Dumbbell } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const WorkoutTable = () => {
  const dateKey = useModifiedPickedDate();
  const { exercises } = useDailyData(dateKey);
  const { locale } = useLanguage();
  const bio = getBioText(locale);
  const ui = getUiCopy(locale);
  const tableText = getWorkoutTable(locale);
  const dayLabel = getDayLabel(dateKey, locale, bio);

  return (
    <Card className="w-full overflow-hidden border-border bg-card shadow-md">
      {/* Header */}
      <CardHeader className="border-b border-border px-4 py-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-primary-foreground sm:text-lg">
          <Dumbbell className="h-4 w-4 shrink-0 text-primary sm:h-5 sm:w-5" />
          <span>
            {ui.workoutsListPrefix}{" "}
            <span className="text-primary">{dayLabel}</span>
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <>
          {/*
              The table element is present at all breakpoints so WorkoutTableRow
              can render both its <tr> variants inside a valid <tbody>.
              On mobile the thead is hidden and rows render as cards via the
              MobileCard sub-component. On sm+ the DesktopRow sub-component
              renders a standard table row.
            */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="hidden sm:table-header-group">
                <TableRow className="border-border bg-card  hover:bg-card text-primary-foreground">
                  <TableHead className="text-center text-primary-forground">
                    {ui.colExerciseName}
                  </TableHead>

                  <TableHead className="text-center text-primary-forground">
                    {ui.colType}
                  </TableHead>

                  <TableHead className="text-center text-primary-forground">
                    {ui.colDuration}
                  </TableHead>

                  <TableHead className="text-center text-primary-forground">
                    {ui.colCalories}
                  </TableHead>

                  <TableHead className="text-center text-primary-forground">
                    {ui.colActions}
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {exercises.map((exercise) => (
                  <WorkoutTableRow
                    key={exercise.id}
                    exercise={exercise}
                    dateKey={dateKey}
                  />
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer summary */}
          <div className="flex items-center justify-between border-t border-border/50 px-4 py-3 sm:px-6">
            <span className="text-xs text-secondary">{exercises.length}</span>
            <span className="text-xs font-medium text-primary">
              {exercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0)}{" "}
              {tableText.caloriesUnit}
            </span>
          </div>
        </>
      </CardContent>
    </Card>
  );
};

export default WorkoutTable;
