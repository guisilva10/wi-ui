import { Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Badge } from "@/shared/ui/components/badge";
import { Button } from "@/shared/ui/components/button";

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

  const ctaElement = (
    <Button
      variant={highlighted ? "default" : "outline"}
      size="lg"
      className="w-full"
      onClick={cta.onClick}
    >
      {cta.label}
    </Button>
  );

  return (
    <div
      className={cn(
        "border-border bg-card relative flex flex-col rounded-xl border p-6 shadow-sm transition-transform duration-200",
        highlighted &&
          "border-primary ring-primary scale-[1.02] shadow-lg ring-2",
        className,
      )}
      {...props}
    >
      {/* Badge topo */}
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant={highlighted ? "default" : "secondary"}>{badge}</Badge>
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
          <span
            className={cn(
              "text-4xl font-extrabold tracking-tight",
              highlighted ? "text-primary" : "text-foreground",
            )}
          >
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
              <Badge variant="success" className="text-xs">
                -{discountPercent}%
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* CTA */}
      {cta.href ? (
        <a href={cta.href} className="mb-6 block">
          {ctaElement}
        </a>
      ) : (
        <div className="mb-6">{ctaElement}</div>
      )}

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
