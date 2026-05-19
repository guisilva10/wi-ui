"use client";

import { useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/shared/ui/components/button";

function UserMenu() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isPendingSignOut, startSignOut] = useTransition();

  function handleSignOut() {
    startSignOut(() => {
      void authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    });
  }

  if (isPending) {
    return (
      <div className="size-8 animate-pulse rounded-full bg-current opacity-10" />
    );
  }

  if (!session) return null;

  const { user } = session;
  const initials = user.name
    ? user.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase();

  return (
    <div className="flex items-center gap-2">
      {/* Avatar */}
      <div className="border-border relative size-7 shrink-0 overflow-hidden rounded-full border">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? user.email}
            fill
            className="object-cover"
            unoptimized={user.image.startsWith("http")}
          />
        ) : (
          <span className="bg-foreground text-background flex size-full items-center justify-center text-xs font-semibold">
            {initials}
          </span>
        )}
      </div>

      {/* Name — desktop only */}
      <span className="text-foreground hidden max-w-[120px] truncate text-xs font-medium sm:block">
        {user.name ?? user.email}
      </span>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        disabled={isPendingSignOut}
        aria-label="Sair"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "gap-1.5 text-xs disabled:opacity-50",
        )}
      >
        {isPendingSignOut ? (
          <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <LogOut className="size-3.5" aria-hidden />
        )}
        <span className="hidden sm:block">Sair</span>
      </button>
    </div>
  );
}

export { UserMenu };
