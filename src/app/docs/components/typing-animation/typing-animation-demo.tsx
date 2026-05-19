"use client";

import { TypingAnimation } from "@/shared/ui/components/typing-animation/typing-animation";

export function TypingAnimationDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <p className="text-2xl font-bold">
        <TypingAnimation
          text="Construa interfaces incriveis."
          speed={60}
          cursor
        />
      </p>
    </div>
  );
}

export function TypingAnimationLoopDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <p className="text-primary text-xl font-semibold">
        <TypingAnimation
          text="Loop infinito ativado!"
          speed={50}
          cursor
          loop
          pauseDuration={1000}
        />
      </p>
    </div>
  );
}
