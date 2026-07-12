// // import { Calendar } from "react-multi-date-picker";
// // import persian_fa from "react-date-object/locales/persian_fa";
// // import persian from "react-date-object/calendars/persian";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "../components/ui/dialog";
// // import { Button } from "../components/ui/button";
// // import { useState } from "react";
// // import { useNavigate, useParams, type Params } from "react-router-dom";
// // import DateObject from "react-date-object";
// // import { daysWithWorkout } from "@/shared/contexts/exerciseContext/selectors/exerciseStates";
// // import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";

// // const ShamsiCalendar = () => {
// //   const { state } = useExercise();
// //   const [dialogOpen, setDialogOpen] = useState(false);
// //   const navigate = useNavigate();
// //   const { pickedDate }: Readonly<Params<string>> = useParams();

// //   const dateClickHandler = (date: DateObject | DateObject[] | null) => {
// //     const selected = Array.isArray(date) ? date[0] : date;
// //     if (!selected) return;
// //     navigate(`/dailyworkout/${selected.format("YYYY-MM-DD")}`);
// //     setDialogOpen(false);
// //   };

// //   const days = daysWithWorkout(state);

// //   return (
// //     <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
// //       <DialogTrigger asChild>
// //         <Button
// //           onClick={() => {
// //             setDialogOpen(true);
// //           }}
// //           variant="outline"
// //           className="cursor-pointer"
// //         >
// //           ویرایش تاریخچه تمرینات
// //         </Button>
// //       </DialogTrigger>
// //       <DialogContent aria-describedby="undefined" className="bg-slate-100">
// //         <div className="flex flex-col justify-center items-center">
// //           <DialogTitle className="mb-4 text-lg font-bold">
// //             تاریخ مد نظر تمرین را انتخاب کنید
// //           </DialogTitle>
// //           <Calendar
// //             className="my-calendar"
// //             calendar={persian}
// //             locale={persian_fa}
// //             onChange={dateClickHandler}
// //             maxDate={new Date()}
// //             mapDays={({ date }) => {
// //               const formatted = date.format("YYYY-MM-DD");
// //               if (days.includes(formatted)) {
// //                 return {
// //                   style: {
// //                     backgroundColor: "#22c55e",
// //                     color: "white",
// //                     borderRadius: "6px",
// //                   },
// //                 };
// //               }
// //             }}
// //             value={
// //               pickedDate
// //                 ? new DateObject({
// //                     date: pickedDate, // "YYYY-MM-DD"
// //                     calendar: persian,
// //                     locale: persian_fa,
// //                   })
// //                 : undefined
// //             }
// //           />
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default ShamsiCalendar;
// import { Calendar } from "react-multi-date-picker";
// import persian_fa from "react-date-object/locales/persian_fa";
// import persian from "react-date-object/calendars/persian";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogTrigger,
// } from "../components/ui/dialog";
// import { Button } from "../components/ui/button";
// import { useState } from "react";
// import { useNavigate, useParams, type Params } from "react-router-dom";
// import DateObject from "react-date-object";
// import { daysWithWorkout } from "@/shared/contexts/exerciseContext/selectors/exerciseStates";
// import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
// import { getCalendarText } from "@/constants";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

// const ShamsiCalendar = () => {
//   const { state } = useExercise();
//   const { locale } = useLanguage();
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const navigate = useNavigate();
//   const { pickedDate }: Readonly<Params<string>> = useParams();

//   const dateClickHandler = (date: DateObject | DateObject[] | null) => {
//     const selected = Array.isArray(date) ? date[0] : date;
//     if (!selected) return;
//     navigate(`/dailyworkout/${selected.format("YYYY-MM-DD")}`);
//     setDialogOpen(false);
//   };

//   const days = daysWithWorkout(state);

//   const calendarText = getCalendarText(locale);

//   return (
//     <>
//       {/* Scoped overrides for react-multi-date-picker internals */}
//       <style>{`
//         .my-calendar {
//           background-color: var(--card) !important;
//           border: 1px solid var(--border) !important;
//           border-radius: 0.75rem !important;
//           box-shadow: none !important;
//           font-family: inherit !important;
//           width: 100% !important;
//         }

//         /* Header: month/year nav row */
//         .my-calendar .rmdp-header {
//           background-color: var(--card) !important;
//           border-bottom: 1px solid var(--border) !important;
//           padding: 0.5rem 0.75rem !important;
//         }
//         .my-calendar .rmdp-header-values span {
//           color: var(--primary) !important;
//           font-weight: 600 !important;
//         }

