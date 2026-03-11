"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Save, ShoppingCart } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { StoreProduct } from "@/lib/types";

const categories = ["repuestos", "motores", "accesorios", "servicios"] as const;

function formatPrice(p: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(p);
}

const emptyProduct: StoreProduct = {
  id: "", name: "", description: "", price: 0, category: "repuestos", image: "", badge: "",
};

export default function AdminProductos() {
  const { content, updateContent } = useAdmin();
  const [products, setProducts] = useState<StoreProduct[]>(content.products);
  const [editing, setEditing] = useState<StoreProduct | null>(null);
  const [isNew, setIsNew] = useState(false);

  const inputCls = "w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all text-sm";

  const saveAll = (updated: StoreProduct[]) => {
    setProducts(updated);
    updateContent("products", updated);
  };

  const handleSave = () => {
    if (!editing) return;
    if (isNew) {
      const withId = { ...editing, id: `p-${Date.now()}` };
      saveAll([...products, withId]);
    } else {
      saveAll(products.map((p) => (p.id === editing.id ? editing : p)));
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    saveAll(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Productos</h1>
          <p className="text-dark-400">{products.length} productos en la tienda</p>
        </div>
        <button
          onClick={() => { setEditing({ ...emptyProduct }); setIsNew(true); }}
          className="flex items-center gap-2 gradient-red text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20"
        >
          <Plus className="h-4 w-4" /> Agregar producto
        </button>
      </div>

      {/* Editor modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setEditing(null); setIsNew(false); }} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative glass rounded-3xl p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{isNew ? "Nuevo producto" : "Editar producto"}</h2>
                <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-dark-400 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Nombre *</label>
                  <input className={inputCls} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Nombre del producto" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Descripción *</label>
                  <textarea rows={3} className={inputCls + " resize-none"} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} placeholder="Descripción del producto" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Precio (ARS) *</label>
                    <input type="number" className={inputCls} value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} placeholder="0" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Categoría *</label>
                    <select className={inputCls} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as StoreProduct["category"] })}>
                      {categories.map((c) => <option key={c} value={c} className="bg-dark-900">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">URL de imagen</label>
                    <input className={inputCls} value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="/images/store/..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Badge (opcional)</label>
                    <input className={inputCls} value={editing.badge || ""} onChange={(e) => setEditing({ ...editing, badge: e.target.value })} placeholder="Ej: Popular, Top" />
                  </div>
                </div>
                <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 gradient-red text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20">
                  <Save className="h-5 w-5" />{isNew ? "Crear producto" : "Guardar cambios"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product list */}
      <div className="space-y-3">
        {products.map((product, i) => (
          <motion.div key={product.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass rounded-xl p-5 flex items-center gap-5 group">
            <div className="w-14 h-14 rounded-xl bg-dark-800/50 flex items-center justify-center flex-shrink-0">
              <ShoppingCart className="h-6 w-6 text-dark-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-white font-semibold truncate">{product.name}</h3>
                {product.badge && <span className="text-[10px] font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full">{product.badge}</span>}
              </div>
              <p className="text-dark-500 text-xs truncate">{product.description}</p>
            </div>
            <span className="text-xs text-dark-400 px-3 py-1 rounded-lg bg-white/5 flex-shrink-0">{product.category}</span>
            <span className="text-white font-bold flex-shrink-0">{formatPrice(product.price)}</span>
            <div className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => { setEditing({ ...product }); setIsNew(false); }} className="p-2 rounded-lg hover:bg-white/10 text-dark-400 hover:text-white transition-all">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => handleDelete(product.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-dark-400 hover:text-red-400 transition-all">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
