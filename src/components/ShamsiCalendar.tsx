import { Calendar } from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { useNavigate, useParams, type Params } from "react-router-dom";
import DateObject from "react-date-object";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { ExtraData } from "@/types/types";

const ShamsiCalendar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [extraData] = useLocalStorage<ExtraData>("extraData", {});
  const navigate = useNavigate();
  const { pickedDate }: Readonly<Params<string>> = useParams();

  const dateClickHandler = (date: DateObject | DateObject[] | null) => {
    const selected = Array.isArray(date) ? date[0] : date;
    if (!selected) return;
    navigate(`/dailyworkout/${selected.format("YYYY-MM-DD")}`);
    setDialogOpen(false);
  };
  console.log("extraData in ShamsiCalendar:", extraData);

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
              if (
                extraData &&
                extraData.registeredDate &&
                extraData.registeredDate.includes(formatted)
              ) {
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
