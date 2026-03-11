"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { CONTACT_INFO } from "@/lib/mock-data";

export default function WhatsAppButton() {
  const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(
    "Hola, me interesa consultar sobre embarcaciones Visión."
  )}`;

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 gradient-red hover:opacity-90 text-white p-4 rounded-full shadow-lg shadow-brand-500/30 hover:shadow-xl hover:shadow-brand-500/40 transition-all duration-300 hover:scale-110"
      aria-label="WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  );
}
