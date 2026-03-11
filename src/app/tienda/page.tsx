"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Filter, Plus, Check } from "lucide-react";
import Link from "next/link";
import { storeProducts } from "@/lib/mock-data";
import { useCart } from "@/context/CartContext";
import VideoBackground from "@/components/ui/VideoBackground";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5 },
  }),
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price);
}

export default function TiendaPage() {
  const [filter, setFilter] = useState("all");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const { addToCart, totalItems } = useCart();
  const { t } = useLanguage();

  const categories = [
    { value: "all", key: "all" },
    { value: "repuestos", key: "repuestos" },
    { value: "motores", key: "motores" },
    { value: "accesorios", key: "accesorios" },
    { value: "servicios", key: "servicios" },
  ];

  const filtered = filter === "all" ? storeProducts : storeProducts.filter((p) => p.category === filter);

  const handleAdd = (product: (typeof storeProducts)[0]) => {
    addToCart(product);
    setAddedIds((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(product.id);
        return next;
      });
    }, 1500);
  };

  return (
    <div>
      <VideoBackground src="/videofabricacion.mov" />

      <section className="relative pt-32 pb-12">
        <div className="container-max relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold mb-4">
            {t("tienda", "title")} <span className="gradient-text">{t("tienda", "title2")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-xl mx-auto mb-8">
            {t("tienda", "desc")}
          </motion.p>

          {totalItems > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
              <Link href="/carrito" className="inline-flex items-center gap-2 glass-red px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:opacity-90 transition-all">
                <ShoppingCart className="h-4 w-4" />
                {t("tienda", "viewCart")} ({totalItems} {totalItems === 1 ? t("tienda", "item") : t("tienda", "items")})
              </Link>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 flex-wrap justify-center">
            <Filter className="h-4 w-4 text-dark-500 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  filter === cat.value
                    ? "gradient-red text-white shadow-lg shadow-brand-500/20"
                    : "glass text-dark-300 hover:text-white hover:bg-white/10"
                )}
              >
                {t("tienda", cat.key)}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding relative">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => {
              const isAdded = addedIds.has(product.id);
              return (
                <motion.div key={product.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="glass rounded-2xl overflow-hidden group hover:border-brand-500/30 transition-all duration-500 flex flex-col">
                  <div className="relative h-48 bg-dark-800/50 flex items-center justify-center overflow-hidden">
                    <div className="text-dark-600 text-sm">
                      <ShoppingCart className="h-10 w-10 mx-auto mb-2 opacity-30" />
                    </div>
                    {product.badge && (
                      <span className="absolute top-3 right-3 gradient-red text-white text-xs font-bold px-3 py-1 rounded-full">{product.badge}</span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-[11px] uppercase tracking-widest text-brand-400 font-semibold mb-2">{t("tienda", product.category)}</span>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-brand-300 transition-colors">{product.name}</h3>
                    <p className="text-dark-400 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                      <span className="text-xl font-bold text-white">{formatPrice(product.price)}</span>
                      <button
                        onClick={() => handleAdd(product)}
                        disabled={isAdded}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
                          isAdded
                            ? "bg-green-500/20 text-green-400 cursor-default"
                            : "gradient-red text-white hover:opacity-90 shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30"
                        )}
                      >
                        {isAdded ? (
                          <><Check className="h-4 w-4" />{t("tienda", "addedBtn")}</>
                        ) : (
                          <><Plus className="h-4 w-4" />{t("tienda", "addBtn")}</>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
