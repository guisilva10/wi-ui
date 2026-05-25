import { Header } from "@/shared/ui/layout/header";
import { DocsSidebar } from "@/shared/ui/layout/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <DocsSidebar />
        <div
          data-docs-scroll
          className="min-w-0 flex-1 overflow-x-hidden overflow-y-auto"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
