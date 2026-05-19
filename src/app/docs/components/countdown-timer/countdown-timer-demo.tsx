"use client";

import { useState } from "react";
import {
  CountdownTimer,
  countdownVariants,
} from "@/shared/ui/components/countdown-timer";
import { type VariantProps } from "class-variance-authority";

type CountdownTimerDemoProps = VariantProps<typeof countdownVariants> & {
  showDays?: boolean;
};

function getTarget(variant: CountdownTimerDemoProps["variant"]): Date {
  const hoursOffset =
    variant === "urgent" ? 45 * 60 * 1000 : 2 * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + hoursOffset);
}

export function CountdownTimerDemo({
  variant,
  showDays = true,
}: CountdownTimerDemoProps) {
  const [target] = useState(() => getTarget(variant));

  return (
    <CountdownTimer targetDate={target} variant={variant} showDays={showDays} />
  );
}
