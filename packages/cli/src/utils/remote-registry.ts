import consola from "consola";

export type RemoteComponentFile = {
  name: string;
  path: string;
  content: string;
};

export type RemoteRegistryEntry = {
  name: string;
  description: string;
  version: string;
  category: "base" | "fomo" | "animation" | "block";
  dependencies: string[];
  devDependencies: string[];
  files: string[];
};

export type RemoteRegistryListResponse = {
  version: string;
  total: number;
  components: RemoteRegistryEntry[];
};

export type RemoteComponentResponse = RemoteRegistryEntry & {
  files: RemoteComponentFile[];
};

export async function fetchRegistryList(
  registryUrl: string,
): Promise<RemoteRegistryEntry[] | null> {
  try {
    const response = await fetch(registryUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      consola.debug(`Registry remoto retornou ${response.status}`);
      return null;
    }

    const data = (await response.json()) as RemoteRegistryListResponse;
    return data.components;
  } catch (err) {
    consola.debug(`Falha ao acessar registry remoto: ${String(err)}`);
    return null;
  }
}

export async function fetchComponent(
  registryUrl: string,
  componentName: string,
): Promise<RemoteComponentResponse | null> {
  const url = `${registryUrl}/${componentName}`;

  try {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      consola.debug(
        `Registry remoto retornou ${response.status} para ${componentName}`,
      );
      return null;
    }

    return (await response.json()) as RemoteComponentResponse;
  } catch (err) {
    consola.debug(
      `Falha ao buscar componente remoto "${componentName}": ${String(err)}`,
    );
    return null;
  }
}
