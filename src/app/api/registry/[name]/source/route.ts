import { type NextRequest, NextResponse } from "next/server";
import { registry } from "@/features/registry/domain/registry-data";
import { readComponentFiles } from "@/features/registry/application/read-component-files";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const { searchParams } = request.nextUrl;
  const fileParam = searchParams.get("file");

  const entry = registry.find((c) => c.name === name);

  if (!entry) {
    return new NextResponse(`Componente "${name}" não encontrado.`, {
      status: 404,
      headers: { ...CORS_HEADERS, "Content-Type": "text/plain" },
    });
  }

  const files = await readComponentFiles(entry.files);

  if (files.length === 0) {
    return new NextResponse("Nenhum arquivo encontrado para este componente.", {
      status: 404,
      headers: { ...CORS_HEADERS, "Content-Type": "text/plain" },
    });
  }

  // Se ?file= especificado, retorna arquivo específico
  if (fileParam) {
    const match = files.find((f) => f.name === fileParam);
    if (!match) {
      const available = files.map((f) => f.name).join(", ");
      return new NextResponse(
        `Arquivo "${fileParam}" não encontrado. Disponíveis: ${available}`,
        {
          status: 404,
          headers: { ...CORS_HEADERS, "Content-Type": "text/plain" },
        },
      );
    }
    return new NextResponse(match.content, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        "X-File-Name": match.name,
      },
    });
  }

  // Default: retorna todos os arquivos concatenados com separadores
  const combined = files
    .map((f) => `// === ${f.name} ===\n${f.content}`)
    .join("\n\n");

  return new NextResponse(combined, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "X-Component-Name": name,
      "X-File-Count": String(files.length),
    },
  });
}
