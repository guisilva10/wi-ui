import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Spinner } from "@/shared/ui/components/spinner";
import { buttonVariants } from "./button.variants";

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
}

function Button({
  className,
  variant,
  size,
  isLoading = false,
  loadingText,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled ?? isLoading}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {isLoading && <Spinner size="sm" aria-hidden />}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
}

export { Button, type ButtonProps };
