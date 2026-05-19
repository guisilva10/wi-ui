"use client";

import { Suspense, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { SiGoogle } from "react-icons/si";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/cn";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/playground";

  const [isPending, startTransition] = useTransition();

  function handleGoogle() {
    startTransition(() => {
      void authClient.signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
    });
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleGoogle}
        disabled={isPending}
        className={cn(
          "flex w-full items-center justify-center gap-3 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors",
          "border-border bg-background text-foreground hover:bg-accent",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        {isPending ? (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <SiGoogle className="size-4" aria-hidden />
        )}
        Entrar com Google
      </button>
    </div>
  );
}

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="text-center">
          <p className="text-foreground text-3xl font-bold tracking-tight select-none">
            <span className="text-primary">WI</span>
            <span className="text-muted-foreground">.</span>
            <span>UI</span>
          </p>
          <h1 className="text-foreground mt-3 text-xl font-semibold">
            Acesse o Playground
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Faça login para personalizar e exportar temas.
          </p>
        </div>

        {/* Buttons */}
        <Suspense
          fallback={
            <div className="space-y-3">
              <div className="h-10 w-full animate-pulse rounded-lg bg-current opacity-10" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>

        {/* Footer */}
        <p className="text-muted-foreground text-center text-xs">
          Ao entrar, você concorda com os termos de uso do WI.UI.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
