// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import type { AppLocale } from "@/constants";
// import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";

// const LOCALES: {
//   value: AppLocale;
//   label: string;
//   native: string;
//   flag: string;
// }[] = [
//   { value: "en", label: "English", native: "English", flag: "🇺🇸" },
//   { value: "fa", label: "Persian", native: "فارسی", flag: "🇮🇷" },
// ];

// export function LanguagePicker() {
//   const { locale, setLocale } = useLanguage();
//   const active = LOCALES.find((l) => l.value === locale) ?? LOCALES[0];

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <button
//           className="group flex h-9 items-center gap-1.5 rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 px-3 text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//           aria-label="Change language"
//         >
//           {/* <Languages
//             size={15}
//             strokeWidth={2}
//             className="shrink-0 opacity-80 transition-transform duration-200 group-hover:scale-110"
//           /> */}
//           <span className="text-xs font-semibold tracking-wide">
//             {active.value.toUpperCase()}
//           </span>
//         </button>
//       </PopoverTrigger>

//       <PopoverContent
//         align="end"
//         sideOffset={8}
//         className="w-auto p-2 rounded-2xl shadow-xl border border-border"
//       >
//         <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
//           Language
//         </p>
//         <div className="flex flex-col gap-0.5">
//           {LOCALES.map(({ value, native, flag }) => {
//             const isActive = locale === value;
//             return (
//               <button
//                 key={value}
//                 onClick={() => setLocale(value)}
//                 className={[
//                   "group/item flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-150",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
//                   isActive ? "bg-accent" : "hover:bg-accent/40",
//                 ].join(" ")}
//               >
//                 <span className="text-base leading-none transition-transform duration-150 group-hover/item:scale-110">
//                   {flag}
//                 </span>
//                 <span
//                   className={[
//                     "leading-none transition-all duration-150",
//                     isActive
//                       ? "text-sm font-bold text-foreground"
//                       : "text-xs font-medium text-muted-foreground group-hover/item:text-sm group-hover/item:font-semibold group-hover/item:text-foreground",
//                   ].join(" ")}
//                 >
//                   {native}
//                 </span>
//                 {isActive && (
//                   <span className="ml-auto h-1.5 w-1.5 rounded-full bg-foreground/60" />
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { AppLocale } from "@/constants";
import { useLanguage } from "@/shared/contexts/languageContext/hook/useLanguage";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { useNavigate } from "react-router-dom";

const LOCALES: {
  value: AppLocale;
  label: string;
  native: string;
  flag: string;
}[] = [
  { value: "en", label: "English", native: "English", flag: "🇺🇸" },
  { value: "fa", label: "Persian", native: "فارسی", flag: "🇮🇷" },
];

function LocaleList({
  locale,
  setLocale,
  onSelect,
}: {
  locale: AppLocale;
  setLocale: (v: AppLocale) => void;
  onSelect?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-2  py-2">
      {LOCALES.map(({ value, native, flag }) => {
        const isActive = locale === value;
        return (
          <button
            key={value}
            onClick={() => {
              setLocale(value);
              onSelect?.();
              navigate("/");
            }}
            className={[
              "group/item flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive ? "bg-accent" : "hover:bg-accent/40",
            ].join(" ")}
          >
            <span className="text-base leading-none transition-transform duration-150 group-hover/item:scale-110">
              {flag}
            </span>
            <span
              className={[
                "leading-none transition-all duration-150",
                isActive
                  ? "text-sm font-bold text-foreground"
                  : "text-xs font-medium text-muted-foreground group-hover/item:text-sm group-hover/item:font-semibold group-hover/item:text-foreground",
              ].join(" ")}
            >
              {native}
            </span>
            {isActive && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-foreground/60" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function TriggerButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string },
) {
  const { label, ...rest } = props;
  return (
    <button
      {...rest}
      className="group flex h-9 items-center gap-1.5 rounded-xl border border-primary-foreground/25 bg-primary-foreground/10 px-3 text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Change language"
    >
      <span className="text-xs font-semibold tracking-wide">{label}</span>
    </button>
  );
}

export function LanguagePicker() {
  const { locale, setLocale } = useLanguage();
  const active = LOCALES.find((l) => l.value === locale) ?? LOCALES[1];
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <TriggerButton label={active.value.toUpperCase()} />
        </SheetTrigger>
        <SheetContent side="bottom" className="rounded-t-2xl pb-8">
          <SheetHeader className="mb-4 px-1">
            <SheetTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground  text-center">
              Language
            </SheetTitle>
          </SheetHeader>
          <LocaleList locale={locale} setLocale={setLocale} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TriggerButton label={active.value.toUpperCase()} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-auto p-2 rounded-2xl shadow-xl border border-border"
      >
        <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground text-center">
          Language
        </p>
        <LocaleList locale={locale} setLocale={setLocale} />
      </PopoverContent>
    </Popover>
  );
}
