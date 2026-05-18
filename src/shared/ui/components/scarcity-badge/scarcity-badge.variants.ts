import { cva } from "class-variance-authority";

export const scarcityBadgeVariants = cva(
  "inline-flex flex-col gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium",
  {
    variants: {
      variant: {
        default:
          "border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300",
        critical:
          "border-destructive/40 bg-destructive/10 text-destructive animate-pulse",
        soldout:
          "border-border bg-muted text-muted-foreground line-through opacity-60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const scarcityBarVariants = cva(
  "h-1.5 rounded-full transition-all duration-500",
  {
    variants: {
      variant: {
        default: "bg-amber-500",
        critical: "bg-destructive",
        soldout: "bg-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
