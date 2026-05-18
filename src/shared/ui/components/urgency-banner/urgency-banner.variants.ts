import { cva } from "class-variance-authority";

export const urgencyBannerVariants = cva(
  "w-full px-4 py-2.5 text-sm font-medium",
  {
    variants: {
      variant: {
        info: "bg-muted text-foreground border-b border-border",
        warning:
          "bg-amber-50 text-amber-900 border-b border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800",
        critical:
          "bg-destructive text-destructive-foreground border-b border-destructive/80",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);
