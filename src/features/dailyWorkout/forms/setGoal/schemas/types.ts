import type { UseFormReturn } from "react-hook-form";
import type { GoalsFormData } from "./goalSchema";

export interface GoalsDialogProps {
  form: UseFormReturn<GoalsFormData>;
  onSubmit: (data: GoalsFormData) => Promise<void>;
}
