import { getGoalFormSchema } from "@/constants";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
import { goalsSchema } from "../schemas/goalSchema";

const useGoalFormSchema = () => {
  const { locale } = useLanguage();
  const msg = getGoalFormSchema(locale);
  return goalsSchema(msg);
};

export default useGoalFormSchema;
