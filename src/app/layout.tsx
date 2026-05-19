import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/shared/ui/layout/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "WI.UI - Componentes React",
  description:
    "Componentes React bonitos, acessíveis e prontos para produção. Copy-paste, TypeScript, dark mode nativo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
