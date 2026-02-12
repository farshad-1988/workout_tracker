import { Outlet, useParams, type Params } from "react-router-dom";
import Navbar from "./Navbar";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { Exercise } from "@/types/types";
import { useEffect, useState } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Toaster } from "sonner";

const MainLayout = () => {
  const { pickedDate } = useParams<keyof Params>() as { pickedDate: string };
  const [ModifiedPickedDate, setModifiedPickedDate] = useState<string>("");

  useEffect(() => {
    if (!pickedDate)
      setModifiedPickedDate(
        new DateObject({
          calendar: persian,
          locale: persian_fa,
        }).format("YYYY-MM-DD"),
      );
  }, [pickedDate]);
  const [exercises, setExercises] = useLocalStorage<Exercise[]>(
    pickedDate ?? ModifiedPickedDate,
    [],
  );
  // const [extraData, setExtraData] = useLocalStorage<ExtraData>("extraData", {});

  return (
    <div className="w-full h-full ">
      <Navbar setExercises={setExercises} exercises={exercises} />
      <div className="w-full  flex items-center bg-transparent justify-center">
        <Outlet context={{ exercises, setExercises }} />
        <Toaster position="top-center" />
      </div>
    </div>
  );
};

export default MainLayout;
