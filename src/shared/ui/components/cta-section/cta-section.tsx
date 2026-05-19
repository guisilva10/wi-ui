import { cn } from "@/lib/cn";

interface CTASectionCta {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline";
}

interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  ctas?: CTASectionCta[];
  variant?: "default" | "bordered" | "filled";
}

function CTASection({
  eyebrow,
  title,
  description,
  ctas = [],
  variant = "default",
  className,
  ...props
}: CTASectionProps) {
  return (
    <section className={cn("w-full py-20 md:py-28", className)} {...props}>
      <div className="mx-auto w-full max-w-5xl px-6">
        {variant === "default" && (
          <div className="relative mb-8 flex items-center justify-center">
            <div className="bg-border h-px w-full" />
            <div className="bg-border absolute size-1.5 rounded-full" />
          </div>
        )}

        <div
          className={cn(
            "flex flex-col items-center rounded-2xl px-8 py-16 text-center md:px-16",
            variant === "default" && "bg-muted/50",
            variant === "bordered" &&
              "border-foreground/20 bg-foreground/[0.02] border shadow-[inset_0_0_0_1px_oklch(0_0_0/0.06)]",
            variant === "filled" &&
              "from-foreground/90 to-foreground bg-gradient-to-b",
          )}
        >
          {eyebrow && (
            <p
              className={cn(
                "mb-3 text-sm font-medium tracking-widest uppercase",
                variant === "filled"
                  ? "text-background/70"
                  : "text-muted-foreground",
              )}
            >
              {eyebrow}
            </p>
          )}

          <h2
            className={cn(
              "max-w-2xl font-black tracking-tight",
              "text-4xl sm:text-5xl md:text-6xl",
              variant === "filled" ? "text-background" : "text-foreground",
            )}
          >
            {title}
          </h2>

          {description && (
            <p
              className={cn(
                "mt-4 max-w-xl text-xl",
                variant === "filled"
                  ? "text-background/70"
                  : "text-muted-foreground",
              )}
            >
              {description}
            </p>
          )}

          {ctas.length > 0 && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {ctas.map((cta, i) => {
                const isPrimary = i === 0 && cta.variant !== "outline";
                const buttonClass = cn(
                  "inline-flex h-12 items-center justify-center rounded-lg px-8 text-sm font-semibold transition-all duration-200",
                  variant === "filled"
                    ? isPrimary
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "border border-background/30 bg-transparent text-background hover:bg-background/10"
                    : isPrimary
                      ? "bg-foreground text-background hover:bg-foreground/90 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                      : "border border-border bg-transparent text-foreground hover:bg-muted",
                );
                if (cta.href) {
                  return (
                    <a key={i} href={cta.href} className={buttonClass}>
                      {cta.label}
                    </a>
                  );
                }
                return (
                  <button key={i} onClick={cta.onClick} className={buttonClass}>
                    {cta.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export { CTASection, type CTASectionProps, type CTASectionCta };
