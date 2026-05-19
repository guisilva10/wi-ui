import { cn } from "@/lib/cn";

interface BentoGridProps extends React.ComponentProps<"div"> {
  columns?: 2 | 3 | 4;
}

function BentoGrid({
  columns = 3,
  className,
  children,
  ...props
}: BentoGridProps) {
  const colClass = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }[columns];

  return (
    <div
      data-slot="bento-grid"
      className={cn("grid grid-cols-1 gap-4", colClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoGridItemProps extends React.ComponentProps<"div"> {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
}

function BentoGridItem({
  colSpan = 1,
  rowSpan = 1,
  className,
  children,
  ...props
}: BentoGridItemProps) {
  const spanClass = cn(
    colSpan === 2 && "md:col-span-2",
    colSpan === 3 && "md:col-span-3",
    rowSpan === 2 && "md:row-span-2",
  );

  return (
    <div
      data-slot="bento-grid-item"
      className={cn(
        "border-border/50 bg-card/50 hover:border-border hover:bg-card group relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all duration-300",
        spanClass,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  BentoGrid,
  BentoGridItem,
  type BentoGridProps,
  type BentoGridItemProps,
};
