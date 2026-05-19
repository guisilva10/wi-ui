"use client";

import { useState } from "react";
import { Switch } from "@/shared/ui/components/switch";

export function SwitchDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex items-center gap-3">
      <Switch checked={checked} onCheckedChange={setChecked} />
      <span className="text-sm">{checked ? "Ativo" : "Inativo"}</span>
    </div>
  );
}
