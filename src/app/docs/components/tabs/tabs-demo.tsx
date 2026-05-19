"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/ui/components/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="conta" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="conta">Conta</TabsTrigger>
        <TabsTrigger value="senha">Senha</TabsTrigger>
      </TabsList>
      <TabsContent value="conta">
        <div className="border-border rounded-lg border p-4">
          <p className="text-sm">Gerencie as configuracoes da sua conta.</p>
        </div>
      </TabsContent>
      <TabsContent value="senha">
        <div className="border-border rounded-lg border p-4">
          <p className="text-sm">Altere sua senha aqui.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
