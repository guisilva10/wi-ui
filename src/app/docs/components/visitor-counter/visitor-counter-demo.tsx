"use client";

import {
  VisitorCounter,
  type VisitorCounterVariant,
} from "@/shared/ui/components/visitor-counter";

export function VisitorCounterDemo({
  variant,
}: {
  variant: VisitorCounterVariant;
}) {
  return <VisitorCounter count={47} variant={variant} simulateActivity />;
}
