// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { Separator } from "@/components/ui/separator";
// import { Button } from "@/components/ui/button";
// import { Menu, Home, BarChart3, Dumbbell } from "lucide-react";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
// import { getNavText } from "@/constants";
// import { Link } from "react-router-dom";
// import ShamsiCalendar from "@/utils/ShamsiCalendar";

// const PhoneControls = () => {
//   const { locale } = useLanguage();
//   const nav = getNavText(locale);
//   const isRtl = locale === "fa";
//   return (
//     <div
//       className="flex items-center gap-2 md:hidden"
//       dir={isRtl ? "rtl" : "ltr"}
//     >
//       <Sheet>
//         <SheetTrigger asChild>
//           <button
//             className="inline-flex items-center justify-center size-9 rounded-md shrink-0 text-primary-foreground transition-colors hover:bg-black/20 active:bg-black/30"
//             aria-label={nav.mobileMenu}
//           >
//             <Menu className="size-6" />
//           </button>
//         </SheetTrigger>

//         <SheetContent
//           side={isRtl ? "left" : "right"}
//           className="gap-0 pt-6 bg-card border-border"
//           dir={isRtl ? "rtl" : "ltr"}
//         >
//           <SheetHeader className="px-4 pb-4 border-b border-border">
//             <SheetTitle className="flex items-center gap-2 text-primary">
//               <div className="flex size-7 items-center justify-center rounded-md bg-primary">
//                 <Dumbbell className="size-3.5 text-primary-foreground" />
//               </div>
//               {nav.brandTitle}
//             </SheetTitle>
//           </SheetHeader>

//           <div className="flex flex-col gap-1 px-3 py-4">
//             <Button
//               variant="ghost"
//               className="justify-start gap-3 h-10 px-3 font-medium text-secondary hover:text-secondary"
//               asChild
//             >
//               <Link to="/">
//                 <Home className="size-5 text-primary" />
//                 {nav.home}
//               </Link>
//             </Button>

//             <Button
//               variant="ghost"
//               className="justify-start gap-3 h-10 px-3 font-medium text-secondary hover:text-secondary"
//               asChild
//             >
//               <Link to="/workoutchart">
//                 <BarChart3 className="size-5 text-primary" />
//                 {nav.chart}
//               </Link>
//             </Button>
//           </div>

//           <Separator className="bg-border" />

//           <div className="flex items-center justify-between px-4 py-4">
//             <span className="text-sm font-medium text-secondary">
//               {nav.calendar}
//             </span>
//             <ShamsiCalendar />
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   );
// };

// export default PhoneControls;
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Menu, Home, BarChart3, Dumbbell } from "lucide-react";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
import { getNavText } from "@/constants";
import { Link } from "react-router-dom";
import ShamsiCalendar from "@/utils/ShamsiCalendar";
import { LanguagePicker } from "./LanguagePicker";
import { ThemePicker } from "./ThemePicker";

const PhoneControls = () => {
  const { locale } = useLanguage();
  const nav = getNavText(locale);
  const isRtl = locale === "fa";

  return (
    <div
      className="flex items-center gap-2 md:hidden"
      // dir={isRtl ? "rtl" : "ltr"}
    >
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="inline-flex items-center justify-center size-9 rounded-md shrink-0 text-primary-foreground transition-colors hover:bg-black/20 active:bg-black/30"
            aria-label={nav.mobileMenu}
          >
            <Menu className="size-6" />
          </button>
        </SheetTrigger>

        <SheetContent
          side={isRtl ? "left" : "right"}
          className="gap-0 pt-6 bg-card border-border"
          // dir={isRtl ? "rtl" : "ltr"}
        >
          <SheetHeader className="px-4 pb-4 border-b border-border">
            <SheetTitle className="flex items-center gap-2 text-primary">
              <div className="flex size-7 items-center justify-center rounded-md bg-primary">
                <Dumbbell className="size-3.5 text-primary-foreground" />
              </div>
              {nav.brandTitle}
            </SheetTitle>
          </SheetHeader>

          <div className="flex flex-col gap-1 px-3 py-4">
            <Button
              variant="ghost"
              className="justify-start gap-3 h-10 px-3 font-medium text-secondary hover:text-secondary"
              asChild
            >
              <Link to="/">
                <Home className="size-5 text-primary" />
                {nav.home}
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="justify-start gap-3 h-10 px-3 font-medium text-secondary hover:text-secondary"
              asChild
            >
              <Link to="/workoutchart">
                <BarChart3 className="size-5 text-primary" />
                {nav.chart}
              </Link>
            </Button>
          </div>

          <Separator className="bg-border" />

          <div className="flex items-center justify-between px-4 py-4">
            <span className="text-sm font-medium text-secondary">
              {nav.calendar}
            </span>
            <ShamsiCalendar />
          </div>

          <Separator className="bg-border" />

          {/* Pickers row */}
          <div className="flex items-center justify-between px-4 py-4">
            <span className="text-sm font-medium text-secondary">
              {nav.appearance ?? "Appearance"}
            </span>
            <div className="flex items-center gap-2">
              <LanguagePicker />
              <ThemePicker />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PhoneControls;
