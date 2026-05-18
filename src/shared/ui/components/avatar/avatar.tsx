"use client";

import { useState } from "react";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "size-8 text-xs",
        md: "size-10 text-sm",
        lg: "size-14 text-base",
        xl: "size-20 text-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

interface AvatarProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function Avatar({
  className,
  size,
  src,
  alt = "",
  fallback = "",
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;

  return (
    <div className={cn(avatarVariants({ size }), className)} {...props}>
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          onError={() => setImgError(true)}
          className="object-cover"
          sizes="(max-width: 80px) 100vw"
          unoptimized={src.startsWith("http")}
        />
      ) : (
        <span
          aria-hidden={!!alt}
          className="bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full font-medium select-none"
        >
          {fallback ? getInitials(fallback) : alt ? getInitials(alt) : "?"}
        </span>
      )}
    </div>
  );
}

export { Avatar, avatarVariants, type AvatarProps };
