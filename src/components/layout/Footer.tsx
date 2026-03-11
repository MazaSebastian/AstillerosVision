"use client";

import Link from "next/link";
import { Anchor, Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { CONTACT_INFO } from "@/lib/mock-data";
import { useLanguage } from "@/context/LanguageContext";

const navItems = [
  { key: "modelos", href: "/modelos" },
  { key: "nosotros", href: "/nosotros" },
  { key: "distribuidores", href: "/distribuidores" },
  { key: "postVenta", href: "/post-venta" },
  { key: "tienda", href: "/tienda" },
  { key: "contacto", href: "/contacto" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/[0.06]">
      <div className="container-max section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img
                src="/logovision.png"
                alt="Astillero Visión"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-dark-400 text-sm leading-relaxed">
              {t("footer", "brand")}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-400 mb-4">
              {t("footer", "nav")}
            </h4>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-dark-400 hover:text-brand-400 text-sm transition-colors"
                >
                  {t("nav", item.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-400 mb-4">
              {t("footer", "contacto")}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-dark-400">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                <span>{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-500 shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-500 shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-400 mb-4">
              {t("footer", "social")}
            </h4>
            <div className="flex gap-3">
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-lg hover:bg-brand-500/10 hover:border-brand-500/20 transition-all group"
              >
                <Instagram className="h-5 w-5 text-dark-400 group-hover:text-brand-400 transition-colors" />
              </a>
              <a
                href={CONTACT_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="glass p-3 rounded-lg hover:bg-brand-500/10 hover:border-brand-500/20 transition-all group"
              >
                <Facebook className="h-5 w-5 text-dark-400 group-hover:text-brand-400 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 text-center text-xs text-dark-500">
          © {new Date().getFullYear()} Astillero Visión. {t("footer", "rights")}
        </div>
      </div>
    </footer>
  );
}
