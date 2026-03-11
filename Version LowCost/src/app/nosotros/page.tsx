"use client";

import { motion } from "framer-motion";
import { Compass, Paintbrush, Shield, Wrench, Anchor, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const values = [
  { icon: Shield, title: "Calidad IRAM", desc: "Implementamos normas de calidad para garantizar la seguridad y durabilidad de cada embarcación." },
  { icon: Compass, title: "Diseño con Autocad", desc: "Utilizamos tecnología de avanzada con diseñadores industriales para cada modelo." },
  { icon: Paintbrush, title: "Pintura Premium", desc: "Hornos diseñados para colores únicos. Personalizamos a gusto del cliente." },
  { icon: Wrench, title: "Ensamble de Precisión", desc: "Cada embarcación es ensamblada y controlada con rigor para la máxima calidad." },
  { icon: Award, title: "Garantía", desc: "Respaldamos cada producto con garantía y servicio de post-venta integral." },
  { icon: Anchor, title: "Experiencia", desc: "Más de 20 años fabricando embarcaciones nos respaldan en el mercado náutico." },
];

import VideoBackground from "@/components/ui/VideoBackground";

export default function NosotrosPage() {
  const { t } = useLanguage();
  return (
    <div>
      <VideoBackground src="/videofabricacion.mov" />

      {/* Hero */}
      <section className="relative pt-32 pb-12">
        <div className="container-max relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold mb-4">
            {t("nosotros", "title")} <span className="gradient-text">{t("nosotros", "title2")}</span>
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-3xl mx-auto">
            <p className="text-dark-300 leading-relaxed mb-4">
              {t("nosotros", "p1")}
            </p>
            <p className="text-dark-300 leading-relaxed">
              {t("nosotros", "p2")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
        <div className="absolute inset-0 bg-white/[0.01]" />
        <div className="container-max relative">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
            className="text-2xl md:text-3xl font-bold mb-12 text-center">
            ¿Por qué <span className="gradient-text">elegirnos</span>?
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                className="glass rounded-2xl p-6 hover:border-brand-500/20 transition-all duration-500 group hover:glow-red-sm">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500/20 transition-colors">
                  <v.icon className="h-6 w-6 text-brand-400" />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-brand-400 transition-colors">{v.title}</h3>
                <p className="text-sm text-dark-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} custom={0} className="text-2xl md:text-3xl font-bold mb-6">
              Proceso de <span className="gradient-text">Fabricación</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-dark-400 max-w-2xl mx-auto mb-12">
              Nuestro proceso productivo garantiza que cada embarcación cumpla con los más altos estándares. Material del casco P.R.F.V.
              (Plástico Reforzado con Fibra de Vidrio) por normas IRAM.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "01", title: "Diseño", desc: "Autocad + Diseñadores industriales" },
              { step: "02", title: "Laminado", desc: "Fibra de vidrio por normas IRAM" },
              { step: "03", title: "Pintura", desc: "Hornos especiales para colores únicos" },
              { step: "04", title: "Ensamble", desc: "Control de calidad final" },
            ].map((s, i) => (
              <motion.div key={s.step} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 2}
                className="glass rounded-2xl p-6 relative hover:border-brand-500/20 transition-all hover:glow-red-sm">
                <span className="text-5xl font-black text-brand-500/10 absolute top-4 right-4">{s.step}</span>
                <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-sm text-dark-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
