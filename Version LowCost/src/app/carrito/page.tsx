"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, MessageCircle, Package } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import VideoBackground from "@/components/ui/VideoBackground";
import { CONTACT_INFO } from "@/lib/mock-data";
import { useLanguage } from "@/context/LanguageContext";

function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price);
}

export default function CarritoPage() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const { t } = useLanguage();

  const buildWhatsAppMessage = () => {
    let msg = `${t("carrito", "whatsappMsg")}\n\n`;
    items.forEach((item, i) => {
      msg += `${i + 1}. ${item.name} x${item.quantity} — ${formatPrice(item.price * item.quantity)}\n`;
    });
    msg += `\n*${t("carrito", "whatsappTotal")}: ${formatPrice(totalPrice)}*\n\n${t("carrito", "whatsappEnd")}`;
    return encodeURIComponent(msg);
  };

  return (
    <div>
      <VideoBackground src="/videofabricacion.mov" />

      <section className="section-padding pt-32 min-h-screen">
        <div className="container-max">
          <div className="text-center mb-12">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold mb-4">
              {t("carrito", "title")} <span className="gradient-text">{t("carrito", "title2")}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-xl mx-auto">
              {totalItems > 0
                ? `${totalItems} ${totalItems === 1 ? t("carrito", "productIn") : t("carrito", "productsIn")}`
                : t("carrito", "empty")}
            </motion.p>
          </div>

          {items.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20">
              <div className="glass rounded-3xl p-12 max-w-md mx-auto">
                <ShoppingCart className="h-16 w-16 text-dark-600 mx-auto mb-6" />
                <h2 className="text-xl font-bold text-white mb-3">{t("carrito", "emptyTitle")}</h2>
                <p className="text-dark-400 mb-8">{t("carrito", "emptyDesc")}</p>
                <Link href="/tienda" className="inline-flex items-center gap-2 gradient-red text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20">
                  <Package className="h-4 w-4" />
                  {t("carrito", "goToStore")}
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, i) => (
                  <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5 flex gap-5 items-center group">
                    <div className="w-20 h-20 rounded-xl bg-dark-800/50 flex-shrink-0 flex items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-dark-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-widest text-brand-400 font-semibold">{item.category}</span>
                      <h3 className="text-white font-bold truncate">{item.name}</h3>
                      <p className="text-dark-400 text-sm">{formatPrice(item.price)} {t("carrito", "perUnit")}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Minus className="h-3 w-3 text-dark-300" />
                      </button>
                      <span className="w-8 text-center text-white font-bold text-sm">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors">
                        <Plus className="h-3 w-3 text-dark-300" />
                      </button>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-white font-bold">{formatPrice(item.price * item.quantity)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-dark-500 hover:text-red-400 transition-colors mt-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
                <div className="flex items-center justify-between pt-4">
                  <Link href="/tienda" className="inline-flex items-center gap-2 text-dark-400 hover:text-white transition-colors text-sm">
                    <ArrowLeft className="h-4 w-4" />
                    {t("carrito", "keepShopping")}
                  </Link>
                  <button onClick={clearCart} className="text-dark-500 hover:text-red-400 transition-colors text-sm">
                    {t("carrito", "clearCart")}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6 sticky top-28">
                  <h2 className="text-lg font-bold text-white mb-6">{t("carrito", "summary")}</h2>
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-dark-400 truncate mr-2">{item.name} x{item.quantity}</span>
                        <span className="text-dark-300 flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-white/10 pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-dark-300 font-medium">{t("carrito", "total")}</span>
                      <span className="text-2xl font-bold text-white">{formatPrice(totalPrice)}</span>
                    </div>
                    <p className="text-dark-500 text-xs mt-2">{t("carrito", "priceDisclaimer")}</p>
                  </div>
                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${buildWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 gradient-red text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {t("carrito", "requestQuote")}
                  </a>
                  <p className="text-dark-500 text-xs text-center mt-3">{t("carrito", "whatsappNote")}</p>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
