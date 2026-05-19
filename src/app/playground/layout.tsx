import { Header } from "@/shared/ui/layout/header";
import { UserMenu } from "@/features/auth/presentation/user-menu";

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header extraRight={<UserMenu />} />
      <div className="flex-1 overflow-hidden">{children}</div>
    </>
  );
}
