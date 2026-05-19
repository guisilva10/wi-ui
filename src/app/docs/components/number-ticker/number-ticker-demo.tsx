"use client";

import { NumberTicker } from "@/shared/ui/components/number-ticker";

interface NumberTickerDemoProps {
  value?: number;
  startValue?: number;
  direction?: "up" | "down";
  decimalPlaces?: number;
}

export function NumberTickerDemo({
  value = 1500,
  startValue = 0,
  direction = "up",
  decimalPlaces = 0,
}: NumberTickerDemoProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <span className="text-6xl font-bold tabular-nums">
        <NumberTicker
          value={value}
          startValue={startValue}
          direction={direction}
          decimalPlaces={decimalPlaces}
        />
      </span>
    </div>
  );
}
