import Image from "next/image";
import { cn } from "@/lib/cn";

interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsSectionProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  testimonials: TestimonialItem[];
  columns?: 2 | 3;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} de 5 estrelas`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={cn(
            "size-4",
            i < rating
              ? "fill-foreground/70 text-foreground/70"
              : "fill-border text-border",
          )}
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialsSection({
  eyebrow,
  title,
  description,
  testimonials,
  columns = 3,
  className,
  ...props
}: TestimonialsSectionProps) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
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
          {testimonials.map((item, i) => (
            <figure
              key={i}
              className="border-border bg-card/50 hover:bg-muted/50 relative flex flex-col gap-4 rounded-xl border p-6 shadow-sm transition-colors"
            >
              <span
                aria-hidden
                className="text-foreground/10 pointer-events-none absolute -top-2 -left-1 text-[4rem] leading-none select-none"
              >
                &ldquo;
              </span>

              {item.rating !== undefined && <StarRating rating={item.rating} />}

              <blockquote className="relative flex-1">
                <p className="text-foreground text-base leading-[1.75] italic">
                  {item.quote}
                </p>
              </blockquote>

              <figcaption className="flex items-center gap-3">
                {item.avatar ? (
                  <Image
                    src={item.avatar}
                    alt={item.author}
                    width={40}
                    height={40}
                    className="ring-border size-10 rounded-full object-cover ring-1"
                    unoptimized={item.avatar.startsWith("http")}
                  />
                ) : (
                  <div className="border-border bg-muted text-muted-foreground ring-border flex size-10 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ring-1">
                    {item.author
                      .split(" ")
                      .slice(0, 2)
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div>
                  <p className="text-foreground text-sm font-semibold">
                    {item.author}
                  </p>
                  {(item.role ?? item.company) && (
                    <p className="text-muted-foreground text-xs">
                      {[item.role, item.company].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export {
  TestimonialsSection,
  type TestimonialsSectionProps,
  type TestimonialItem,
};
