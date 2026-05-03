// hooks/useGoalsForm.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { toast } from "sonner";

import type { UseGoalsFormProps } from "@/types/types";
import { goalsSchema, type GoalsFormData } from "../schemas/goalSchema";

export const useGoalsForm = ({
  extraData,
  setExtraData,
  isOpen,
  onSuccess,
}: UseGoalsFormProps) => {
  const form = useForm<GoalsFormData>({
    resolver: zodResolver(goalsSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({
        dailyCalorieGoal: extraData.dailyCalorieGoal || 0,
        dailyDurationGoal: extraData.dailyDurationGoal || 0,
      });
    }
  }, [isOpen, extraData.dailyCalorieGoal, extraData.dailyDurationGoal, form]);

  const submitGoals = async (data: GoalsFormData) => {
    try {
      setExtraData((prev) => ({
        ...prev,
        dailyCalorieGoal: data.dailyCalorieGoal,
        dailyDurationGoal: data.dailyDurationGoal,
      }));

      toast.success("اهداف روزانه با موفقیت ثبت شد!", {
        description: `هدف کالری: ${data.dailyCalorieGoal} | هدف زمان: ${data.dailyDurationGoal} دقیقه`,
      });

      onSuccess();
    } catch (error) {
      toast.error("خطا در ثبت اهداف", {
        description: "لطفاً دوباره تلاش کنید",
      });
      console.error("Error submitting goals:", error);
    }
  };

  return {
    form,
    submitGoals,
  };
};
