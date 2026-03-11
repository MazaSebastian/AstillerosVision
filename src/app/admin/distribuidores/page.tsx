"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Save, MapPin, Phone } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { Distributor } from "@/lib/types";

const emptyDist: Distributor = { id: "", name: "", address: "", province: "", phone: "", whatsapp: "" };

export default function AdminDistribuidores() {
  const { content, updateContent } = useAdmin();
  const [dists, setDists] = useState<Distributor[]>(content.distributors);
  const [editing, setEditing] = useState<Distributor | null>(null);
  const [isNew, setIsNew] = useState(false);

  const inputCls = "w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all text-sm";

  const saveAll = (updated: Distributor[]) => { setDists(updated); updateContent("distributors", updated); };

  const handleSave = () => {
    if (!editing) return;
    if (isNew) {
      saveAll([...dists, { ...editing, id: `dist-${Date.now()}` }]);
    } else {
      saveAll(dists.map((d) => d.id === editing.id ? editing : d));
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => { saveAll(dists.filter((d) => d.id !== id)); };

  // Group by province
  const grouped = dists.reduce((acc, d) => {
    if (!acc[d.province]) acc[d.province] = [];
    acc[d.province].push(d);
    return acc;
  }, {} as Record<string, Distributor[]>);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Distribuidores</h1>
          <p className="text-dark-400">{dists.length} distribuidores en {Object.keys(grouped).length} provincias</p>
        </div>
        <button onClick={() => { setEditing({ ...emptyDist }); setIsNew(true); }} className="flex items-center gap-2 gradient-red text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20">
          <Plus className="h-4 w-4" /> Agregar distribuidor
        </button>
      </div>

      {/* Editor modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setEditing(null); setIsNew(false); }} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative glass rounded-3xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{isNew ? "Nuevo distribuidor" : "Editar distribuidor"}</h2>
                <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-dark-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Nombre *</label>
                  <input className={inputCls} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Nombre de la náutica" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Dirección *</label>
                  <input className={inputCls} value={editing.address} onChange={(e) => setEditing({ ...editing, address: e.target.value })} placeholder="Av. Ejemplo 1234" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Provincia *</label>
                  <input className={inputCls} value={editing.province} onChange={(e) => setEditing({ ...editing, province: e.target.value })} placeholder="Buenos Aires" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Teléfono *</label>
                    <input className={inputCls} value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} placeholder="11 1234-5678" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">WhatsApp</label>
                    <input className={inputCls} value={editing.whatsapp || ""} onChange={(e) => setEditing({ ...editing, whatsapp: e.target.value })} placeholder="5491112345678" />
                  </div>
                </div>
                <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 gradient-red text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20">
                  <Save className="h-5 w-5" />{isNew ? "Crear" : "Guardar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grouped list */}
      {Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b)).map(([province, list]) => (
        <div key={province} className="mb-8">
          <h2 className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4" /> {province} <span className="text-dark-500 font-normal">({list.length})</span>
          </h2>
          <div className="space-y-2">
            {list.map((d, i) => (
              <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass rounded-xl p-4 flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm">{d.name}</h3>
                  <p className="text-dark-500 text-xs truncate">{d.address}</p>
                </div>
                <div className="flex items-center gap-2 text-dark-400 text-xs">
                  <Phone className="h-3 w-3" /> {d.phone}
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditing({ ...d }); setIsNew(false); }} className="p-2 rounded-lg hover:bg-white/10 text-dark-400 hover:text-white"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(d.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-dark-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
