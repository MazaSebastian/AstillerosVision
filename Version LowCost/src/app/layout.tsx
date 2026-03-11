import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astillero Visión | Calidad y Seguridad a Bordo",
  description:
    "Fabricantes de embarcaciones premium en San Fernando, Buenos Aires. Lanchas deportivas y de placer con tecnología de avanzada y los más altos estándares de calidad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
