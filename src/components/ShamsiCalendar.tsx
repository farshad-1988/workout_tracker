import { Calendar } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate, useParams, type Params } from "react-router-dom";
import DateObject from "react-date-object";

const ShamsiCalendar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { pickedDate }: Readonly<Params<string>> = useParams();

  const dateClickHandler = (date: DateObject | DateObject[] | null) => {
    const selected = Array.isArray(date) ? date[0] : date;
    if (!selected) return;
    navigate(`/dailyworkout/${selected.format("YYYY-MM-DD")}`);
    setDialogOpen(false);
  };

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
            maxDate={new Date()} // فقط امروز و قبلش قابل انتخاب هستند
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