//         /* Nav arrows */
//         .my-calendar .rmdp-arrow-container {
//           background: transparent !important;
//           border: none !important;
//           box-shadow: none !important;
//         }
//         .my-calendar .rmdp-arrow {
//           border-color: var(--primary) !important;
//         }
//         .my-calendar .rmdp-arrow-container:hover .rmdp-arrow {
//           border-color: var(--primary-foreground) !important;
//         }
//         .my-calendar .rmdp-arrow-container:hover {
//           background-color: var(--primary) !important;
//           border-radius: 50% !important;
//         }

//         /* Week day labels */
//         .my-calendar .rmdp-week-day {
//           color: var(--secondary) !important;
//           font-size: 0.75rem !important;
//           font-weight: 500 !important;
//         }

//         /* Day cells */
//         .my-calendar .rmdp-day span {
//           color: var(--primary-foreground) !important;
//           border-radius: 0.375rem !important;
//           transition: background-color 0.15s !important;
//         }

//         /* Override white text set by lib on non-selected days */
//         .my-calendar .rmdp-day:not(.rmdp-selected):not(.rmdp-disabled) span {
//           color: #e5e7eb !important;
//         }

//         /* Hover on normal days */
//         .my-calendar .rmdp-day:not(.rmdp-selected):not(.rmdp-disabled) span:hover {
//           background-color: var(--primary) !important;
//           color: var(--primary-foreground) !important;
//         }

//         /* Selected day */
//         .my-calendar .rmdp-day.rmdp-selected span:not(.highlight) {
//           background-color: var(--primary) !important;
//           color: var(--primary-foreground) !important;
//           box-shadow: none !important;
//         }

//         /* Today indicator */
//         .my-calendar .rmdp-today span {
//           background-color: color-mix(in srgb, var(--primary) 25%, transparent) !important;
//           color: var(--primary) !important;
//           font-weight: 700 !important;
//         }

//         /* Disabled days (future / out of range) */
//         .my-calendar .rmdp-day.rmdp-disabled span {
//           color: var(--secondary) !important;
//           opacity: 0.35 !important;
//         }

//         /* Days outside current month */
//         .my-calendar .rmdp-day.rmdp-deactive span {
//           color: var(--secondary) !important;
//           opacity: 0.4 !important;
//         }

//         /* Workout highlight — success green */
//         .my-calendar .rmdp-day span.workout-day {
//           background-color: var(--success) !important;
//           color: #ffffff !important;
//           border-radius: 0.375rem !important;
//         }
//       `}</style>

//       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//         <DialogTrigger asChild>
//           <Button
//             variant="outline"
//             className="cursor-pointer border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
//             onClick={() => setDialogOpen(true)}
//           >
//             {calendarText.title}
//           </Button>
//         </DialogTrigger>

//         <DialogContent
//           aria-describedby={undefined}
//           className="bg-card border-border max-w-sm"
//         >
//           <DialogTitle className="text-center text-base font-semibold text-primary">
//             {calendarText.calenderHeader}
//           </DialogTitle>

//           <div className="flex justify-center pt-1">
//             <Calendar
//               className="my-calendar"
//               calendar={persian}
//               locale={persian_fa}
//               onChange={dateClickHandler}
//               maxDate={new Date()}
//               mapDays={({ date }) => {
//                 const formatted = date.format("YYYY-MM-DD");
//                 if (days.includes(formatted)) {
//                   return {
//                     className: "workout-day",
//                   };
//                 }
//               }}
//               value={
//                 pickedDate
//                   ? new DateObject({
//                       date: pickedDate,
//                       calendar: persian,
//                       locale: persian_fa,
//                     })
//                   : undefined
//               }
//             />
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default ShamsiCalendar;
import { Calendar } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { useNavigate, useParams, type Params } from "react-router-dom";
import DateObject from "react-date-object";
import { daysWithWorkout } from "@/shared/contexts/exerciseContext/selectors/exerciseStates";
import { useExercise } from "@/shared/contexts/exerciseContext/hooks/useExercises";
import { getCalendarText } from "@/constants";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

