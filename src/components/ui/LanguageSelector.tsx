"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/translations";

const options: { locale: Locale; flag: string; label: string; sublabel: string }[] = [
  { locale: "en", flag: "🇺🇸", label: "English", sublabel: "United States" },
  { locale: "pt", flag: "🇧🇷", label: "Português", sublabel: "Brasil" },
  { locale: "es", flag: "🇦🇷", label: "Español", sublabel: "Latinoamérica" },
];

export default function LanguageSelector() {
  const { showSelector, setLocale, dismissSelector, t } = useLanguage();

  const handleSelect = (locale: Locale) => {
    setLocale(locale);
    dismissSelector();
  };

  return (
    <AnimatePresence>
      {showSelector && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative glass rounded-3xl p-8 md:p-10 max-w-md w-full border border-white/10 shadow-2xl"
          >
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl gradient-red flex items-center justify-center shadow-lg shadow-brand-500/30">
                <Globe className="h-7 w-7 text-white" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-2">
              {t("langSelector", "title")}
            </h2>
            <p className="text-dark-400 text-sm text-center mb-8">
              Where are you visiting from? • De onde você nos visita? • ¿De dónde nos visitás?
            </p>

            {/* Options */}
            <div className="space-y-3">
              {options.map((opt) => (
                <button
                  key={opt.locale}
                  onClick={() => handleSelect(opt.locale)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-brand-500/30 transition-all duration-300 group"
                >
                  <span className="text-4xl">{opt.flag}</span>
                  <div className="text-left flex-1">
                    <p className="text-white font-semibold group-hover:text-brand-300 transition-colors">
                      {opt.label}
                    </p>
                    <p className="text-dark-500 text-sm">{opt.sublabel}</p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-all">
                    <span className="text-dark-500 group-hover:text-brand-400 text-sm transition-colors">→</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
