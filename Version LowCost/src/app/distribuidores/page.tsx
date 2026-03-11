"use client";

import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";
import { distributors } from "@/lib/mock-data";
import VideoBackground from "@/components/ui/VideoBackground";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5 },
  }),
};

const grouped = distributors.reduce((acc, d) => {
  if (!acc[d.province]) acc[d.province] = [];
  acc[d.province].push(d);
  return acc;
}, {} as Record<string, typeof distributors>);

export default function DistribuidoresPage() {
  const { t } = useLanguage();
  return (
    <div>
      <VideoBackground src="/videofinal.mov" />

      {/* Hero */}
      <section className="relative pt-32 pb-12">
        <div className="container-max relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold mb-4">
            {t("distribuidores", "title")} <span className="gradient-text">{t("distribuidores", "title2")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-xl mx-auto mb-12">
            {t("distribuidores", "desc")} {distributors.length} {t("distribuidores", "descSuffix")}
          </motion.p>

          {Object.entries(grouped).map(([province, dists]) => (
            <div key={province} className="mb-10">
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
                className="text-lg font-semibold text-brand-400 mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {province}
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {dists.map((d, i) => (
                  <motion.div key={d.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                    className="glass rounded-xl p-5 hover:border-brand-500/20 transition-all duration-500 group hover:glow-red-sm">
                    <h3 className="font-semibold mb-2 group-hover:text-brand-400 transition-colors">{d.name}</h3>
                    <p className="text-sm text-dark-400 mb-3">{d.address}</p>
                    <a href={`tel:${d.phone}`} className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 transition-colors">
                      <Phone className="h-3.5 w-3.5" />
                      {d.phone}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
