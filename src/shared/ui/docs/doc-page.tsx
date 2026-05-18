"use client";

import Link from "next/link";
import { ChevronRight, Hash } from "lucide-react";
import { TableOfContents, type TocItem } from "./table-of-contents";
import { cn } from "@/lib/cn";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DocPageProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  toc?: TocItem[];
  badge?: string;
  children: React.ReactNode;
}

function DocPage({
  title,
  description,
  breadcrumbs,
  toc,
  badge,
  children,
}: DocPageProps) {
  return (
    <div className="flex">
      {/* Main content */}
      <main className="min-w-0 flex-1 px-6 py-10 md:px-10 lg:px-12">
        <div className="mx-auto max-w-3xl">
          {/* Breadcrumb */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="text-muted-foreground flex items-center gap-1.5 text-sm">
                {breadcrumbs.map((crumb, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    {i > 0 && <ChevronRight className="size-3 opacity-40" />}
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

          {/* Page header */}
          <div className="mb-10 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-foreground text-3xl font-bold tracking-tight">
                {title}
              </h1>
              {badge && (
                <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-medium">
                  {badge}
                </span>
              )}
            </div>
            {description && (
              <p className="text-muted-foreground max-w-2xl text-base leading-relaxed">
                {description}
              </p>
            )}
            <div className="border-border/50 mt-6 border-b" />
          </div>

          {/* Content sections */}
          <div className="space-y-12">{children}</div>
        </div>
      </main>

      {/* Right sidebar - Table of Contents (xl screens only) */}
      {toc && toc.length > 0 && (
        <aside className="hidden w-52 shrink-0 xl:block">
          <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-5 pt-10">
            <TableOfContents items={toc} />
          </div>
        </aside>
      )}
    </div>
  );
}

/** Section heading with anchor link */
function DocSection({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 space-y-4", className)}>
      <h2 className="group text-foreground flex items-center gap-2 text-lg font-semibold tracking-tight">
        <a
          href={`#${id}`}
          className="hover:text-primary flex items-center gap-2 no-underline transition-colors"
        >
          {title}
          <Hash className="size-4 opacity-0 transition-opacity group-hover:opacity-40" />
        </a>
      </h2>
      {children}
    </section>
  );
}

export { DocPage, DocSection, type DocPageProps, type BreadcrumbItem };
