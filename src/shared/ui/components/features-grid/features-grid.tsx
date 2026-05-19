import { cn } from "@/lib/cn";

interface FeatureItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface FeaturesGridProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  features: FeatureItem[];
  columns?: 2 | 3 | 4;
}

function FeaturesGrid({
  eyebrow,
  title,
  description,
  features,
  columns = 3,
  className,
  ...props
}: FeaturesGridProps) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

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

        <div className={cn("grid grid-cols-1 gap-6", colClass)}>
          {features.map((feature, i) => (
            <div
              key={i}
              className="group border-border/60 bg-muted/40 hover:border-border hover:bg-muted/70 flex flex-col gap-4 rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1"
            >
              {feature.icon && (
                <div className="border-foreground/10 bg-foreground/5 text-foreground/70 group-hover:bg-foreground/10 flex size-10 items-center justify-center rounded-lg border transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
              )}
              <div>
                <h3 className="text-foreground text-lg font-semibold tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground mt-1.5 text-sm leading-[1.7]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FeaturesGrid, type FeaturesGridProps, type FeatureItem };
