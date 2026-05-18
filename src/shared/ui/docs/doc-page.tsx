import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/shared/ui/components/separator";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DocPageProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  children: React.ReactNode;
}

function DocPage({ title, description, breadcrumbs, children }: DocPageProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb">
          <ol className="text-muted-foreground flex items-center gap-1 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="size-3" />}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Header */}
      <div>
        <h1 className="text-foreground mb-2 text-3xl font-bold">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <Separator />

      {/* Content */}
      <div className="space-y-10">{children}</div>
    </div>
  );
}

export { DocPage, type DocPageProps, type BreadcrumbItem };
