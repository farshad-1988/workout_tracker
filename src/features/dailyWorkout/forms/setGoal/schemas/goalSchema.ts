import z from "zod";

export const goalsSchema = z.object({
  dailyCalorieGoal: z
    .number({ message: "هدف کالری باید عدد باشد" })
    .positive("هدف کالری باید بیشتر از صفر باشد")
    .max(10000, "هدف کالری نباید بیشتر از ۱۰۰۰۰ باشد"),
  dailyDurationGoal: z
    .number({ message: "هدف زمان باید عدد باشد" })
    .positive("هدف زمان باید بیشتر از صفر باشد")
    .max(1440, "هدف زمان نباید بیشتر از ۱۴۴۰ دقیقه (۲۴ ساعت) باشد"),
});

export type GoalsFormData = z.infer<typeof goalsSchema>;
