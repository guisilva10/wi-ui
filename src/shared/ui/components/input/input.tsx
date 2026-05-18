import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

function Input({
  className,
  type = "text",
  error = false,
  startIcon,
  endIcon,
  disabled,
  ...props
}: InputProps) {
  if (startIcon || endIcon) {
    return (
      <div className="relative flex items-center">
        {startIcon && (
          <span className="text-muted-foreground pointer-events-none absolute left-3 flex items-center">
            {startIcon}
          </span>
        )}
        <input
          type={type}
          disabled={disabled}
          data-error={error || undefined}
          className={cn(
            "border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm",
            "placeholder:text-muted-foreground",
            "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[error]:border-destructive data-[error]:focus-visible:ring-destructive",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            startIcon && "pl-9",
            endIcon && "pr-9",
            className,
          )}
          {...props}
        />
        {endIcon && (
          <span className="text-muted-foreground pointer-events-none absolute right-3 flex items-center">
            {endIcon}
          </span>
        )}
      </div>
    );
  }

  return (
    <input
      type={type}
      disabled={disabled}
      data-error={error || undefined}
      className={cn(
        "border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm",
        "placeholder:text-muted-foreground",
        "focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[error]:border-destructive data-[error]:focus-visible:ring-destructive",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className,
      )}
      {...props}
    />
  );
}

export { Input, type InputProps };
