"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import LanguageSelector from "@/components/ui/LanguageSelector";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AdminProvider } from "@/context/AdminContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <AdminProvider>
      <LanguageProvider>
        <CartProvider>
          {!isAdmin && (
            <>
              <AnimatedBackground />
              <LanguageSelector />
              <Navbar />
            </>
          )}
          <main className={isAdmin ? "" : "min-h-screen"}>{children}</main>
          {!isAdmin && (
            <>
              <Footer />
              <WhatsAppButton />
            </>
          )}
        </CartProvider>
      </LanguageProvider>
    </AdminProvider>
  );
}
