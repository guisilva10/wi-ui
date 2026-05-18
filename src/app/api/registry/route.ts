import { type NextRequest, NextResponse } from "next/server";
import {
  registry,
  type RegistryEntry,
} from "@/features/registry/domain/registry-data";

const REGISTRY_VERSION = "0.1.0";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");

  const validCategories = ["base", "fomo", "animation", "block"] as const;
  type Category = (typeof validCategories)[number];

  let components: RegistryEntry[] = registry;

  if (category) {
    if (!validCategories.includes(category as Category)) {
      return NextResponse.json(
        {
          error: `Categoria inválida: "${category}". Use: ${validCategories.join(", ")}`,
        },
        { status: 400, headers: CORS_HEADERS },
      );
    }
    components = registry.filter((c) => c.category === category);
  }

  return NextResponse.json(
    {
      version: REGISTRY_VERSION,
      total: components.length,
      components: components.map((c) => ({
        name: c.name,
        description: c.description,
        version: c.version,
        category: c.category,
        dependencies: c.dependencies ?? [],
        devDependencies: c.devDependencies ?? [],
        files: c.files,
      })),
    },
    { headers: CORS_HEADERS },
  );
}
