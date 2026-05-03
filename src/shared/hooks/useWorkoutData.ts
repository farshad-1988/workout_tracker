// hooks/useWorkoutData.ts
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import useLocalStorage from "@/hooks/useLocalStorage";
import type { ExtraData } from "@/types/types";
import { defaultExercise } from "@/lib/constants/persian";

export const useWorkoutData = () => {
  const { pickedDate } = useParams<{ pickedDate: string }>();
  const [modifiedPickedDate, setModifiedPickedDate] = useState<string>("");

  const [exerciseTypes, setExerciseTypes] = useLocalStorage(
    "exerciseTypes",
    defaultExercise,
  );

  const [extraData, setExtraData] = useLocalStorage<ExtraData>("extraData", {
    registeredDate: [],
    dailyCalorieGoal: 0,
    dailyDurationGoal: 0,
  });

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

  return {
    pickedDate,
    modifiedPickedDate,
    exerciseTypes,
    setExerciseTypes,
    extraData,
    setExtraData,
  };
};
