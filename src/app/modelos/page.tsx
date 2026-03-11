"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Filter } from "lucide-react";
import { boatModels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import VideoBackground from "@/components/ui/VideoBackground";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5 },
  }),
};

export default function ModelosPage() {
  const [filter, setFilter] = useState("all");
  const { t } = useLanguage();

  const catKeys = [
    { value: "all", key: "all" },
    { value: "15-pies", key: "15pies" },
    { value: "18-pies", key: "18pies" },
    { value: "20-pies", key: "20pies" },
  ];

  const filtered = filter === "all" ? boatModels : boatModels.filter((m) => m.category === filter);

  return (
    <div>
      <VideoBackground src="/videomodelos.mov" />

      <section className="relative pt-32 pb-12">
        <div className="container-max relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold mb-4">
            {t("modelos", "title")} <span className="gradient-text">{t("modelos", "title2")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-xl mx-auto mb-8">
            {t("modelos", "desc")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center gap-2 flex-wrap justify-center">
            <Filter className="h-4 w-4 text-dark-500 mr-1" />
            {catKeys.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                  filter === cat.value
                    ? "gradient-red text-white shadow-lg shadow-brand-500/20"
                    : "glass text-dark-300 hover:text-white hover:bg-white/[0.08]"
                )}
              >
                {t("modelos", cat.key)}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((model, i) => (
              <motion.div key={model.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} layout>
                <Link href={`/modelos/${model.slug}`} className="block glass rounded-2xl overflow-hidden group hover:border-brand-500/20 transition-all duration-500 hover:glow-red-sm">
                  <div className="relative h-52 bg-dark-900 overflow-hidden">
                    <img src={model.heroImage} alt={model.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-3 left-3 glass px-3 py-1 rounded-full text-xs text-dark-200 z-10">
                      {model.category === "15-pies" ? t("modelos", "15pies") : model.category === "18-pies" ? t("modelos", "18pies") : t("modelos", "20pies")}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold group-hover:text-brand-400 transition-colors mb-1">{model.name}</h3>
                    <p className="text-sm text-dark-400 mb-4">{model.tagline}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-dark-500 mb-4">
                      <span>Eslora: {model.specs.eslora}</span>
                      <span>Motor: {model.specs.motorizacion}</span>
                    </div>
                    <div className="flex items-center gap-1 text-brand-400 text-sm font-medium group-hover:gap-2 transition-all">
                      {t("modelos", "viewDetails")}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
