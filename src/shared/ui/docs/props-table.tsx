interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface PropsTableProps {
  props: PropDef[];
}

function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="border-border w-full min-w-[600px] border-collapse border text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="border-border border px-4 py-2 text-left font-semibold">
              Prop
            </th>
            <th className="border-border border px-4 py-2 text-left font-semibold">
              Tipo
            </th>
            <th className="border-border border px-4 py-2 text-left font-semibold">
              Default
            </th>
            <th className="border-border border px-4 py-2 text-left font-semibold">
              Descrição
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}
            >
              <td className="border-border border px-4 py-2">
                <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
                  {prop.name}
                </code>
              </td>
              <td className="border-border border px-4 py-2">
                <code className="text-muted-foreground font-mono text-xs">
                  {prop.type}
                </code>
              </td>
              <td className="border-border border px-4 py-2">
                {prop.default ? (
                  <code className="text-muted-foreground font-mono text-xs">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </td>
              <td className="text-muted-foreground border-border border px-4 py-2 text-xs">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { PropsTable, type PropDef, type PropsTableProps };
