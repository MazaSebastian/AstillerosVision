"use client";

import { motion } from "framer-motion";
import { Ship, ShoppingCart, MapPin, CreditCard, Video, Type } from "lucide-react";
import Link from "next/link";
import { useAdmin } from "@/context/AdminContext";

export default function AdminDashboard() {
  const { content } = useAdmin();

  const stats = [
    { icon: Ship, label: "Modelos", value: content.boatModels.length, href: "/admin/modelos", color: "text-blue-400" },
    { icon: ShoppingCart, label: "Productos", value: content.products.length, href: "/admin/productos", color: "text-green-400" },
    { icon: MapPin, label: "Distribuidores", value: content.distributors.length, href: "/admin/distribuidores", color: "text-amber-400" },
    { icon: CreditCard, label: "Tarjetas", value: content.processCards.length + content.valueCards.length, href: "/admin/tarjetas", color: "text-purple-400" },
    { icon: Video, label: "Videos", value: Object.keys(content.videos).length, href: "/admin/videos", color: "text-cyan-400" },
    { icon: Type, label: "Secciones de texto", value: "3", href: "/admin/textos", color: "text-rose-400" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-dark-400">Bienvenido al panel de administración de Astillero Visión</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={s.href} className="block glass rounded-2xl p-6 hover:border-brand-500/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${s.color}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="text-3xl font-bold text-white">{s.value}</span>
              </div>
              <p className="text-dark-400 text-sm font-medium group-hover:text-white transition-colors">{s.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-bold text-white mb-4">Acciones rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Agregar producto", href: "/admin/productos" },
            { label: "Editar textos", href: "/admin/textos" },
            { label: "Gestionar modelos", href: "/admin/modelos" },
            { label: "Ver sitio web", href: "/", external: true },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              className="glass rounded-xl px-4 py-3 text-sm text-dark-300 hover:text-white hover:bg-white/5 transition-all text-center"
            >
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
