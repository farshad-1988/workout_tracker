// import { z } from "zod";

// export const workoutSchema = z.object({
//   exerciseName: z
//     .string()
//     .min(1, "نام تمرین الزامی است")
//     .max(100, "نام تمرین نباید بیشتر از ۱۰۰ کاراکتر باشد"),
//   exerciseType: z.string().min(1, "نوع تمرین الزامی است"),
//   duration: z
//     .number({ message: "مدت زمان باید عدد باشد" })
//     .positive("مدت زمان باید بیشتر از صفر باشد")
//     .max(1440, "مدت زمان نباید بیشتر از ۱۴۴۰ دقیقه (۲۴ ساعت) باشد"),
//   caloriesBurned: z
//     .number({ message: "کالری سوخته باید عدد باشد" })
//     .nonnegative("کالری سوخته نمی‌تواند منفی باشد")
//     .max(10000, "کالری سوخته نباید بیشتر از ۱۰۰۰۰ باشد"),
// });

// export type WorkoutFormData = z.infer<typeof workoutSchema>;

import type {
  workoutValidationMessagesEn,
  workoutValidationMessagesFa,
} from "@/constants/formSchemas";
import { z } from "zod";

type WorkoutMessages =
  | typeof workoutValidationMessagesEn
  | typeof workoutValidationMessagesFa;

export const workoutSchema = (msg: WorkoutMessages) =>
  z.object({
    exerciseName: z
      .string()
      .min(1, msg.exerciseName.required)
      .max(100, msg.exerciseName.max),

    exerciseType: z.string().min(1, msg.exerciseType.required),

    duration: z
      .number({ message: msg.duration.invalidType })
      .positive(msg.duration.positive)
      .max(1440, msg.duration.max),

    caloriesBurned: z
      .number({ message: msg.caloriesBurned.invalidType })
      .nonnegative(msg.caloriesBurned.nonnegative)
      .max(10000, msg.caloriesBurned.max),
  });

export type WorkoutSchema = ReturnType<typeof workoutSchema>;
export type WorkoutFormData = z.infer<WorkoutSchema>;
