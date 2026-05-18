import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import {
  scarcityBadgeVariants,
  scarcityBarVariants,
} from "./scarcity-badge.variants";

interface ScarcityBadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scarcityBadgeVariants> {
  total: number;
  remaining: number;
  showBar?: boolean;
  label?: string;
  soldoutLabel?: string;
}

function ScarcityBadge({
  total,
  remaining,
  variant,
  showBar = true,
  label,
  soldoutLabel = "Esgotado",
  className,
  ...props
}: ScarcityBadgeProps) {
  const isSoldout = remaining <= 0;
  const percentRemaining = Math.min(100, (remaining / total) * 100);
  const percentSold = 100 - percentRemaining;

  const autoVariant = isSoldout
    ? "soldout"
    : percentRemaining <= 20
      ? "critical"
      : "default";

  const resolvedVariant = variant ?? autoVariant;

  const defaultLabel = isSoldout
    ? soldoutLabel
    : `Restam apenas ${remaining} ${remaining === 1 ? "vaga" : "vagas"}`;

  return (
    <div
      role="status"
      aria-label={label ?? defaultLabel}
      className={cn(
        scarcityBadgeVariants({ variant: resolvedVariant }),
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-1.5">
        {!isSoldout && (
          <span aria-hidden className="text-base leading-none">
            🔥
          </span>
        )}
        <span>{label ?? defaultLabel}</span>
      </div>

      {showBar && (
        <div className="bg-muted w-full overflow-hidden rounded-full">
          <div
            className={cn(scarcityBarVariants({ variant: resolvedVariant }))}
            style={{ width: `${percentSold}%` }}
            aria-hidden
          />
        </div>
      )}

      {showBar && !isSoldout && (
        <p className="text-xs opacity-70">
          {Math.round(percentSold)}% já preenchido
        </p>
      )}
    </div>
  );
}

export { ScarcityBadge, type ScarcityBadgeProps };
