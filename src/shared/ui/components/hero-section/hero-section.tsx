import { cn } from "@/lib/cn";

interface HeroSectionCta {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "outline";
}

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  badge?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  ctas?: HeroSectionCta[];
  eyebrow?: string;
  align?: "left" | "center";
}

function HeroSection({
  badge,
  title,
  titleHighlight,
  description,
  ctas = [],
  eyebrow,
  align = "center",
  className,
  ...props
}: HeroSectionProps) {
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden py-32 md:py-40 lg:py-48",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.9_0_0/0.5),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,oklch(0.3_0_0/0.4),transparent)]"
      />

      <div
        className={cn(
          "relative mx-auto w-full max-w-5xl px-6",
          isCenter && "flex flex-col items-center text-center",
        )}
      >
        {eyebrow && (
          <p
            className={cn(
              "text-muted-foreground mb-4 text-sm font-medium tracking-widest uppercase",
            )}
          >
            {eyebrow}
          </p>
        )}

        {badge && (
          <div
            className={cn(
              "border-foreground/15 bg-foreground/5 text-muted-foreground mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium",
            )}
          >
            <span
              aria-hidden
              className="bg-foreground/40 size-1.5 animate-pulse rounded-full"
            />
            {badge}
          </div>
        )}

        <h1
          className={cn(
            "text-foreground leading-[1.05] font-black tracking-[-0.04em]",
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
            isCenter && "max-w-4xl",
          )}
        >
          {titleHighlight ? (
            <>
              {title}{" "}
              <span className="relative inline-block">
                <span className="relative z-10">{titleHighlight}</span>
                <span
                  aria-hidden
                  className="from-foreground/60 to-foreground/20 absolute right-0 bottom-0 left-0 h-[0.08em] rounded-full bg-gradient-to-r"
                />
              </span>
            </>
          ) : (
            title
          )}
        </h1>

        <p
          className={cn(
            "text-muted-foreground mt-6 text-lg md:text-xl",
            isCenter ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {description}
        </p>

        {ctas.length > 0 && (
          <div
            className={cn(
              "mt-10 flex flex-wrap gap-4",
              isCenter && "justify-center",
            )}
          >
            {ctas.map((cta, i) => {
              const isPrimary = i === 0 && cta.variant !== "outline";
              const buttonClass = cn(
                "group inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold transition-all duration-200",
                isPrimary
                  ? "bg-foreground text-background shadow-sm hover:bg-foreground/90 hover:-translate-y-0.5 hover:shadow-md"
                  : "border border-border bg-transparent text-foreground hover:bg-muted",
              );
              const content = (
                <>
                  {cta.label}
                  {isPrimary && (
                    <span
                      aria-hidden
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  )}
                </>
              );

              if (cta.href) {
                return (
                  <a key={i} href={cta.href} className={buttonClass}>
                    {content}
                  </a>
                );
              }
              return (
                <button key={i} onClick={cta.onClick} className={buttonClass}>
                  {content}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export { HeroSection, type HeroSectionProps, type HeroSectionCta };
