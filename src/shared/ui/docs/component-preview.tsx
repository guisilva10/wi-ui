import { highlightCode } from "@/lib/shiki";
import { ComponentPreviewClient } from "./component-preview-client";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  lang?: string;
  className?: string;
}

async function ComponentPreview({
  children,
  code,
  lang = "tsx",
  className,
}: ComponentPreviewProps) {
  const highlightedHtml = await highlightCode(code, lang);

  return (
    <ComponentPreviewClient
      code={code}
      highlightedHtml={highlightedHtml}
      className={className}
    >
      {children}
    </ComponentPreviewClient>
  );
}

export { ComponentPreview, type ComponentPreviewProps };
