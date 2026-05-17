export type RegistryEntry = {
  name: string;
  description: string;
  version: string;
  files: string[];
  dependencies?: string[];
};

export const registry: RegistryEntry[] = [];
