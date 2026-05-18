import { Header } from "@/shared/ui/layout/header";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex-1 overflow-hidden">{children}</div>
    </>
  );
}
