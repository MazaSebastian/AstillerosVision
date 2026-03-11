"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import LanguageSelector from "@/components/ui/LanguageSelector";
import ChatBot from "@/components/chat/ChatBot";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AdminProvider } from "@/context/AdminContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isConfigurador = pathname === "/configurador";
  const showChrome = !isAdmin && !isConfigurador;

  return (
    <AdminProvider>
      <LanguageProvider>
        <CartProvider>
          {!isAdmin && (
            <>
              {!isConfigurador && <AnimatedBackground />}
              <LanguageSelector />
              <Navbar />
            </>
          )}
          <main className={isAdmin ? "" : "min-h-screen"}>{children}</main>
          {showChrome && (
            <>
              <Footer />
              <WhatsAppButton />
            </>
          )}
          {!isAdmin && <ChatBot />}
        </CartProvider>
      </LanguageProvider>
    </AdminProvider>
  );
}

