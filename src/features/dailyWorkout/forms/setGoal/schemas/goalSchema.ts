import type {
  goalsValidationMessagesEn,
  goalsValidationMessagesFa,
} from "@/constants/formSchemas";
import { z } from "zod";

type GoalsMessages =
  | typeof goalsValidationMessagesFa
  | typeof goalsValidationMessagesEn;

export const goalsSchema = (msg: GoalsMessages) =>
  z.object({
    dailyCalorieGoal: z
      .number({
        message: msg.dailyCalorieGoal.invalidType,
      })
      .positive(msg.dailyCalorieGoal.positive)
      .max(10000, msg.dailyCalorieGoal.max),

    dailyDurationGoal: z
      .number({
        message: msg.dailyDurationGoal.invalidType,
      })
      .positive(msg.dailyDurationGoal.positive)
      .max(1440, msg.dailyDurationGoal.max),
  });

export type GoalsSchema = ReturnType<typeof goalsSchema>;

export type GoalsFormData = z.infer<GoalsSchema>;
