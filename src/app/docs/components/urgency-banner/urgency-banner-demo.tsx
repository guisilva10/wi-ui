"use client";

import { useState } from "react";
import {
  UrgencyBanner,
  urgencyBannerVariants,
} from "@/shared/ui/components/urgency-banner";
import { type VariantProps } from "class-variance-authority";

type UrgencyBannerDemoProps = VariantProps<typeof urgencyBannerVariants>;

function getTwoHoursFromNow(): Date {
  return new Date(Date.now() + 2 * 60 * 60 * 1000);
}

export function UrgencyBannerDemo({ variant }: UrgencyBannerDemoProps) {
  const [target] = useState(getTwoHoursFromNow);

  if (variant === "critical") {
    return (
      <UrgencyBanner
        sticky={false}
        message="Últimas vagas! Restam apenas 3 lugares nesta turma."
        variant="critical"
        cta={{ label: "Garantir vaga", href: "#" }}
      />
    );
  }

  if (variant === "info") {
    return (
      <UrgencyBanner
        sticky={false}
        message="Novo: componentes FOMO disponíveis agora."
        variant="info"
        cta={{ label: "Ver componentes", href: "/docs" }}
      />
    );
  }

  return (
    <UrgencyBanner
      sticky={false}
      message="Oferta especial encerra em {countdown} — não perca!"
      targetDate={target}
      variant="warning"
    />
  );
}
