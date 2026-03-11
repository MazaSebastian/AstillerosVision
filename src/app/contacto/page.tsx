"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, MessageCircle, Clock } from "lucide-react";
import { CONTACT_INFO, boatModels } from "@/lib/mock-data";
import AuroraBackground from "@/components/ui/AuroraBackground";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactoPage() {
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nombre = data.get("nombre") as string;
    const email = data.get("email") as string;
    const telefono = data.get("telefono") as string;
    const modelo = data.get("modelo") as string;
    const mensaje = data.get("mensaje") as string;

    const subject = encodeURIComponent(`Consulta Web - ${modelo || "General"}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nModelo de interés: ${modelo || "No especificado"}\n\nMensaje:\n${mensaje}`
    );
    window.open(`mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`);
    setSent(true);
  };

  return (
    <div>
      <AuroraBackground />
      <section className="section-padding pt-32">
        <div className="container-max text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">{t("contacto", "title")}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-dark-400 max-w-xl mx-auto mb-12">
            {t("contacto", "desc")}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-3">
              {sent ? (
                <div className="glass-red rounded-2xl p-12 text-center glow-red">
                  <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="h-8 w-8 text-brand-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">¡Consulta Enviada!</h3>
                  <p className="text-dark-400">Te responderemos a la brevedad.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-dark-400 mb-1.5">Nombre completo *</label>
                      <input name="nombre" required
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-brand-500/50 focus:outline-none transition-colors"
                        placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className="block text-sm text-dark-400 mb-1.5">Email *</label>
                      <input name="email" type="email" required
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-brand-500/50 focus:outline-none transition-colors"
                        placeholder="tu@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm text-dark-400 mb-1.5">Teléfono</label>
                      <input name="telefono"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-brand-500/50 focus:outline-none transition-colors"
                        placeholder="+54 11 1234-5678" />
                    </div>
                    <div>
                      <label className="block text-sm text-dark-400 mb-1.5">Modelo de interés</label>
                      <select name="modelo"
                        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white focus:border-brand-500/50 focus:outline-none transition-colors appearance-none">
                        <option value="">Seleccionar modelo</option>
                        {boatModels.map((m) => (
                          <option key={m.id} value={m.name}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-dark-400 mb-1.5">Mensaje *</label>
                    <textarea name="mensaje" required rows={4}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-dark-500 focus:border-brand-500/50 focus:outline-none transition-colors resize-none"
                      placeholder="Contanos qué te gustaría saber..." />
                  </div>
                  <button type="submit"
                    className="w-full gradient-red hover:opacity-90 text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" /> Enviar Consulta
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4 text-brand-400">Información de Contacto</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-500 mt-0.5 shrink-0" />
                    <span className="text-dark-300">{CONTACT_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-brand-500 shrink-0" />
                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-dark-300 hover:text-brand-400 transition-colors">{CONTACT_INFO.phone}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-brand-500 shrink-0" />
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-dark-300 hover:text-brand-400 transition-colors">{CONTACT_INFO.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-brand-500 shrink-0" />
                    <span className="text-dark-300">Lunes a Viernes 9:00 - 18:00</span>
                  </div>
                </div>
              </div>

              <a href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent("Hola, me interesa consultar sobre embarcaciones Visión.")}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 glass rounded-2xl p-6 hover:border-green-500/20 transition-all group">
                <div className="w-12 h-12 bg-[#25D366]/20 rounded-xl flex items-center justify-center group-hover:bg-[#25D366]/30 transition-colors">
                  <MessageCircle className="h-6 w-6 text-[#25D366]" />
                </div>
                <div>
                  <p className="font-semibold group-hover:text-[#25D366] transition-colors">WhatsApp Directo</p>
                  <p className="text-xs text-dark-400">Respuesta más rápida</p>
                </div>
              </a>

              <div className="glass rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3288.5!2d-58.5567!3d-34.4376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSan+Fernando!5e0!3m2!1ses!2sar!4v1"
                  width="100%" height="200" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale opacity-70" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
