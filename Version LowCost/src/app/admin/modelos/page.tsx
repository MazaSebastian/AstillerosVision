"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, X, Save, Ship } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { BoatModel } from "@/lib/types";

const categoryOpts: BoatModel["category"][] = ["15-pies", "18-pies", "20-pies"];

const emptyModel: BoatModel = {
  id: "", slug: "", name: "", tagline: "", description: "", category: "15-pies", isNew: false,
  specs: { eslora: "", manga: "", puntal: "", calado: "", capacidad: 0, motorizacion: "", combustible: "", uso: "", material: "P.R.F.V." },
  equipment: [], colors: [], images: [], heroImage: "",
};

export default function AdminModelos() {
  const { content, updateContent } = useAdmin();
  const [models, setModels] = useState<BoatModel[]>(content.boatModels);
  const [editing, setEditing] = useState<BoatModel | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [equipText, setEquipText] = useState("");
  const [colorsText, setColorsText] = useState("");
  const [imagesText, setImagesText] = useState("");

  const inputCls = "w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all text-sm";

  const openEditor = (model: BoatModel, isNewModel: boolean) => {
    setEditing({ ...model, specs: { ...model.specs } });
    setIsNew(isNewModel);
    setEquipText(model.equipment.join("\n"));
    setColorsText(model.colors.join(", "));
    setImagesText(model.images.join("\n"));
  };

  const saveAll = (updated: BoatModel[]) => {
    setModels(updated);
    updateContent("boatModels", updated);
  };

  const handleSave = () => {
    if (!editing) return;
    const final: BoatModel = {
      ...editing,
      slug: editing.slug || editing.name.toLowerCase().replace(/\s+/g, "-"),
      equipment: equipText.split("\n").map((s) => s.trim()).filter(Boolean),
      colors: colorsText.split(",").map((s) => s.trim()).filter(Boolean),
      images: imagesText.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    if (isNew) {
      final.id = `model-${Date.now()}`;
      saveAll([...models, final]);
    } else {
      saveAll(models.map((m) => (m.id === final.id ? final : m)));
    }
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = (id: string) => {
    saveAll(models.filter((m) => m.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Modelos</h1>
          <p className="text-dark-400">{models.length} modelos registrados</p>
        </div>
        <button onClick={() => openEditor({ ...emptyModel }, true)} className="flex items-center gap-2 gradient-red text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20">
          <Plus className="h-4 w-4" /> Agregar modelo
        </button>
      </div>

      {/* Editor modal */}
      <AnimatePresence>
        {editing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-start justify-center px-4 py-8 overflow-y-auto">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => { setEditing(null); setIsNew(false); }} />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative glass rounded-3xl p-8 max-w-2xl w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">{isNew ? "Nuevo modelo" : `Editar ${editing.name}`}</h2>
                <button onClick={() => { setEditing(null); setIsNew(false); }} className="text-dark-400 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                {/* Basic info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Nombre *</label>
                    <input className={inputCls} value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} placeholder="Visión 180 Deluxe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Slug</label>
                    <input className={inputCls} value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="vision-180-deluxe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Tagline</label>
                  <input className={inputCls} value={editing.tagline} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} placeholder="Frase descriptiva corta" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Descripción</label>
                  <textarea rows={3} className={inputCls + " resize-none"} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Categoría</label>
                    <select className={inputCls} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as BoatModel["category"] })}>
                      {categoryOpts.map((c) => <option key={c} value={c} className="bg-dark-900">{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-300 mb-2">Imagen Hero (URL)</label>
                    <input className={inputCls} value={editing.heroImage} onChange={(e) => setEditing({ ...editing, heroImage: e.target.value })} placeholder="/images/modelos/..." />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="isNew" checked={editing.isNew || false} onChange={(e) => setEditing({ ...editing, isNew: e.target.checked })} className="accent-brand-500" />
                  <label htmlFor="isNew" className="text-sm text-dark-300">Marcar como Lanzamiento</label>
                </div>

                {/* Specs */}
                <h3 className="text-sm font-semibold text-brand-400 uppercase tracking-wider pt-2">Especificaciones</h3>
                <div className="grid grid-cols-2 gap-4">
                  {(["eslora", "manga", "puntal", "calado", "motorizacion", "combustible", "uso", "material"] as const).map((key) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-dark-400 mb-1 capitalize">{key}</label>
                      <input className={inputCls} value={editing.specs[key]} onChange={(e) => setEditing({ ...editing, specs: { ...editing.specs, [key]: e.target.value } })} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium text-dark-400 mb-1">Capacidad (personas)</label>
                    <input type="number" className={inputCls} value={editing.specs.capacidad || ""} onChange={(e) => setEditing({ ...editing, specs: { ...editing.specs, capacidad: Number(e.target.value) } })} />
                  </div>
                </div>

                {/* Lists */}
                <h3 className="text-sm font-semibold text-brand-400 uppercase tracking-wider pt-2">Equipamiento (1 por línea)</h3>
                <textarea rows={5} className={inputCls + " resize-none font-mono text-xs"} value={equipText} onChange={(e) => setEquipText(e.target.value)} placeholder="Volante de cuero&#10;Luces de navegación&#10;..." />

                <h3 className="text-sm font-semibold text-brand-400 uppercase tracking-wider pt-2">Colores (separados por coma)</h3>
                <input className={inputCls} value={colorsText} onChange={(e) => setColorsText(e.target.value)} placeholder="Blanco, Azul, Negro" />

                <h3 className="text-sm font-semibold text-brand-400 uppercase tracking-wider pt-2">Imágenes (1 URL por línea)</h3>
                <textarea rows={3} className={inputCls + " resize-none font-mono text-xs"} value={imagesText} onChange={(e) => setImagesText(e.target.value)} placeholder="/images/modelos/img1.jpeg&#10;/images/modelos/img2.jpeg" />
              </div>

              <button onClick={handleSave} className="w-full mt-6 flex items-center justify-center gap-2 gradient-red text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20">
                <Save className="h-5 w-5" />{isNew ? "Crear modelo" : "Guardar cambios"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Model list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model, i) => (
          <motion.div key={model.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="glass rounded-2xl overflow-hidden group">
            <div className="h-36 bg-dark-800/50 relative">
              {model.heroImage && <img src={model.heroImage} alt={model.name} className="absolute inset-0 w-full h-full object-cover" />}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 to-transparent" />
              {model.isNew && <span className="absolute top-3 right-3 gradient-red text-white text-xs font-bold px-3 py-1 rounded-full">NUEVO</span>}
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-bold">{model.name}</h3>
                  <p className="text-dark-500 text-xs">{model.category} · {model.specs.eslora} · {model.specs.motorizacion}</p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEditor(model, false)} className="p-2 rounded-lg hover:bg-white/10 text-dark-400 hover:text-white transition-all">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(model.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-dark-400 hover:text-red-400 transition-all">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
