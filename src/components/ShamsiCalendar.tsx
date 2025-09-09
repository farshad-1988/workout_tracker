import { Calendar } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShamsiCalendar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const dateClickHandler = (date: any) => {
    console.log(date.format("YYYY-MM-DD"));
    navigate(`/dailyworkout/${date.format("YYYY-MM-DD")}`);
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
      <DialogContent className="bg-slate-100">
        <div className="flex flex-col justify-center items-center">
          <div className="mb-4 text-lg font-bold">
            تاریخ مد نظر تمرین را انتخاب کنید
          </div>
          <Calendar
            className="my-calendar"
            calendar={persian}
            locale={persian_fa}
            onChange={dateClickHandler}
            maxDate={new Date()} // فقط امروز و قبلش قابل انتخاب هستند
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShamsiCalendar;
