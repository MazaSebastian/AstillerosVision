"use client";

import { use, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Send, Phone } from "lucide-react";
import { boatModels, CONTACT_INFO } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default function ModelDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const model = boatModels.find((m) => m.slug === slug);
  if (!model) notFound();

  const [selectedImage, setSelectedImage] = useState(model.heroImage);

  const specEntries = [
    ["Material del Casco", model.specs.material],
    ["Eslora Total", model.specs.eslora],
    ["Manga Total", model.specs.manga],
    ["Puntal", model.specs.puntal],
    ["Calado", model.specs.calado],
    ["Capacidad", `${model.specs.capacidad} personas`],
    ["Motorización", model.specs.motorizacion],
    ["Combustible", model.specs.combustible],
    ["Uso", model.specs.uso],
  ];

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
    `Hola, me interesa consultar sobre la ${model.name}.`
  )}`;

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/modelos"
              className="inline-flex items-center gap-2 text-sm text-dark-400 hover:text-brand-400 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver a Modelos
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/3] bg-dark-900 rounded-2xl glass overflow-hidden relative">
                <img
                  src={selectedImage}
                  alt={model.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  key={selectedImage}
                />
                {model.isNew && (
                  <div className="absolute top-4 right-4 gradient-red text-white text-sm font-bold px-4 py-1.5 rounded-full z-10 shadow-lg shadow-brand-500/30">
                    LANZAMIENTO
                  </div>
                )}
              </div>

              {model.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {model.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                        selectedImage === img
                          ? "border-brand-500 shadow-lg shadow-brand-500/20"
                          : "border-white/10 hover:border-white/30"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${model.name} - ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-400 mb-3">
                  Colores Disponibles
                </h4>
                <div className="flex flex-wrap gap-2">
                  {model.colors.map((color) => (
                    <span
                      key={color}
                      className="glass px-4 py-2 rounded-lg text-sm text-dark-200"
                    >
                      {color}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-dark-500 mt-2">
                  Consulte por personalizaciones de color a gusto
                </p>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {model.name}
              </h1>
              <p className="text-brand-400 font-medium mb-4">{model.tagline}</p>
              <p className="text-dark-300 leading-relaxed mb-8">
                {model.description}
              </p>

              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-400 mb-4">
                  Especificaciones Técnicas
                </h3>
                <div className="glass rounded-xl overflow-hidden">
                  {specEntries.map(([label, value], i) => (
                    <div
                      key={label}
                      className={`flex justify-between items-center px-5 py-3 text-sm ${
                        i % 2 === 0 ? "bg-white/[0.02]" : ""
                      }`}
                    >
                      <span className="text-dark-400">{label}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-400 mb-4">
                  Equipamiento Estándar
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {model.equipment.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 text-sm text-dark-300"
                    >
                      <Check className="h-4 w-4 text-brand-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  className="flex items-center justify-center gap-2 gradient-red hover:opacity-90 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-brand-500/25"
                >
                  <Send className="h-4 w-4" />
                  Solicitar Cotización
                </Link>
                <Link
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="flex items-center justify-center gap-2 glass hover:bg-white/[0.08] px-6 py-3.5 rounded-xl font-semibold transition-all"
                >
                  <Phone className="h-4 w-4" />
                  Llamar
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
