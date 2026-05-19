"use client";

import { toast, Toaster } from "@/shared/ui/components/toast/toast";
import { Button } from "@/shared/ui/components/button/button";

export function ToastDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-8">
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast({ title: "Notificacao", description: "Toast padrao exibido." })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Sucesso!",
            description: "Operacao realizada com sucesso.",
            variant: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Erro!",
            description: "Algo deu errado. Tente novamente.",
            variant: "error",
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Atencao!",
            description: "Verifique as informacoes inseridas.",
            variant: "warning",
          })
        }
      >
        Warning
      </Button>
    </div>
  );
}
