import { type NextRequest, NextResponse } from "next/server";
import { registry } from "@wi-ui/registry";
import { readComponentFiles } from "@/features/registry/application/read-component-files";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  const entry = registry.find((c) => c.name === name);

  if (!entry) {
    return NextResponse.json(
      {
        error: `Componente "${name}" não encontrado.`,
        available: registry.map((c) => c.name),
      },
      { status: 404, headers: CORS_HEADERS },
    );
  }

  const files = await readComponentFiles(entry.files);

  return NextResponse.json(
    {
      name: entry.name,
      description: entry.description,
      version: entry.version,
      category: entry.category,
      dependencies: entry.dependencies ?? [],
      devDependencies: entry.devDependencies ?? [],
      files,
    },
    { headers: CORS_HEADERS },
  );
}
