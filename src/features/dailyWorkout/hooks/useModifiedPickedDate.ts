// components/DailyWorkout/useModifiedPickedDate.ts
import { useState, useEffect } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export const useModifiedPickedDate = (pickedDate: string): string => {
  const [modifiedPickedDate, setModifiedPickedDate] = useState<string>("");

  useEffect(() => {
    if (!pickedDate) {
      setModifiedPickedDate(
        new DateObject({
          calendar: persian,
          locale: persian_fa,
        }).format("YYYY-MM-DD"),
      );
    } else {
      setModifiedPickedDate(pickedDate);
    }
  }, [pickedDate]);

  return modifiedPickedDate;
};
