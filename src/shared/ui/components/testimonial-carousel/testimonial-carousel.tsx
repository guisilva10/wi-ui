"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/cn";

interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
  rating?: number;
}

type TestimonialVariant = "card" | "bubble" | "minimal";

interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  variant?: TestimonialVariant;
  showControls?: boolean;
  showDots?: boolean;
}

function InlineAvatar({
  src,
  name,
  size,
}: {
  src?: string;
  name: string;
  size: "sm" | "md";
}) {
  const sizeClass = size === "md" ? "size-10" : "size-8";
  const textClass = size === "md" ? "text-sm" : "text-xs";
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        sizeClass,
        "bg-muted shrink-0 overflow-hidden rounded-full",
      )}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          className="size-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = `<span class="flex size-full items-center justify-center ${textClass} font-medium text-muted-foreground">${initials}</span>`;
            }
          }}
        />
      ) : (
        <span
          className={cn(
            "text-muted-foreground flex size-full items-center justify-center font-medium",
            textClass,
          )}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} de 5 estrelas`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
  variant = "card",
  showControls = true,
  showDots = true,
  className,
  ...props
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number, dir: 1 | -1) => {
      setDirection(dir);
      setCurrent((index + testimonials.length) % testimonials.length);
    },
    [testimonials.length],
  );

  const next = useCallback(() => {
    goTo(current + 1, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1, -1);
  }, [current, goTo]);

  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;
    intervalRef.current = setInterval(next, interval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, interval, next, testimonials.length]);

  const t = testimonials[current];
  if (!t) return null;

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  const renderContent = () => {
    if (variant === "minimal") {
      return (
        <div className="space-y-3 text-center">
          {t.rating && <StarRating rating={t.rating} />}
          <p className="text-foreground text-base italic">
            &ldquo;{t.content}&rdquo;
          </p>
          <div>
            <p className="text-foreground font-semibold">{t.name}</p>
            {(t.role ?? t.company) && (
              <p className="text-muted-foreground text-sm">
                {[t.role, t.company].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
      );
    }

    if (variant === "bubble") {
      return (
        <div className="flex gap-3">
          <InlineAvatar src={t.avatar} name={t.name} size="md" />
          <div className="flex-1 space-y-1">
            <div className="bg-muted relative rounded-2xl rounded-tl-none px-4 py-3">
              {t.rating && (
                <div className="mb-1">
                  <StarRating rating={t.rating} />
                </div>
              )}
              <p className="text-foreground text-sm">{t.content}</p>
            </div>
            <div className="pl-2">
              <p className="text-foreground text-sm font-semibold">{t.name}</p>
              {(t.role ?? t.company) && (
                <p className="text-muted-foreground text-xs">
                  {[t.role, t.company].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-card border-border space-y-4 rounded-xl border p-6 shadow-sm">
        <span
          aria-hidden
          className="text-foreground block text-4xl leading-none font-bold opacity-20"
        >
          &ldquo;
        </span>
        {t.rating && <StarRating rating={t.rating} />}
        <p className="text-foreground leading-relaxed">{t.content}</p>
        <div className="flex items-center gap-3 pt-2">
          <InlineAvatar src={t.avatar} name={t.name} size="sm" />
          <div>
            <p className="text-foreground font-semibold">{t.name}</p>
            {(t.role ?? t.company) && (
              <p className="text-muted-foreground text-sm">
                {[t.role, t.company].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("space-y-4", className)} {...props}>
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {(showControls || showDots) && testimonials.length > 1 && (
        <div className="flex items-center justify-between">
          {showControls ? (
            <>
              <button
                onClick={prev}
                aria-label="Depoimento anterior"
                className="border-border hover:bg-muted rounded-full border p-1.5 transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
            </>
          ) : (
            <span />
          )}

          {showDots && (
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  aria-label={`Ir para depoimento ${i + 1}`}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === current
                      ? "bg-foreground w-4"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/60 w-1.5",
                  )}
                />
              ))}
            </div>
          )}

          {showControls ? (
            <button
              onClick={next}
              aria-label="Próximo depoimento"
              className="border-border hover:bg-muted rounded-full border p-1.5 transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          ) : (
            <span />
          )}
        </div>
      )}
    </div>
  );
}

export {
  TestimonialCarousel,
  type TestimonialCarouselProps,
  type Testimonial,
  type TestimonialVariant,
};
