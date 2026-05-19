"use client";

import { Marquee } from "@/shared/ui/components/marquee";

const ITEMS = [
  {
    label: "Next.js",
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  { label: "React", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
  {
    label: "TypeScript",
    color: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    label: "Tailwind",
    color: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  {
    label: "Prisma",
    color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  },
  { label: "Motion", color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
];

interface MarqueeDemoProps {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
}

export function MarqueeDemo({
  reverse = false,
  pauseOnHover = false,
  vertical = false,
}: MarqueeDemoProps) {
  return (
    <div
      className={
        vertical
          ? "flex h-48 justify-center overflow-hidden"
          : "w-full overflow-hidden"
      }
    >
      <Marquee
        reverse={reverse}
        pauseOnHover={pauseOnHover}
        vertical={vertical}
        className={vertical ? "h-full" : ""}
      >
        {ITEMS.map((item) => (
          <span
            key={item.label}
            className={`border-border inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium ${item.color}`}
          >
            {item.label}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
