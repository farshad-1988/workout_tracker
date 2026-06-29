import type { AppLocale } from "./types";

export type NavText = {
  brandTitle: string;
  home: string;
  chart: string;
  calendar: string;
  mobileMenu: string;
  appearance: string;
};

const navEn: NavText = {
  brandTitle: "Workout tracker",
  home: "Home",
  chart: "Calorie charts",
  calendar: "Calendar",
  mobileMenu: "Open menu",
  appearance: "theme",
};

const navFa: NavText = {
  brandTitle: "رهگیر ورزشی",
  home: "خانه",
  chart: "نمودار کالری",
  calendar: "تقویم",
  mobileMenu: "منوی موبایل",
  appearance: "پوسته",
};

export function getNavText(locale: AppLocale): NavText {
  return locale === "en" ? navEn : navFa;
}
