// schemas/workoutSchemas.ts
import { z } from "zod";

export const workoutSchema = z.object({
  exerciseName: z
    .string()
    .min(1, "نام تمرین الزامی است")
    .max(100, "نام تمرین نباید بیشتر از ۱۰۰ کاراکتر باشد"),
  exerciseType: z.string().min(1, "نوع تمرین الزامی است"),
  duration: z
    .number({ message: "مدت زمان باید عدد باشد" })
    .positive("مدت زمان باید بیشتر از صفر باشد")
    .max(1440, "مدت زمان نباید بیشتر از ۱۴۴۰ دقیقه (۲۴ ساعت) باشد"),
  caloriesBurned: z
    .number({ message: "کالری سوخته باید عدد باشد" })
    .nonnegative("کالری سوخته نمی‌تواند منفی باشد")
    .max(10000, "کالری سوخته نباید بیشتر از ۱۰۰۰۰ باشد"),
});

export type WorkoutFormData = z.infer<typeof workoutSchema>;
