"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/cn";

interface TocItem {
  id: string;
  label: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const atBottomRef = useRef(false);

  useEffect(() => {
    if (items.length === 0) return;

    const lastId = items[items.length - 1].id;

    // Detect scroll-to-bottom to activate last TOC item
    const scrollContainer =
      document.querySelector("[data-docs-scroll]") ?? window;
    const isWindow = scrollContainer === window;

    function handleScroll() {
      const atBottom = isWindow
        ? window.innerHeight + window.scrollY >= document.body.scrollHeight - 20
        : (scrollContainer as HTMLElement).scrollTop +
            (scrollContainer as HTMLElement).clientHeight >=
          (scrollContainer as HTMLElement).scrollHeight - 20;

      if (atBottom && !atBottomRef.current) {
        setActiveId(lastId);
      }
      atBottomRef.current = atBottom;
    }

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        if (atBottomRef.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -40% 0px", threshold: 0 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => {
      observer.disconnect();
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [items]);

  if (items.length === 0) return null;

  function handleClick(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <nav aria-label="Nesta pagina" className="space-y-3">
      <p className="text-foreground text-xs font-semibold tracking-wide uppercase">
        Nesta pagina
      </p>
      <ul className="border-border/50 space-y-px border-l">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={cn(
                  "-ml-px block w-full border-l py-1.5 text-left text-[13px] transition-colors",
                  item.level === 3 ? "pl-6" : "pl-3",
                  isActive
                    ? "border-accent-link text-accent-link font-medium"
                    : "text-muted-foreground hover:border-border hover:text-foreground border-transparent",
                )}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export { TableOfContents, type TocItem, type TableOfContentsProps };
