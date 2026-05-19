import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface PricingSectionFeature {
  text: string;
  included?: boolean;
}

interface PricingSectionPlan {
  name: string;
  description?: string;
  price: string;
  originalPrice?: string;
  period?: string;
  features: (string | PricingSectionFeature)[];
  badge?: string;
  highlighted?: boolean;
  cta: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

interface PricingSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  plans: PricingSectionPlan[];
}

function PricingSection({
  eyebrow,
  title,
  description,
  plans,
  className,
  ...props
}: PricingSectionProps) {
  return (
    <section className={cn("w-full py-24", className)} {...props}>
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="mb-16 flex flex-col items-center text-center">
          {eyebrow && (
            <p className="text-muted-foreground mb-3 text-sm font-medium tracking-widest uppercase">
              {eyebrow}
            </p>
          )}
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
              {description}
            </p>
          )}
        </div>

        <div
          className={cn(
            "grid grid-cols-1 gap-8",
            plans.length === 2 && "sm:grid-cols-2",
            plans.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {plans.map((plan, i) => {
            const normalizedFeatures: PricingSectionFeature[] =
              plan.features.map((f) =>
                typeof f === "string" ? { text: f, included: true } : f,
              );

            const discountPercent = plan.originalPrice
              ? Math.round(
                  (1 -
                    parseFloat(plan.price.replace(/[^0-9.]/g, "")) /
                      parseFloat(plan.originalPrice.replace(/[^0-9.]/g, ""))) *
                    100,
                )
              : null;

            const ctaClass = cn(
              "inline-flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200",
              plan.highlighted
                ? "bg-background text-foreground hover:bg-background/90"
                : "border border-border bg-transparent text-foreground hover:bg-muted",
            );

            return (
              <div
                key={i}
                className={cn(
                  "relative flex flex-col rounded-xl border p-8 shadow-sm transition-all duration-300 md:p-10",
                  plan.highlighted
                    ? "border-foreground/20 bg-foreground text-background ring-foreground/10 scale-[1.02] shadow-lg ring-1"
                    : "border-border/60 bg-card hover:border-border hover:shadow-md",
                )}
              >
                {plan.badge && (
                  <span
                    className={cn(
                      "absolute top-4 right-4 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      plan.highlighted
                        ? "border-background/20 bg-background/10 text-background"
                        : "border-foreground/20 bg-foreground/10 text-foreground",
                    )}
                  >
                    {plan.badge}
                  </span>
                )}

                <div>
                  <h3
                    className={cn(
                      "text-lg font-bold",
                      plan.highlighted ? "text-background" : "text-foreground",
                    )}
                  >
                    {plan.name}
                  </h3>
                  {plan.description && (
                    <p
                      className={cn(
                        "mt-1 text-sm",
                        plan.highlighted
                          ? "text-background/70"
                          : "text-muted-foreground",
                      )}
                    >
                      {plan.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 border-b border-current/10 pb-6">
                  <div className="flex items-end gap-1">
                    <span
                      className={cn(
                        "text-4xl font-extrabold tracking-tight",
                        plan.highlighted
                          ? "text-background"
                          : "text-foreground",
                      )}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={cn(
                          "mb-1 text-sm",
                          plan.highlighted
                            ? "text-background/70"
                            : "text-muted-foreground",
                        )}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <div className="mt-1.5 flex items-center gap-2">
                      <span
                        className={cn(
                          "text-sm line-through",
                          plan.highlighted
                            ? "text-background/50"
                            : "text-muted-foreground",
                        )}
                      >
                        {plan.originalPrice}
                      </span>
                      {discountPercent !== null && discountPercent > 0 && (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            plan.highlighted
                              ? "bg-background/15 text-background"
                              : "bg-foreground/10 text-foreground",
                          )}
                        >
                          -{discountPercent}%
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <ul className="mt-6 mb-8 flex-1 space-y-3">
                  {normalizedFeatures.map((feature, j) => (
                    <li
                      key={j}
                      className={cn(
                        "flex items-start gap-3",
                        feature.included === false && "opacity-40",
                      )}
                    >
                      {feature.included !== false && (
                        <span
                          className={cn(
                            "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full",
                            plan.highlighted
                              ? "bg-background/15"
                              : "bg-foreground/10",
                          )}
                        >
                          <Check
                            className={cn(
                              "size-2.5",
                              plan.highlighted
                                ? "text-background"
                                : "text-foreground/80",
                            )}
                            aria-hidden
                          />
                        </span>
                      )}
                      <span
                        className={cn(
                          "text-sm",
                          feature.included === false
                            ? "text-muted-foreground pl-7"
                            : plan.highlighted
                              ? "text-background/90"
                              : "text-foreground",
                        )}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.cta.href ? (
                  <a href={plan.cta.href} className={ctaClass}>
                    {plan.cta.label}
                  </a>
                ) : (
                  <button onClick={plan.cta.onClick} className={ctaClass}>
                    {plan.cta.label}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export {
  PricingSection,
  type PricingSectionProps,
  type PricingSectionPlan,
  type PricingSectionFeature,
};
