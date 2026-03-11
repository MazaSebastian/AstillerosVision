"use client";

import VideoBackground from "@/components/ui/VideoBackground";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChevronRight,
  Compass,
  Paintbrush,
  Shield,
  Wrench,
  MapPin,
  ArrowRight,
  Handshake,
  Send,
  CheckCircle,
} from "lucide-react";
import { boatModels, distributors } from "@/lib/mock-data";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const featuredModels = boatModels.filter((m) =>
  ["vision-195-boss-ex", "vision-212-boss-ex-wc", "vision-180-deluxe"].includes(m.id)
);

const processIcons = [Compass, Paintbrush, Wrench, Shield];
const processKeys = ["feature1", "feature2", "feature3", "feature4"];

function DistributorForm() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="section-padding relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
      <div className="container-max">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
          <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 glass-red px-4 py-2 rounded-full text-sm text-brand-300 mb-6">
            <Handshake className="h-4 w-4" />
            {t("home", "joinBadge")}
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-2xl md:text-4xl font-bold mb-4">
            {t("home", "joinTitle")} <span className="gradient-text">{t("home", "joinTitle2")}</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-dark-400 max-w-2xl mx-auto">
            {t("home", "joinDesc")}
          </motion.p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-12 text-center">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">{t("home", "joinSuccess")}</h3>
              <p className="text-dark-400">{t("home", "joinSuccessDesc")}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-10 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">{t("home", "joinCompany")} *</label>
                  <input type="text" required placeholder={t("home", "joinCompanyPh")} className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">{t("home", "joinContact")} *</label>
                  <input type="text" required placeholder={t("home", "joinContactPh")} className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">{t("home", "joinCity")} *</label>
                  <input type="text" required placeholder={t("home", "joinCityPh")} className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">{t("home", "joinPhone")} *</label>
                  <input type="tel" required placeholder={t("home", "joinPhonePh")} className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">{t("home", "joinEmail")} *</label>
                <input type="email" required placeholder={t("home", "joinEmailPh")} className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-300 mb-2">{t("home", "joinMessage")}</label>
                <textarea rows={4} placeholder={t("home", "joinMsgPh")} className="w-full bg-dark-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-dark-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/30 transition-all resize-none" />
              </div>
              <button type="submit" className="w-full flex items-center justify-center gap-2 gradient-red text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30">
                <Send className="h-5 w-5" />
                {t("home", "joinSubmit")}
              </button>
              <p className="text-dark-500 text-xs text-center">{t("home", "joinRequired")}</p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <>
      <VideoBackground src="/videohome.mov" />

      {/* ─── Hero ─── */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 glass-red px-4 py-2 rounded-full text-sm text-brand-300 mb-6">
              <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              {t("home", "heroBadge")}
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {t("home", "heroTitle1")}{" "}
            <span className="gradient-text">{t("home", "heroTitle2")}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="text-lg md:text-xl text-dark-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("home", "heroDesc")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/modelos" className="gradient-red hover:opacity-90 text-white px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-lg shadow-brand-500/20 hover:shadow-xl hover:shadow-brand-500/30 flex items-center justify-center gap-2">
              {t("home", "heroBtn1")}
              <ChevronRight className="h-5 w-5" />
            </Link>
            <Link href="/contacto" className="glass hover:bg-white/[0.08] px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2">
              {t("home", "heroBtn2")}
            </Link>
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-brand-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* ─── Featured Models ─── */}
      <section className="section-padding relative">
        <div className="container-max relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
              {t("home", "featuredTitle")} <span className="gradient-text">{t("home", "featuredTitle2")}</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredModels.map((model, i) => (
              <motion.div key={model.id} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} custom={i + 1}>
                <Link href={`/modelos/${model.slug}`} className="block glass rounded-2xl overflow-hidden group hover:border-brand-500/20 transition-all duration-500 hover:glow-red-sm">
                  <div className="relative h-56 bg-dark-900 overflow-hidden">
                    <img src={model.heroImage} alt={model.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold group-hover:text-brand-400 transition-colors mb-1">{model.name}</h3>
                    <p className="text-sm text-dark-400 mb-4">{model.tagline}</p>
                    <div className="flex items-center justify-between text-xs text-dark-500">
                      <span>Eslora: {model.specs.eslora}</span>
                      <span>{model.specs.motorizacion}</span>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-brand-400 text-sm font-medium group-hover:gap-2 transition-all">
                      {t("home", "viewDetails")}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/modelos" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-semibold transition-colors">
              {t("home", "viewAll")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Fabrication Process ─── */}
      <section className="section-padding relative">
        <div className="container-max relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
              {t("home", "processTitle")}{" "}
              <span className="gradient-text">{t("home", "processTitle2")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-dark-400 max-w-xl mx-auto">
              {t("home", "processDesc")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processKeys.map((key, i) => {
              const Icon = processIcons[i];
              return (
                <motion.div
                  key={key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="glass rounded-2xl p-6 text-center hover:border-brand-500/20 transition-all duration-500 group hover:glow-red-sm"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-brand-500/10 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                    <Icon className="h-7 w-7 text-brand-400" />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-brand-400 transition-colors">
                    {t("home", key)}
                  </h3>
                  <p className="text-sm text-dark-400">{t("home", `${key}Desc`)}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Distributors Preview ─── */}
      <section className="section-padding relative">
        <div className="container-max relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
              {t("home", "distTitle")}{" "}
              <span className="gradient-text">{t("home", "distTitle2")}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-dark-400 max-w-xl mx-auto">
              {distributors.length} {t("home", "distDesc")}
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {distributors.slice(0, 5).map((d, i) => (
              <motion.div key={d.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass rounded-xl p-4 text-center hover:border-brand-500/20 transition-all">
                <MapPin className="h-5 w-5 text-brand-400 mx-auto mb-2" />
                <p className="text-sm font-medium">{d.name}</p>
                <p className="text-xs text-dark-500">{d.province}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/distribuidores" className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-semibold transition-colors">
              {t("home", "distViewAll")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Sumate a nuestra Red ─── */}
      <DistributorForm />

      {/* ─── CTA Final ─── */}
      <section className="section-padding relative">
        <div className="container-max relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-red rounded-3xl p-8 md:p-16 text-center relative overflow-hidden glow-red">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(229,57,53,0.06),transparent_70%)]" />
            <motion.h2 variants={fadeUp} custom={0} className="relative text-3xl md:text-4xl font-bold mb-4">
              {t("home", "ctaTitle")}
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="relative text-dark-300 mb-8 max-w-lg mx-auto">
              {t("home", "ctaDesc")}
            </motion.p>
            <motion.div variants={fadeUp} custom={2} className="relative">
              <Link href="/contacto" className="inline-flex items-center gap-2 gradient-red hover:opacity-90 text-white px-10 py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg shadow-brand-500/25">
                {t("home", "ctaBtn")}
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
