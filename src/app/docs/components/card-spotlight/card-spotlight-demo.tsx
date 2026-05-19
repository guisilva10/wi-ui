"use client";

import { CardSpotlight } from "@/shared/ui/components/card-spotlight";
import { CanvasRevealEffect } from "@/shared/ui/components/canvas-reveal-effect";

interface CardSpotlightDemoProps {
  color?: string;
  radius?: number;
  withCanvas?: boolean;
}

export function CardSpotlightDemo({
  color,
  radius,
  withCanvas,
}: CardSpotlightDemoProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <CardSpotlight
        className="bg-card border-border w-full max-w-sm rounded-xl border p-6"
        color={color}
        radius={radius}
        overlay={
          withCanvas ? (
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent absolute inset-0 pointer-events-none"
              colors={[
                [0, 180, 216],
                [0, 210, 230],
              ]}
              dotSize={3}
            />
          ) : undefined
        }
      >
        <div className="relative z-10 space-y-3">
          <div className="bg-muted text-foreground inline-flex rounded-lg p-2">
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
          </div>
          <h3 className="text-foreground text-base font-semibold">
            CardSpotlight
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Passe o mouse sobre este card para ver o efeito spotlight seguindo o
            cursor.
          </p>
        </div>
      </CardSpotlight>
    </div>
  );
}
