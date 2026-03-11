"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import {
  boatModels as defaultModels,
  distributors as defaultDistributors,
  accessories as defaultAccessories,
  storeProducts as defaultProducts,
  CONTACT_INFO as defaultContact,
} from "@/lib/mock-data";
import type { BoatModel, Distributor, Accessory, StoreProduct } from "@/lib/types";

/* ─── Types ─── */
export interface VideoConfig {
  home: string;
  modelos: string;
  nosotros: string;
  distribuidores: string;
  postVenta: string;
}

export interface ProcessCard {
  id: string;
  icon: string; // lucide icon name
  title: string;
  desc: string;
}

export interface ValueCard {
  id: string;
  icon: string;
  title: string;
  desc: string;
}

export interface SiteTexts {
  home: {
    heroBadge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaBtn: string;
  };
  nosotros: { p1: string; p2: string };
  contacto: { desc: string };
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
}

export interface SiteContent {
  boatModels: BoatModel[];
  distributors: Distributor[];
  accessories: Accessory[];
  products: StoreProduct[];
  videos: VideoConfig;
  processCards: ProcessCard[];
  valueCards: ValueCard[];
  siteTexts: SiteTexts;
  contactInfo: ContactInfo;
}

interface AdminContextType {
  content: SiteContent;
  updateContent: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
  resetToDefaults: () => void;
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

const STORAGE_KEY = "astillero-vision-admin";
const AUTH_KEY = "astillero-vision-auth";

const defaultVideos: VideoConfig = {
  home: "/videohome.mov",
  modelos: "/videomodelos.mov",
  nosotros: "/videofabricacion.mov",
  distribuidores: "/videofinal.mov",
  postVenta: "/videofabricacion.mov",
};

const defaultProcessCards: ProcessCard[] = [
  { id: "p1", icon: "Compass", title: "Diseño y Desarrollo", desc: "Tecnología Autocad con diseñadores industriales" },
  { id: "p2", icon: "Paintbrush", title: "Pintura y Laminado", desc: "Hornos diseñados para colores únicos y durabilidad" },
  { id: "p3", icon: "Wrench", title: "Terminación y Ensamble", desc: "Control de calidad como máxima expresión" },
  { id: "p4", icon: "Shield", title: "Normas de Calidad", desc: "Estándares IRAM para diferenciarnos en el mercado" },
];

const defaultValueCards: ValueCard[] = [
  { id: "v1", icon: "Shield", title: "Seguridad Certificada", desc: "Normas IRAM y estándares internacionales de fabricación naval." },
  { id: "v2", icon: "Anchor", title: "Calidad Naval", desc: "Materiales de primera línea para máxima durabilidad." },
  { id: "v3", icon: "Paintbrush", title: "Diseño Premium", desc: "Estética moderna con funcionalidad profesional." },
  { id: "v4", icon: "Wrench", title: "Post-Venta Integral", desc: "Servicio técnico, repuestos y accesorios originales." },
];

const defaultSiteTexts: SiteTexts = {
  home: {
    heroBadge: "Más de 20 años fabricando embarcaciones",
    heroTitle1: "Calidad y Seguridad",
    heroTitle2: "a Bordo",
    heroDesc: "Fabricamos embarcaciones con tecnología de avanzada y los más altos estándares de calidad. Desde San Fernando al país entero.",
    ctaTitle: "¿Listo para navegar?",
    ctaDesc: "Contactanos y recibí asesoramiento personalizado. Personalizamos tu embarcación a gusto.",
    ctaBtn: "Cotizá tu Embarcación",
  },
  nosotros: {
    p1: "Astillero Visión nace con la pasión por la náutica y el compromiso de fabricar embarcaciones que combinen calidad, seguridad y diseño. Desde nuestras instalaciones en San Fernando, Buenos Aires, producimos lanchas que navegan en ríos, lagos y mares de todo el país.",
    p2: "Cada día más familias, profesionales y apasionados de la náutica nos eligen por la calidad de nuestros productos. Con una línea de 14 modelos que van desde los 15 hasta los 21 pies, tenemos la embarcación ideal para cada tipo de navegante.",
  },
  contacto: {
    desc: "Envianos tu consulta y te responderemos a la brevedad. También podés contactarnos por WhatsApp para una respuesta más rápida.",
  },
};

function getDefaults(): SiteContent {
  return {
    boatModels: defaultModels,
    distributors: defaultDistributors,
    accessories: defaultAccessories,
    products: defaultProducts,
    videos: defaultVideos,
    processCards: defaultProcessCards,
    valueCards: defaultValueCards,
    siteTexts: defaultSiteTexts,
    contactInfo: { ...defaultContact },
  };
}

function loadContent(): SiteContent {
  if (typeof window === "undefined") return getDefaults();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaults();
    const parsed = JSON.parse(raw);
    const defaults = getDefaults();
    // Merge with defaults to handle new fields added over time
    return { ...defaults, ...parsed };
  } catch {
    return getDefaults();
  }
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(getDefaults);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setContent(loadContent());
    setIsAuthenticated(sessionStorage.getItem(AUTH_KEY) === "true");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    }
  }, [content, hydrated]);

  const updateContent = useCallback(<K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetToDefaults = useCallback(() => {
    const defaults = getDefaults();
    setContent(defaults);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const login = useCallback((user: string, pass: string): boolean => {
    if (user === "admin" && pass === "vision2024") {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_KEY);
  }, []);

  if (!hydrated) return null;

  return (
    <AdminContext.Provider value={{ content, updateContent, resetToDefaults, isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
