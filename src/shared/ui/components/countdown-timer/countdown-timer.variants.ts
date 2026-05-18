import { cva } from "class-variance-authority";

export const countdownVariants = cva(
  "inline-flex items-center gap-1 font-mono font-bold tabular-nums",
  {
    variants: {
      variant: {
        default: "text-foreground",
        urgent: "text-destructive animate-pulse",
        minimal: "text-muted-foreground text-sm",
      },
      size: {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-4xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export const digitBlockVariants = cva("flex flex-col items-center gap-0.5", {
  variants: {
    variant: {
      default: "",
      urgent: "",
      minimal: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
