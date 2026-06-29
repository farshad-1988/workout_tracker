// // // import { useTheme } from "@/shared/contexts/themeContext/hook/useTheme";
// // // import {
// // //   Select,
// // //   SelectTrigger,
// // //   SelectValue,
// // //   SelectContent,
// // //   SelectItem,
// // // } from "@/components/ui/select";
// // // import type { Theme } from "@/shared/contexts/themeContext/type/type";
// // // export function ThemePicker() {
// // //   const { theme, setTheme } = useTheme();

// // //   const themes: Theme[] = ["blue", "green", "purple", "orange", "red", "pink"];

// // //   return (
// // //     <Select value={theme} onValueChange={(value) => setTheme(value as Theme)}>
// // //       <SelectTrigger className="w-36">
// // //         <SelectValue />
// // //       </SelectTrigger>

// // //       <SelectContent>
// // //         {themes.map((t) => (
// // //           <SelectItem key={t} value={t}>
// // //             <span className="flex items-center gap-2 capitalize">
// // //               <span
// // //                 className="inline-block h-3 w-3 rounded-full"
// // //                 style={{ background: t }}
// // //               />
// // //               {t}
// // //             </span>
// // //           </SelectItem>
// // //         ))}
// // //       </SelectContent>
// // //     </Select>
// // //   );
// // // }
// // import { useTheme } from "@/shared/contexts/themeContext/hook/useTheme";
// // import type { Theme } from "@/shared/contexts/themeContext/type/type";
// // import {
// //   Popover,
// //   PopoverTrigger,
// //   PopoverContent,
// // } from "@/components/ui/popover";

// // const THEMES: { name: Theme; hex: string; label: string }[] = [
// //   { name: "blue", hex: "#3B82F6", label: "Blue" },
// //   { name: "green", hex: "#22C55E", label: "Green" },
// //   { name: "purple", hex: "#A855F7", label: "Purple" },
// //   { name: "orange", hex: "#F97316", label: "Orange" },
// //   { name: "red", hex: "#EF4444", label: "Red" },
// //   { name: "pink", hex: "#EC4899", label: "Pink" },
// // ];

// // export function ThemePicker() {
// //   const { theme, setTheme } = useTheme();
// //   const active = THEMES.find((t) => t.name === theme) ?? THEMES[0];

// //   return (
// //     <Popover>
// //       <PopoverTrigger asChild>
// //         <button
// //           className="group flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
// //           title="Change theme"
// //           aria-label="Change theme"
// //         >
// //           {/* Render current theme color as a split-circle */}
// //           <span className="relative flex h-4 w-4 overflow-hidden rounded-full">
// //             <span
// //               className="absolute inset-0"
// //               style={{ background: active.hex }}
// //             />
// //             <span
// //               className="absolute inset-0 left-1/2"
// //               style={{
// //                 background: `color-mix(in srgb, ${active.hex} 40%, white)`,
// //               }}
// //             />
// //           </span>
// //         </button>
// //       </PopoverTrigger>

// //       <PopoverContent
// //         align="end"
// //         sideOffset={8}
// //         className="w-auto p-2 rounded-xl shadow-lg"
// //       >
// //         <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
// //           Theme
// //         </p>
// //         <div className="grid grid-cols-3 gap-1">
// //           {THEMES.map(({ name, hex, label }) => {
// //             const isActive = theme === name;
// //             return (
// //               <button
// //                 key={name}
// //                 onClick={() => setTheme(name)}
// //                 title={label}
// //                 className={[
// //                   "group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors",
// //                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
// //                   isActive
// //                     ? "bg-accent text-accent-foreground"
// //                     : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
// //                 ].join(" ")}
// //               >
// //                 <span
// //                   className="relative flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-100 group-hover:scale-110"
// //                   style={{ background: hex }}
// //                 >
// //                   {isActive && (
// //                     <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
// //                   )}
// //                 </span>
// //                 <span className="capitalize">{label}</span>
// //               </button>
// //             );
// //           })}
// //         </div>
// //       </PopoverContent>
// //     </Popover>
// //   );
// // }
// import { useTheme } from "@/shared/contexts/themeContext/hook/useTheme";
// import type { Theme } from "@/shared/contexts/themeContext/type/type";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Paintbrush } from "lucide-react";

// const THEMES: { name: Theme; hex: string; label: string }[] = [
//   { name: "blue", hex: "#3B82F6", label: "Blue" },
//   { name: "green", hex: "#22C55E", label: "Green" },
//   { name: "purple", hex: "#A855F7", label: "Purple" },
//   { name: "orange", hex: "#F97316", label: "Orange" },
//   { name: "red", hex: "#EF4444", label: "Red" },
//   { name: "pink", hex: "#EC4899", label: "Pink" },
// ];

