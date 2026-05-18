import { cn } from "@/lib/cn";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

function Textarea({
  className,
  error = false,
  resize = "vertical",
  disabled,
  ...props
}: TextareaProps) {
  const resizeClass = {
    none: "resize-none",
    vertical: "resize-y",
    horizontal: "resize-x",
    both: "resize",
  }[resize];

  return (
    <textarea
      disabled={disabled}
      data-error={error || undefined}
      className={cn(
        "border-input bg-background flex min-h-24 w-full rounded-md border px-3 py-2 text-sm",
        "placeholder:text-muted-foreground",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[error]:border-destructive data-[error]:focus-visible:ring-destructive",
        resizeClass,
        className,
      )}
      {...props}
    />
  );
}

export { Textarea, type TextareaProps };
