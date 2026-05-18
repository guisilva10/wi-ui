import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-current border-t-transparent",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-6",
        lg: "size-8",
        xl: "size-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface SpinnerProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

function Spinner({
  className,
  size,
  label = "Carregando...",
  ...props
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Spinner, spinnerVariants, type SpinnerProps };
