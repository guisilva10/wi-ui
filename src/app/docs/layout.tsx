import { Header } from "@/shared/ui/layout/header";
import { DocsSidebar } from "@/shared/ui/layout/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex flex-1 items-start">
        <DocsSidebar />
        <main className="min-w-0 flex-1 overflow-auto">{children}</main>
      </div>
    </>
  );
}
