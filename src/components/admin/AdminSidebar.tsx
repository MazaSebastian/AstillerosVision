"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Type,
  Video,
  ShoppingCart,
  Ship,
  CreditCard,
  MapPin,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdmin } from "@/context/AdminContext";

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/textos", icon: Type, label: "Textos" },
  { href: "/admin/videos", icon: Video, label: "Videos" },
  { href: "/admin/productos", icon: ShoppingCart, label: "Productos" },
  { href: "/admin/modelos", icon: Ship, label: "Modelos" },
  { href: "/admin/tarjetas", icon: CreditCard, label: "Tarjetas" },
  { href: "/admin/distribuidores", icon: MapPin, label: "Distribuidores" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAdmin();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 glass border-r border-white/[0.06] flex flex-col z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/[0.06]">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logovision.png" alt="Astillero Visión" className="h-8 w-auto" />
        </Link>
        <p className="text-[11px] text-brand-400 font-semibold uppercase tracking-widest mt-2">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                isActive
                  ? "gradient-red text-white shadow-lg shadow-brand-500/20"
                  : "text-dark-400 hover:text-white hover:bg-white/[0.05]"
              )}
            >
              <link.icon className="h-5 w-5 flex-shrink-0" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/[0.06] space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-dark-400 hover:text-white hover:bg-white/[0.05] transition-all"
        >
          <ExternalLink className="h-5 w-5" />
          Ver sitio web
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-dark-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
        >
          <LogOut className="h-5 w-5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