// export function ThemePicker() {
//   const { theme, setTheme } = useTheme();
//   const active = THEMES.find((t) => t.name === theme) ?? THEMES[0];

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <button
//           className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//           style={{
//             boxShadow: `0 0 0 0px ${active.hex}`,
//           }}
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.boxShadow = `0 0 0 2px ${active.hex}55`)
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.boxShadow = `0 0 0 0px ${active.hex}`)
//           }
//           title="Change theme"
//           aria-label="Change theme"
//         >
//           <Paintbrush
//             size={16}
//             className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-[-8deg]"
//             style={{ color: active.hex }}
//             strokeWidth={2}
//           />
//         </button>
//       </PopoverTrigger>

//       <PopoverContent
//         align="end"
//         sideOffset={8}
//         className="w-auto p-2.5 rounded-2xl shadow-xl border border-border"
//       >
//         <p className="mb-2.5 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
//           Theme
//         </p>
//         <div className="grid grid-cols-3 gap-1">
//           {THEMES.map(({ name, hex, label }) => {
//             const isActive = theme === name;
//             return (
//               <button
//                 key={name}
//                 onClick={() => setTheme(name)}
//                 title={label}
//                 className={[
//                   "group/item flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-150",
//                   "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
//                   isActive ? "bg-accent" : "hover:bg-accent/40",
//                 ].join(" ")}
//               >
//                 {/* Swatch */}
//                 <span
//                   className="relative flex h-4 w-4 flex-shrink-0 rounded-full transition-transform duration-150 group-hover/item:scale-110"
//                   style={{
//                     background: hex,
//                     boxShadow: isActive
//                       ? `0 0 0 2px white, 0 0 0 3.5px ${hex}`
//                       : "none",
//                   }}
//                 >
//                   {isActive && (
//                     <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-white/90" />
//                   )}
//                 </span>

//                 {/* Label */}
//                 <span
//                   className={[
//                     "capitalize leading-none transition-all duration-150",
//                     isActive
//                       ? "text-sm font-bold"
//                       : "text-xs font-medium text-muted-foreground group-hover/item:text-sm group-hover/item:font-semibold group-hover/item:text-foreground",
//                   ].join(" ")}
//                   style={isActive ? { color: hex } : {}}
//                 >
//                   {label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// }
import { useTheme } from "@/shared/contexts/themeContext/hook/useTheme";
import type { Theme } from "@/shared/contexts/themeContext/type/type";
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
import { Paintbrush } from "lucide-react";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";

const THEMES: { name: Theme; hex: string; label: string }[] = [
  { name: "blue", hex: "#3B82F6", label: "Blue" },
  { name: "green", hex: "#22C55E", label: "Green" },
  { name: "purple", hex: "#A855F7", label: "Purple" },
  { name: "orange", hex: "#F97316", label: "Orange" },
  { name: "red", hex: "#EF4444", label: "Red" },
  { name: "pink", hex: "#EC4899", label: "Pink" },
];

function ThemeList({
  theme,
  setTheme,
  onSelect,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  onSelect?: () => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {THEMES.map(({ name, hex, label }) => {
        const isActive = theme === name;
        return (
          <button
            key={name}
            onClick={() => {
              setTheme(name);
              onSelect?.();
            }}
            className={[
              "group/item flex items-center gap-2 rounded-xl px-3 py-2.5 transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive ? "bg-accent" : "hover:bg-accent/40",
            ].join(" ")}
          >
            <span
              className="relative flex h-4 w-4 flex-shrink-0 rounded-full transition-transform duration-150 group-hover/item:scale-110"
              style={{
                background: hex,
                boxShadow: isActive
                  ? `0 0 0 2px white, 0 0 0 3.5px ${hex}`
                  : "none",
              }}
            >
              {isActive && (
                <span className="absolute inset-0 m-auto h-1.5 w-1.5 rounded-full bg-white/90" />
              )}
            </span>
            <span
              className={[
                "capitalize leading-none transition-all duration-150",
                isActive
                  ? "text-sm font-bold"
                  : "text-xs font-medium text-muted-foreground group-hover/item:text-sm group-hover/item:font-semibold group-hover/item:text-foreground",
              ].join(" ")}
              style={isActive ? { color: hex } : {}}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TriggerButton({
  activeHex,
  ...props
}: { activeHex: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background transition-all duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = `0 0 0 2px ${activeHex}55`)
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
      title="Change theme"
      aria-label="Change theme"
    >
      <Paintbrush
        size={20}
        strokeWidth={2}
        className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-[8deg]"
        style={{ color: activeHex }}
      />
    </button>
  );
}

export function ThemePicker() {
  const { theme, setTheme } = useTheme();
  const active = THEMES.find((t) => t.name === theme) ?? THEMES[0];
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <TriggerButton activeHex={active.hex} />
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl pb-8 text-center pt-2"
        >
          <SheetHeader className="mb-4 px-1">
            <SheetTitle className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              Theme
            </SheetTitle>
          </SheetHeader>
          <ThemeList theme={theme} setTheme={setTheme} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TriggerButton activeHex={active.hex} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-auto p-2.5 rounded-2xl shadow-xl border border-border"
      >
        <p className="mb-2.5 pt-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground text-center">
          Theme
        </p>
        <ThemeList theme={theme} setTheme={setTheme} />
      </PopoverContent>
    </Popover>
  );
}
