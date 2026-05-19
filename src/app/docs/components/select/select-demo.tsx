"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/shared/ui/components/select";

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger
        placeholder="Selecione um framework"
        className="w-[200px]"
      />
      <SelectContent>
        <SelectItem value="next">Next.js</SelectItem>
        <SelectItem value="remix">Remix</SelectItem>
        <SelectItem value="astro">Astro</SelectItem>
        <SelectItem value="nuxt">Nuxt</SelectItem>
      </SelectContent>
    </Select>
  );
}
