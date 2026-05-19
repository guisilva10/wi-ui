import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface PricingFeature {
  text: string;
  included?: boolean;
}

interface PricingCardCta {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  price: string;
  originalPrice?: string;
  period?: string;
  features: (string | PricingFeature)[];
  badge?: string;
  highlighted?: boolean;
  cta: PricingCardCta;
}

function PricingCard({
  title,
  description,
  price,
  originalPrice,
  period = "/mês",
  features,
  badge,
  highlighted = false,
  cta,
  className,
  ...props
}: PricingCardProps) {
  const discountPercent = originalPrice
    ? Math.round(
        (1 -
          parseFloat(price.replace(/[^0-9.]/g, "")) /
            parseFloat(originalPrice.replace(/[^0-9.]/g, ""))) *
          100,
      )
    : null;

  const normalizedFeatures: PricingFeature[] = features.map((f) =>
    typeof f === "string" ? { text: f, included: true } : f,
  );

  const ctaClass = cn(
    "inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200",
    highlighted
      ? "bg-foreground text-background hover:bg-foreground/90"
      : "border border-border bg-transparent text-foreground hover:bg-muted",
  );

  const ctaElement = cta.href ? (
    <a href={cta.href} className={ctaClass}>
      {cta.label}
    </a>
  ) : (
    <button onClick={cta.onClick} className={ctaClass}>
      {cta.label}
    </button>
  );

  return (
    <div
      className={cn(
        "border-border bg-card relative flex flex-col rounded-xl border p-6 shadow-sm transition-transform duration-200",
        highlighted &&
          "border-foreground ring-foreground scale-[1.02] shadow-lg ring-2",
        className,
      )}
      {...props}
    >
      {/* Badge topo */}
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
              highlighted
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground",
            )}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-foreground text-lg font-bold">{title}</h3>
        {description && (
          <p className="text-muted-foreground mt-0.5 text-sm">{description}</p>
        )}
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <div className="flex items-end gap-2">
          <span className="text-foreground text-4xl font-extrabold tracking-tight">
            {price}
          </span>
          {period && (
            <span className="text-muted-foreground mb-1 text-sm">{period}</span>
          )}
        </div>
        {originalPrice && (
          <div className="mt-1 flex items-center gap-2">
            <span className="text-muted-foreground text-sm line-through">
              {originalPrice}
            </span>
            {discountPercent !== null && discountPercent > 0 && (
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                -{discountPercent}%
              </span>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mb-6">{ctaElement}</div>

      {/* Features */}
      <ul className="flex-1 space-y-2.5">
        {normalizedFeatures.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5">
            {feature.included !== false ? (
              <Check
                className="mt-0.5 size-4 shrink-0 text-emerald-500"
                aria-hidden
              />
            ) : (
              <X
                className="text-muted-foreground/50 mt-0.5 size-4 shrink-0"
                aria-hidden
              />
            )}
            <span
              className={cn(
                "text-sm",
                feature.included === false
                  ? "text-muted-foreground line-through"
                  : "text-foreground",
              )}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export {
  PricingCard,
  type PricingCardProps,
  type PricingFeature,
  type PricingCardCta,
};
