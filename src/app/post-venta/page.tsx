"use client";

import { motion } from "framer-motion";
import { Wrench, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { accessories, CONTACT_INFO } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5 },
  }),
};

const accesoriosList = accessories.filter((a) => a.category === "accesorios");
const serviciosList = accessories.filter((a) => a.category === "servicios");

import VideoBackground from "@/components/ui/VideoBackground";
import { useLanguage } from "@/context/LanguageContext";

export default function PostVentaPage() {
  const { t } = useLanguage();
  return (
    <div>
      <VideoBackground src="/videofabricacion.mov" />

      <section className="section-padding pt-32">
        <div className="container-max text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold mb-4">
            {t("postVenta", "title")} <span className="gradient-text">{t("postVenta", "title2")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-xl mx-auto mb-12">
            {t("postVenta", "desc")}
          </motion.p>

          <div className="mb-16">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Package className="h-5 w-5 text-brand-400" /> Accesorios
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {accesoriosList.map((acc, i) => (
                <motion.div key={acc.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                  className="glass rounded-xl p-5 hover:border-brand-500/20 transition-all duration-500 group hover:glow-red-sm">
                  <h3 className="font-semibold mb-2 group-hover:text-brand-400 transition-colors">{acc.name}</h3>
                  <p className="text-sm text-dark-400 mb-4">{acc.description}</p>
                  <Link href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(`Hola, me interesa consultar sobre: ${acc.name}`)}`}
                    target="_blank" className="inline-flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 transition-colors">
                    Consultar <ArrowRight className="h-3 w-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-brand-400" /> Servicios
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {serviciosList.map((svc, i) => (
                <motion.div key={svc.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1}
                  className="glass rounded-xl p-5 hover:border-brand-500/20 transition-all duration-500 group hover:glow-red-sm">
                  <h3 className="font-semibold mb-2 group-hover:text-brand-400 transition-colors">{svc.name}</h3>
                  <p className="text-sm text-dark-400 mb-4">{svc.description}</p>
                  <Link href="/contacto" className="inline-flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 transition-colors">
                    Contactar <ArrowRight className="h-3 w-3" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
