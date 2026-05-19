"use client";

import { ArcTimeline } from "@/shared/ui/components/arc-timeline";
import type { ArcTimelineItem } from "@/shared/ui/components/arc-timeline";

const DEMO_DATA: ArcTimelineItem[] = [
  {
    time: "2022",
    steps: [
      {
        icon: <span>🚀</span>,
        content: "Fundacao da empresa e primeiros passos no mercado",
      },
      {
        icon: <span>👥</span>,
        content: "Contratacao dos primeiros colaboradores",
      },
      {
        icon: <span>📦</span>,
        content: "Lancamento do produto beta para early adopters",
      },
    ],
  },
  {
    time: "2023",
    steps: [
      {
        icon: <span>📈</span>,
        content: "Crescimento de 300% na base de usuarios",
      },
      { icon: <span>🏆</span>, content: "Premio de melhor startup do setor" },
      {
        icon: <span>🌎</span>,
        content: "Expansao para novos mercados internacionais",
      },
    ],
  },
  {
    time: "2024",
    steps: [
      {
        icon: <span>💡</span>,
        content: "Lancamento da versao 2.0 com novas features",
      },
      {
        icon: <span>🤝</span>,
        content: "Parceria estrategica com grandes players",
      },
    ],
  },
];

export function ArcTimelineDemo() {
  return (
    <div className="border-border w-full overflow-hidden rounded-xl border">
      <ArcTimeline data={DEMO_DATA} />
    </div>
  );
}
