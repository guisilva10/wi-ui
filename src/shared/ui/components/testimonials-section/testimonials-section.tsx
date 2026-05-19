import Image from "next/image";
import { cn } from "@/lib/cn";
import { Marquee } from "@/shared/ui/components/marquee/marquee";

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
  layout?: "grid" | "marquee";
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
            "size-3.5",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted",
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

function TestimonialCard({
  item,
  fixed,
}: {
  item: TestimonialItem;
  fixed?: boolean;
}) {
  return (
    <figure
      className={cn(
        "border-border/60 bg-card/80 hover:border-border hover:bg-card group relative flex flex-col gap-4 rounded-xl border p-5 shadow-sm backdrop-blur-sm transition-all duration-300",
        fixed && "w-[320px] shrink-0 sm:w-[360px]",
      )}
    >
      {item.rating !== undefined && <StarRating rating={item.rating} />}

      <blockquote className="flex-1">
        <p className="text-foreground/90 text-sm leading-relaxed">
          &ldquo;{item.quote}&rdquo;
        </p>
      </blockquote>

      <figcaption className="border-border/50 flex items-center gap-3 border-t pt-4">
        {item.avatar ? (
          <Image
            src={item.avatar}
            alt={item.author}
            width={36}
            height={36}
            className="ring-border/50 size-9 rounded-full object-cover ring-1"
            unoptimized={item.avatar.startsWith("http")}
          />
        ) : (
          <div className="bg-foreground/5 text-foreground/60 border-border/50 flex size-9 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
            {item.author
              .split(" ")
              .slice(0, 2)
              .map((n) => n[0])
              .join("")}
          </div>
        )}
        <div>
          <p className="text-foreground text-sm font-medium">{item.author}</p>
          {(item.role ?? item.company) && (
            <p className="text-muted-foreground text-xs">
              {[item.role, item.company].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </figcaption>
    </figure>
  );
}

function TestimonialsSection({
  eyebrow,
  title,
  description,
  testimonials,
  layout = "marquee",
  columns = 3,
  className,
  ...props
}: TestimonialsSectionProps) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
  }[columns];

  const half = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, half);
  const row2 = testimonials.slice(half);

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
      </div>

      {layout === "marquee" ? (
        <div className="relative flex flex-col gap-4 overflow-hidden">
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r sm:w-32" />
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l sm:w-32" />

          <Marquee pauseOnHover className="[--duration:50s] [--gap:1rem]">
            {row1.map((item, i) => (
              <TestimonialCard key={i} item={item} fixed />
            ))}
          </Marquee>

          {row2.length > 0 && (
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:55s] [--gap:1rem]"
            >
              {row2.map((item, i) => (
                <TestimonialCard key={i} item={item} fixed />
              ))}
            </Marquee>
          )}
        </div>
      ) : (
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className={cn("grid grid-cols-1 gap-6", colClass)}>
            {testimonials.map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export {
  TestimonialsSection,
  type TestimonialsSectionProps,
  type TestimonialItem,
};
