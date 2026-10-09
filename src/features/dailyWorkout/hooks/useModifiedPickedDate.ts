import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resolveStoredDateKey, todayCanonical } from "@/utils/dateKey";

export const useModifiedPickedDate = (): string => {
  const { pickedDate } = useParams();
  const navigate = useNavigate();
  const dateKey = !pickedDate
    ? todayCanonical()
    : (resolveStoredDateKey(pickedDate) ?? pickedDate);

  useEffect(() => {
    if (!pickedDate) return;
    const resolved = resolveStoredDateKey(pickedDate);
    if (resolved && resolved !== pickedDate) {
      navigate(`/dailyworkout/${resolved}`, { replace: true });
    }
  }, [pickedDate, navigate]);

  return dateKey;
};
