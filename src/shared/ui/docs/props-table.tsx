interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropDef[];
}

function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="space-y-2">
      {/* Header row - desktop only */}
      <div className="text-muted-foreground hidden grid-cols-[180px_1fr_100px] gap-4 px-4 pb-2 text-xs font-medium tracking-wide uppercase md:grid">
        <span>Prop</span>
        <span>Tipo / Descricao</span>
        <span className="text-right">Padrão</span>
      </div>

      {/* Prop rows */}
      <div className="border-border divide-border divide-y rounded-xl border">
        {props.map((prop) => (
          <div
            key={prop.name}
            className="hover:bg-muted/30 group p-4 transition-colors"
          >
            {/* Desktop layout */}
            <div className="hidden grid-cols-[180px_1fr_100px] items-start gap-4 md:grid">
              <div className="flex items-center gap-2">
                <code className="bg-muted text-foreground rounded-md px-2 py-1 font-mono text-[13px] font-medium">
                  {prop.name}
                </code>
                {prop.required && (
                  <span className="text-destructive text-xs font-medium">
                    *
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <code className="text-muted-foreground font-mono text-xs">
                  {prop.type}
                </code>
                <p className="text-muted-foreground text-[13px] leading-relaxed">
                  {prop.description}
                </p>
              </div>
              <div className="text-right">
                {prop.default ? (
                  <code className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-xs">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-muted-foreground/50 text-xs">--</span>
                )}
              </div>
            </div>

            {/* Mobile layout */}
            <div className="space-y-2 md:hidden">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <code className="bg-muted text-foreground rounded-md px-2 py-1 font-mono text-[13px] font-medium">
                    {prop.name}
                  </code>
                  {prop.required && (
                    <span className="text-destructive text-xs font-medium">
                      *
                    </span>
                  )}
                </div>
                {prop.default && (
                  <code className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 font-mono text-xs">
                    {prop.default}
                  </code>
                )}
              </div>
              <code className="text-muted-foreground block font-mono text-xs break-all">
                {prop.type}
              </code>
              <p className="text-muted-foreground text-[13px] leading-relaxed">
                {prop.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { PropsTable, type PropDef, type PropsTableProps };
