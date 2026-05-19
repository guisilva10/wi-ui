"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface TypingAnimationProps extends React.ComponentProps<"span"> {
  text: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  loop?: boolean;
  pauseDuration?: number;
}

function TypingAnimation({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  loop = false,
  pauseDuration = 1500,
  className,
  ...props
}: TypingAnimationProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(delayTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      if (!isDeleting) {
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) {
          timeoutId = setTimeout(tick, speed);
        } else if (loop) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            tick();
          }, pauseDuration);
        }
      } else {
        i--;
        setDisplayed(text.slice(0, i));
        if (i > 0) {
          timeoutId = setTimeout(tick, speed / 2);
        } else {
          isDeleting = false;
          timeoutId = setTimeout(tick, speed);
        }
      }
    }

    timeoutId = setTimeout(tick, speed);
    return () => clearTimeout(timeoutId);
  }, [started, text, speed, loop, pauseDuration]);

  return (
    <span data-slot="typing-animation" className={cn(className)} {...props}>
      {displayed}
      {cursor && (
        <span className="ml-0.5 inline-block w-[2px] animate-pulse">|</span>
      )}
    </span>
  );
}

export { TypingAnimation, type TypingAnimationProps };
