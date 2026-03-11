"use client";

import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { Plus, Trash2, Edit2, X, Save, GripVertical } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { ProcessCard, ValueCard } from "@/context/AdminContext";

const iconOptions = ["Compass", "Paintbrush", "Wrench", "Shield", "Anchor", "Award", "Star", "Zap", "Heart", "Target", "Settings", "CheckCircle"];

export default function AdminTarjetas() {
  const { content, updateContent } = useAdmin();
  const [processCards, setProcessCards] = useState<ProcessCard[]>(content.processCards);
  const [valueCards, setValueCards] = useState<ValueCard[]>(content.valueCards);
  const [editing, setEditing] = useState<ProcessCard | ValueCard | null>(null);
  const [editType, setEditType] = useState<"process" | "value">("process");
  const [isNew, setIsNew] = useState(false);

  const inputCls = "w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all text-sm";

  const saveProcess = (cards: ProcessCard[]) => { setProcessCards(cards); updateContent("processCards", cards); };
  const saveValues = (cards: ValueCard[]) => { setValueCards(cards); updateContent("valueCards", cards); };

  const handleSave = () => {
    if (!editing) return;
    if (editType === "process") {
      const card = editing as ProcessCard;
      if (isNew) {
        saveProcess([...processCards, { ...card, id: `pc-${Date.now()}` }]);
      } else {
        saveProcess(processCards.map((c) => c.id === card.id ? card : c));
      }
    } else {
      const card = editing as ValueCard;
      if (isNew) {
        saveValues([...valueCards, { ...card, id: `vc-${Date.now()}` }]);
      } else {
        saveValues(valueCards.map((c) => c.id === card.id ? card : c));
      }
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id: string, type: "process" | "value") => {
    if (type === "process") saveProcess(processCards.filter((c) => c.id !== id));
    else saveValues(valueCards.filter((c) => c.id !== id));
  };

  const openNew = (type: "process" | "value") => {
    setEditType(type);
    setEditing({ id: "", icon: "Star", title: "", desc: "" });
    setIsNew(true);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Tarjetas</h1>
        <p className="text-dark-400">Gestioná las tarjetas interactivas del sitio. Podés arrastrar para reordenar.</p>
      </div>

      {/* Editor modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setEditing(null); setIsNew(false); }} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative glass rounded-3xl p-8 max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{isNew ? "Nueva tarjeta" : "Editar tarjeta"}</h2>
                <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-dark-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Ícono</label>
                  <div className="grid grid-cols-6 gap-2">
                    {iconOptions.map((icon) => (
                      <button key={icon} onClick={() => setEditing({ ...editing, icon })} className={`p-3 rounded-xl text-xs text-center transition-all ${editing.icon === icon ? "gradient-red text-white" : "glass text-dark-400 hover:text-white hover:bg-white/5"}`}>
                        {icon.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Título *</label>
                  <input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Título de la tarjeta" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Descripción *</label>
                  <textarea rows={3} className={inputCls + " resize-none"} value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} placeholder="Descripción de la tarjeta" />
                </div>
                <button onClick={handleSave} className="w-full flex items-center justify-center gap-2 gradient-red text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20">
                  <Save className="h-5 w-5" />{isNew ? "Crear" : "Guardar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Process Cards */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Tarjetas de Proceso de Fabricación</h2>
          <button onClick={() => openNew("process")} className="flex items-center gap-2 glass text-dark-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/5 transition-all">
            <Plus className="h-4 w-4" /> Agregar
          </button>
        </div>
        <Reorder.Group axis="y" values={processCards} onReorder={saveProcess} className="space-y-3">
          {processCards.map((card) => (
            <Reorder.Item key={card.id} value={card} className="glass rounded-xl p-5 flex items-center gap-4 group cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-dark-600 flex-shrink-0" />
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-brand-400 text-xs font-bold">{card.icon.slice(0, 2)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold">{card.title}</h3>
                <p className="text-dark-500 text-xs truncate">{card.desc}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing({ ...card }); setEditType("process"); setIsNew(false); }} className="p-2 rounded-lg hover:bg-white/10 text-dark-400 hover:text-white"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(card.id, "process")} className="p-2 rounded-lg hover:bg-red-500/10 text-dark-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      {/* Value Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Tarjetas de ¿Por qué elegirnos?</h2>
          <button onClick={() => openNew("value")} className="flex items-center gap-2 glass text-dark-300 hover:text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/5 transition-all">
            <Plus className="h-4 w-4" /> Agregar
          </button>
        </div>
        <Reorder.Group axis="y" values={valueCards} onReorder={saveValues} className="space-y-3">
          {valueCards.map((card) => (
            <Reorder.Item key={card.id} value={card} className="glass rounded-xl p-5 flex items-center gap-4 group cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-dark-600 flex-shrink-0" />
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400 text-xs font-bold">{card.icon.slice(0, 2)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold">{card.title}</h3>
                <p className="text-dark-500 text-xs truncate">{card.desc}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setEditing({ ...card }); setEditType("value"); setIsNew(false); }} className="p-2 rounded-lg hover:bg-white/10 text-dark-400 hover:text-white"><Edit2 className="h-4 w-4" /></button>
                <button onClick={() => handleDelete(card.id, "value")} className="p-2 rounded-lg hover:bg-red-500/10 text-dark-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
}
