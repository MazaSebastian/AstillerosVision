"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ShoppingCart, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/translations";

const navKeys = [
  { href: "/modelos", key: "modelos" },
  { href: "/nosotros", key: "nosotros" },
  { href: "/distribuidores", key: "distribuidores" },
  { href: "/post-venta", key: "postVenta" },
  { href: "/tienda", key: "tienda" },
  { href: "/contacto", key: "contacto" },
];

const langFlags: Record<Locale, string> = { es: "🇦🇷", en: "🇺🇸", pt: "🇧🇷" };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { totalItems } = useCart();
  const { t, locale, setLocale } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-dark-950/90 backdrop-blur-2xl shadow-lg shadow-black/30 border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <nav className="container-max flex items-center justify-between h-20 px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img
            src="/logovision.png"
            alt="Astillero Visión"
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navKeys.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-dark-300 hover:text-white transition-colors duration-300 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brand-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {t("nav", link.key)}
            </Link>
          ))}

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 p-2 text-dark-300 hover:text-white transition-colors"
            >
              <span className="text-lg">{langFlags[locale]}</span>
              <Globe className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute right-0 top-full mt-2 glass rounded-xl overflow-hidden min-w-[160px] border border-white/10 shadow-xl"
                >
                  {(["en", "pt", "es"] as Locale[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLocale(l); setLangOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 text-sm transition-all",
                        locale === l
                          ? "text-brand-400 bg-brand-500/10"
                          : "text-dark-300 hover:text-white hover:bg-white/5"
                      )}
                    >
                      <span className="text-lg">{langFlags[l]}</span>
                      {l === "en" ? "English" : l === "pt" ? "Português" : "Español"}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart icon */}
          <Link href="/carrito" className="relative p-2 text-dark-300 hover:text-white transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-brand-500/40"
              >
                {totalItems > 9 ? "9+" : totalItems}
              </motion.span>
            )}
          </Link>

          <Link
            href="/contacto"
            className="flex items-center gap-2 gradient-red hover:opacity-90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30"
          >
            <Phone className="h-4 w-4" />
            {t("nav", "cotizar")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/carrito" className="relative p-2 text-dark-300 hover:text-white transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-white"
            aria-label="Menú"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong overflow-hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navKeys.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-dark-200 hover:text-white py-3 px-4 rounded-lg hover:bg-white/5 transition-all font-medium"
                >
                  {t("nav", link.key)}
                </Link>
              ))}
              {/* Mobile lang switcher */}
              <div className="flex gap-2 px-4 py-3">
                {(["en", "pt", "es"] as Locale[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all",
                      locale === l ? "bg-brand-500/20 text-brand-300" : "text-dark-400 hover:bg-white/5"
                    )}
                  >
                    <span>{langFlags[l]}</span>
                  </button>
                ))}
              </div>
              <Link
                href="/contacto"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 mt-2 gradient-red text-white py-3 rounded-lg font-semibold"
              >
                <Phone className="h-4 w-4" />
                {t("nav", "cotizarAhora")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
