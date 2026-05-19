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
      <div className="flex min-h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
        <DocsSidebar />
        <div className="min-w-0 flex-1 overflow-x-hidden">{children}</div>
      </div>
    </>
  );
}
