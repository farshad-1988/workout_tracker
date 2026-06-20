// import { Progress } from "@/components/ui/progress";

// export type LoadingOverlayProps = {
//   isLoading: boolean;
//   label: string;
// };

// export function LoadingOverlay({ isLoading, label }: LoadingOverlayProps) {
//   if (!isLoading) return null;

//   return (
//     <div className="bg-background/80 absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl backdrop-blur-sm">
//       <Progress className="h-1.5 w-40 max-w-[80%]" value={66} />
//       <span className="text-muted-foreground text-sm font-medium">{label}</span>
//     </div>
//   );
// }
import { Progress } from "@/components/ui/progress";

export type LoadingOverlayProps = {
  isLoading: boolean;
  label: string;
};

export function LoadingOverlay({ isLoading, label }: LoadingOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="bg-background/80 absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 rounded-2xl backdrop-blur-sm">
      <Progress
        className="h-1.5 w-40 max-w-[80%] bg-border [&>div]:bg-primary"
        value={66}
      />
      <span className="text-secondary text-sm font-medium">{label}</span>
    </div>
  );
}
