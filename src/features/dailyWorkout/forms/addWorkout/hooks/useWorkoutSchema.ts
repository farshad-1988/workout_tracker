import { getWorkoutFormSchema } from "@/constants";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
import { workoutSchema } from "../schemas/workoutSchemas";

const useWorkoutSchema = () => {
  const { locale } = useLanguage();
  const msg = getWorkoutFormSchema(locale);
  return workoutSchema(msg);
};

export default useWorkoutSchema;
