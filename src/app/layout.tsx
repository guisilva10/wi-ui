import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeProvider } from "@/shared/ui/layout/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WI.UI · Componentes React",
    template: "%s | WI.UI",
  },
  description:
    "Componentes React bonitos, acessíveis e prontos para produção. Copy-paste, TypeScript, dark mode nativo. 60+ componentes: base, FOMO, animação e blocos.",
  keywords: [
    "react",
    "components",
    "ui",
    "typescript",
    "tailwind",
    "next.js",
    "open source",
    "copy paste",
    "dark mode",
  ],
  authors: [{ name: "WI.UI", url: "https://wi-ui.vercel.app" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://wi-ui.vercel.app",
    title: "WI.UI · Componentes React",
    description:
      "Componentes React bonitos, acessíveis e prontos para produção. Copy-paste, TypeScript, dark mode nativo.",
    siteName: "WI.UI",
  },
  twitter: {
    card: "summary_large_image",
    title: "WI.UI · Componentes React",
    description:
      "Componentes React bonitos, acessíveis e prontos para produção. Copy-paste, TypeScript, dark mode nativo.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("wi-ui-theme");if(t==="dark")document.documentElement.classList.add("dark")}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
