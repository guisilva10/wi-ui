"use client";

import {
  TestimonialCarousel,
  type TestimonialVariant,
} from "@/shared/ui/components/testimonial-carousel";

const TESTIMONIALS = [
  {
    name: "Ana Lima",
    role: "CEO",
    company: "TechCorp",
    content:
      "Produto incrível, transformou completamente nossa operação. Recomendo para qualquer empresa que queira escalar.",
    rating: 5,
  },
  {
    name: "Carlos Mendes",
    role: "Desenvolvedor",
    company: "Startup XYZ",
    content:
      "A qualidade dos componentes é excelente. Economizei semanas de desenvolvimento.",
    rating: 5,
  },
  {
    name: "Julia Ferreira",
    role: "Designer",
    content: "Interface elegante e muito fácil de customizar. Adorei!",
    rating: 4,
  },
];

export function TestimonialCarouselDemo({
  variant,
}: {
  variant: TestimonialVariant;
}) {
  return (
    <TestimonialCarousel
      testimonials={TESTIMONIALS}
      variant={variant}
      autoPlay
      interval={4000}
      showControls={variant !== "minimal"}
    />
  );
}
