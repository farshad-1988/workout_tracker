// import ShamsiCalendar from "@/utils/ShamsiCalendar";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { getNavText } from "@/constants";
// import type { AppLocale } from "@/constants/types";
// import { Menu, Home, BarChart3, Dumbbell, Languages } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
// import { ThemePicker } from "./ThemePicker";

// const Navbar = () => {
//   const { locale, setLocale } = useLanguage();
//   const nav = getNavText(locale);
//   // const themes = ["blue", "green", "purple", "orange", "red", "pink"]

//   return (
//     <>
//       <nav className="border-border/60 bg-primary fixed top-0 z-10 h-16 w-full border-b shadow-md backdrop-blur-md">
//         <div className="mx-auto flex h-full max-w-6xl items-center px-4">
//           <div className="flex h-full w-full items-center justify-between gap-3">
//             <div className="flex items-center gap-3">
//               <div className="from-primary to-chart-3 flex size-8 items-center justify-center rounded-lg bg-gradient-to-br">
//                 <span className="text-primary-foreground">
//                   <Dumbbell className="size-4" />
//                 </span>
//               </div>
//               <span className="text-foreground hidden text-lg font-bold sm:block">
//                 {nav.brandTitle}
//               </span>
//             </div>

//             <div className="hidden items-center gap-2 md:flex">
//               <Button variant="ghost" className="gap-2" asChild>
//                 <Link to="/">
//                   <Home className="size-4" />
//                   <span>{nav.home}</span>
//                 </Link>
//               </Button>

//               <Button variant="ghost" className="gap-2" asChild>
//                 <Link to="/workoutchart">
//                   <BarChart3 className="size-4" />
//                   <span>{nav.chart}</span>
//                 </Link>
//               </Button>

//               <div className="bg-border mx-2 h-6 w-px" />

//               <Select
//                 value={locale}
//                 onValueChange={(v) => setLocale(v as AppLocale)}
//               >
//                 <SelectTrigger
//                   size="sm"
//                   className="border-border w-[140px] gap-2"
//                   aria-label="Language"
//                 >
//                   <Languages className="size-4 shrink-0" />
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="fa">فارسی</SelectItem>
//                   <SelectItem value="en">English</SelectItem>
//                 </SelectContent>
//                 <ThemePicker />
//               </Select>

//               <div className="relative">
//                 <ShamsiCalendar />
//               </div>
//             </div>

//             <div className="flex items-center gap-2 md:hidden">
//               <Select
//                 value={locale}
//                 onValueChange={(v) => setLocale(v as AppLocale)}
//               >
//                 <SelectTrigger
//                   size="sm"
//                   className="border-border w-[110px]"
//                   aria-label="Language"
//                 >
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="fa">فا</SelectItem>
//                   <SelectItem value="en">EN</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Sheet>
//                 <SheetTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     className="shrink-0"
//                     aria-label={nav.mobileMenu}
//                   >
//                     <Menu className="size-6" />
//                   </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right" className="gap-6">
//                   <SheetHeader>
//                     <SheetTitle>{nav.brandTitle}</SheetTitle>
//                   </SheetHeader>
//                   <div className="flex flex-col gap-3 px-2">
//                     <Button
//                       variant="ghost"
//                       className="justify-start gap-2"
//                       asChild
//                     >
//                       <Link to="/">
//                         <Home className="size-5" />
//                         {nav.home}
//                       </Link>
//                     </Button>
//                     <Button
//                       variant="ghost"
//                       className="justify-start gap-2"
//                       asChild
//                     >
//                       <Link to="/workoutchart">
//                         <BarChart3 className="size-5" />
//                         {nav.chart}
//                       </Link>
//                     </Button>
//                   </div>
//                   <div className="text-muted-foreground flex items-center justify-between px-2 text-sm font-medium">
//                     <span>{nav.calendar}</span>
//                     <ShamsiCalendar />
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="h-16" />
//     </>
//   );
// };

import ShamsiCalendar from "@/utils/ShamsiCalendar";

import { Separator } from "@/components/ui/separator";
import { getNavText } from "@/constants";

import { Home, BarChart3, Dumbbell } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
import { ThemePicker } from "./ThemePicker";
import { LanguagePicker } from "./LanguagePicker";
import PhoneControls from "./PhoneControls";

const navLinkClass =
  "inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-primary-foreground transition-colors hover:bg-black/20 active:bg-black/30";

const Navbar = () => {
  const { locale } = useLanguage();
  const nav = getNavText(locale);
  // const isRtl = locale === "fa";

  // useEffect(() => {
  //   document.documentElement.dir = isRtl ? "rtl" : "ltr";
  //   document.documentElement.lang = locale;
  // }, [locale, isRtl]);

  return (
    <>
      <nav className="bg-primary border-b border-black/20 fixed top-0 z-10 h-16 w-full shadow-sm">
        <div className="mx-auto flex h-full max-w-6xl items-center px-4">
          <div
            className="flex h-full w-full items-center justify-between gap-3"
            // dir={isRtl ? "rtl" : "ltr"}
          >
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary-foreground/15 border border-primary-foreground/25">
                <Dumbbell className="size-4 text-primary-foreground" />
              </div>
              <span className="hidden text-lg font-bold tracking-tight text-primary-foreground sm:block">
                {nav.brandTitle}
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden items-center gap-1 md:flex">
              <Link to="/" className={navLinkClass}>
                <Home className="size-4" />
                <span>{nav.home}</span>
              </Link>

              <Link to="/workoutchart" className={navLinkClass}>
                <BarChart3 className="size-4" />
                <span>{nav.chart}</span>
              </Link>

              <Separator
                orientation="vertical"
                className="mx-2 h-5 bg-primary-foreground/25"
              />

              <LanguagePicker />

              <ThemePicker />

              <div className="relative">
                <ShamsiCalendar />
              </div>
            </div>

            {/* Mobile Controls */}
            <PhoneControls />
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
