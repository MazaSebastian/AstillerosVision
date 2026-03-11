"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, Video } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import type { VideoConfig } from "@/context/AdminContext";

const videoPages: { key: keyof VideoConfig; label: string }[] = [
  { key: "home", label: "Página Principal" },
  { key: "modelos", label: "Modelos" },
  { key: "nosotros", label: "Nosotros" },
  { key: "distribuidores", label: "Distribuidores" },
  { key: "postVenta", label: "Post-Venta" },
];

export default function AdminVideos() {
  const { content, updateContent } = useAdmin();
  const [videos, setVideos] = useState<VideoConfig>(content.videos);
  const [saved, setSaved] = useState(false);

  useEffect(() => { setVideos(content.videos); }, [content.videos]);

  const handleSave = () => {
    updateContent("videos", videos);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputCls = "w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all text-sm";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Videos</h1>
          <p className="text-dark-400">Configurá las URLs de los videos de fondo de cada página</p>
        </div>
        <button onClick={handleSave} className="flex items-center gap-2 gradient-red text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-brand-500/20">
          <Save className="h-4 w-4" />{saved ? "Guardado" : "Guardar cambios"}
        </button>
      </div>

      <div className="space-y-4">
        {videoPages.map((page, i) => (
          <motion.div key={page.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Video className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white">{page.label}</h3>
                <p className="text-xs text-dark-500">Video de fondo</p>
              </div>
            </div>
            <input
              className={inputCls}
              value={videos[page.key]}
              onChange={(e) => setVideos({ ...videos, [page.key]: e.target.value })}
              placeholder="/videohome.mov"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
