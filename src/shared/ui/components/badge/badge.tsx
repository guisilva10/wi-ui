import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { badgeVariants } from "./badge.variants";

interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, type BadgeProps };
