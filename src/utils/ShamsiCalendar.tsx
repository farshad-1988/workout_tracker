import { Calendar } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
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

const ShamsiCalendar = () => {
  const { state } = useExercise();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { pickedDate }: Readonly<Params<string>> = useParams();

  const dateClickHandler = (date: DateObject | DateObject[] | null) => {
    const selected = Array.isArray(date) ? date[0] : date;
    if (!selected) return;
    navigate(`/dailyworkout/${selected.format("YYYY-MM-DD")}`);
    setDialogOpen(false);
  };

  const days = daysWithWorkout(state);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => {
            setDialogOpen(true);
          }}
          variant="outline"
          className="cursor-pointer"
        >
          ویرایش تاریخچه تمرینات
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="undefined" className="bg-slate-100">
        <div className="flex flex-col justify-center items-center">
          <DialogTitle className="mb-4 text-lg font-bold">
            تاریخ مد نظر تمرین را انتخاب کنید
          </DialogTitle>
          <Calendar
            className="my-calendar"
            calendar={persian}
            locale={persian_fa}
            onChange={dateClickHandler}
            maxDate={new Date()}
            mapDays={({ date }) => {
              const formatted = date.format("YYYY-MM-DD");
              if (days.includes(formatted)) {
                return {
                  style: {
                    backgroundColor: "#22c55e",
                    color: "white",
                    borderRadius: "6px",
                  },
                };
              }
            }}
            value={
              pickedDate
                ? new DateObject({
                    date: pickedDate, // "YYYY-MM-DD"
                    calendar: persian,
                    locale: persian_fa,
                  })
                : undefined
            }
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShamsiCalendar;