const ShamsiCalendar = () => {
  const { state } = useExercise();
  const { locale } = useLanguage();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { pickedDate }: Readonly<Params<string>> = useParams();

  const isFa = locale === "fa";
  const activeCalendar = isFa ? persian : gregorian;
  const activeLocale = isFa ? persian_fa : gregorian_en;
  // react-multi-date-picker's weekStartDayIndex: 0 = Sunday ... 6 = Saturday.
  // fa weeks start Saturday (index 6), en weeks start Monday (index 1).
  const weekStartDayIndex = isFa ? 6 : 1;

  const dateClickHandler = (date: DateObject | DateObject[] | null) => {
    const selected = Array.isArray(date) ? date[0] : date;
    if (!selected) return;
    navigate(`/dailyworkout/${selected.format("YYYY-MM-DD")}`);
    setDialogOpen(false);
  };

  const days = daysWithWorkout(state);

  const calendarText = getCalendarText(locale);

  return (
    <>
      {/* Scoped overrides for react-multi-date-picker internals */}
      <style>{`
        .my-calendar {
          background-color: var(--card) !important;
          border: 1px solid var(--border) !important;
          border-radius: 0.75rem !important;
          box-shadow: none !important;
          font-family: inherit !important;
          width: 100% !important;
        }

        /* Header: month/year nav row */
        .my-calendar .rmdp-header {
          background-color: var(--card) !important;
          border-bottom: 1px solid var(--border) !important;
          padding: 0.5rem 0.75rem !important;
        }
        .my-calendar .rmdp-header-values span {
          color: var(--primary) !important;
          font-weight: 600 !important;
        }

        /* Nav arrows */
        .my-calendar .rmdp-arrow-container {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        .my-calendar .rmdp-arrow {
          border-color: var(--primary) !important;
        }
        .my-calendar .rmdp-arrow-container:hover .rmdp-arrow {
          border-color: var(--primary-foreground) !important;
        }
        .my-calendar .rmdp-arrow-container:hover {
          background-color: var(--primary) !important;
          border-radius: 50% !important;
        }

        /* Week day labels */
        .my-calendar .rmdp-week-day {
          color: var(--secondary) !important;
          font-size: 0.75rem !important;
          font-weight: 500 !important;
        }

        /* Day cells */
        .my-calendar .rmdp-day span {
          color: var(--primary-foreground) !important;
          border-radius: 0.375rem !important;
          transition: background-color 0.15s !important;
        }

        /* Override white text set by lib on non-selected days */
        .my-calendar .rmdp-day:not(.rmdp-selected):not(.rmdp-disabled) span {
          color: #e5e7eb !important;
        }

        /* Hover on normal days */
        .my-calendar .rmdp-day:not(.rmdp-selected):not(.rmdp-disabled) span:hover {
          background-color: var(--primary) !important;
          color: var(--primary-foreground) !important;
        }

        /* Selected day */
        .my-calendar .rmdp-day.rmdp-selected span:not(.highlight) {
          background-color: var(--primary) !important;
          color: var(--primary-foreground) !important;
          box-shadow: none !important;
        }

        /* Today indicator */
        .my-calendar .rmdp-today span {
          background-color: color-mix(in srgb, var(--primary) 25%, transparent) !important;
          color: var(--primary) !important;
          font-weight: 700 !important;
        }

        /* Disabled days (future / out of range) */
        .my-calendar .rmdp-day.rmdp-disabled span {
          color: var(--secondary) !important;
          opacity: 0.35 !important;
        }

        /* Days outside current month */
        .my-calendar .rmdp-day.rmdp-deactive span {
          color: var(--secondary) !important;
          opacity: 0.4 !important;
        }

        /* Workout highlight — success green */
        .my-calendar .rmdp-day span.workout-day {
          background-color: var(--success) !important;
          color: #ffffff !important;
          border-radius: 0.375rem !important;
        }
      `}</style>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="cursor-pointer border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
            onClick={() => setDialogOpen(true)}
          >
            {calendarText.title}
          </Button>
        </DialogTrigger>

        <DialogContent
          aria-describedby={undefined}
          className="bg-card border-border max-w-sm"
        >
          <DialogTitle className="text-center text-base font-semibold text-primary">
            {calendarText.calenderHeader}
          </DialogTitle>

          <div className="flex justify-center pt-1">
            <Calendar
              key={locale}
              className="my-calendar"
              calendar={activeCalendar}
              locale={activeLocale}
              weekStartDayIndex={weekStartDayIndex}
              onChange={dateClickHandler}
              maxDate={new Date()}
              mapDays={({ date }) => {
                const formatted = date.format("YYYY-MM-DD");
                if (days.includes(formatted)) {
                  return {
                    className: "workout-day",
                  };
                }
              }}
              value={
                pickedDate
                  ? new DateObject({
                      date: pickedDate,
                      calendar: activeCalendar,
                      locale: activeLocale,
                    })
                  : undefined
              }
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShamsiCalendar;
