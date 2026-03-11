"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, RotateCcw } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { SiteTexts } from "@/context/AdminContext";

export default function AdminTextos() {
  const { content, updateContent } = useAdmin();
  const [texts, setTexts] = useState<SiteTexts>(content.siteTexts);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setTexts(content.siteTexts); }, [content.siteTexts]);

  const handleSave = () => {
    updateContent("siteTexts", texts);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls = "w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all text-sm";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Textos</h1>
          <p className="text-dark-400">Editá los textos principales de cada sección del sitio</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 gradient-red text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20">
          {saved ? <><RotateCcw className="h-4 w-4" />Guardado</> : <><Save className="h-4 w-4" />Guardar cambios</>}
        </button>
      </div>

      <div className="space-y-8">
        {/* Home */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-500 rounded-full" /> Página Principal
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Badge del Hero</label>
              <input className={inputCls} value={texts.home.heroBadge} onChange={(e) => setTexts({ ...texts, home: { ...texts.home, heroBadge: e.target.value } })} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Título Hero (parte 1)</label>
                <input className={inputCls} value={texts.home.heroTitle1} onChange={(e) => setTexts({ ...texts, home: { ...texts.home, heroTitle1: e.target.value } })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">Título Hero (parte 2 — gradient)</label>
                <input className={inputCls} value={texts.home.heroTitle2} onChange={(e) => setTexts({ ...texts, home: { ...texts.home, heroTitle2: e.target.value } })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Descripción Hero</label>
              <textarea rows={3} className={inputCls + " resize-none"} value={texts.home.heroDesc} onChange={(e) => setTexts({ ...texts, home: { ...texts.home, heroDesc: e.target.value } })} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">CTA Título</label>
                <input className={inputCls} value={texts.home.ctaTitle} onChange={(e) => setTexts({ ...texts, home: { ...texts.home, ctaTitle: e.target.value } })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">CTA Botón</label>
                <input className={inputCls} value={texts.home.ctaBtn} onChange={(e) => setTexts({ ...texts, home: { ...texts.home, ctaBtn: e.target.value } })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">CTA Descripción</label>
              <textarea rows={2} className={inputCls + " resize-none"} value={texts.home.ctaDesc} onChange={(e) => setTexts({ ...texts, home: { ...texts.home, ctaDesc: e.target.value } })} />
            </div>
          </div>
        </motion.div>

        {/* Nosotros */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-500 rounded-full" /> Nosotros
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Párrafo 1</label>
              <textarea rows={4} className={inputCls + " resize-none"} value={texts.nosotros.p1} onChange={(e) => setTexts({ ...texts, nosotros: { ...texts.nosotros, p1: e.target.value } })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Párrafo 2</label>
              <textarea rows={4} className={inputCls + " resize-none"} value={texts.nosotros.p2} onChange={(e) => setTexts({ ...texts, nosotros: { ...texts.nosotros, p2: e.target.value } })} />
            </div>
          </div>
        </motion.div>

        {/* Contacto */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-brand-500 rounded-full" /> Contacto
          </h2>
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">Descripción</label>
            <textarea rows={3} className={inputCls + " resize-none"} value={texts.contacto.desc} onChange={(e) => setTexts({ ...texts, contacto: { ...texts.contacto, desc: e.target.value } })} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
