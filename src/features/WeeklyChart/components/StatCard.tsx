// import type { LucideIcon } from "lucide-react";

// import {
//   Card,
//   CardContent,
// } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// export type StatCardProps = {
//   icon: LucideIcon;
//   label: string;
//   value: string | number;
//   iconClassName?: string;
// };

// export function StatCard({ icon: Icon, label, value, iconClassName }: StatCardProps) {
//   return (
//     <Card className="border-border/60 shadow-sm transition-shadow hover:shadow-md">
//       <CardContent className="flex items-center justify-between gap-3 pt-6">
//         <div
//           className={cn(
//             "flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-12",
//             iconClassName ?? "bg-primary text-primary-foreground",
//           )}
//         >
//           <Icon className="size-5 sm:size-6" />
//         </div>
//         <div className="min-w-0 flex-1 text-end sm:text-start">
//           <p className="text-muted-foreground truncate text-sm font-medium">
//             {label}
//           </p>
//           <p className="text-foreground mt-1 text-xl font-bold sm:text-2xl">
//             {value}
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type StatCardProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconClassName?: string;
};

export function StatCard({
  icon: Icon,
  label,
  value,
  iconClassName,
}: StatCardProps) {
  return (
    <Card className="border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex items-center justify-between gap-3 pt-6">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-12",
            iconClassName ?? "bg-primary text-primary-foreground",
          )}
        >
          <Icon className="size-5 sm:size-6" />
        </div>
        <div className="min-w-0 flex-1 text-end sm:text-start">
          <p className="text-secondary truncate text-sm font-medium">{label}</p>
          <p className="text-primary-foreground mt-1 text-xl font-bold sm:text-2xl">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
