"use client";

import {
  SocialProof,
  type SocialProofVariant,
} from "@/shared/ui/components/social-proof";

const DEMO_DATA = [
  { name: "Ana Lima", time: "há 2 min" },
  { name: "Carlos M.", time: "há 5 min" },
  { name: "Julia F.", time: "agora mesmo" },
];

export function SocialProofDemo({ variant }: { variant: SocialProofVariant }) {
  return (
    <SocialProof
      fixed={false}
      variant={variant}
      type="purchase"
      data={DEMO_DATA}
      autoRotate
      interval={3000}
    />
  );
}
