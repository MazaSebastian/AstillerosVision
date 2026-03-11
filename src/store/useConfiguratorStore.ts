import { create } from "zustand";

/* ─── Configurator-specific types ─── */
export interface HullColor {
  id: string;
  name: string;
  hex: string;
}

export interface ConfigAccessory {
  id: string;
  name: string;
  description: string;
  price: number;
  modelPath?: string;
}

export interface ConfigBoatModel {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  length: string;
  beam: string;
  engine: string;
  capacity: number;
  colors: HullColor[];
  accessories: ConfigAccessory[];
}

/* ─── Configurator mock data ─── */
export const configBoatModels: ConfigBoatModel[] = [
  {
    id: "av-42",
    slug: "av-42-sport",
    name: "AV-42 Sport",
    tagline: "Velocidad y elegancia en alta mar",
    description:
      "La AV-42 Sport es nuestra embarcación insignia para quienes buscan adrenalina sin sacrificar el lujo. Con un casco de fibra de vidrio reforzada y un motor de alto rendimiento, esta lancha ofrece una experiencia de navegación incomparable.",
    basePrice: 185000,
    length: "42 pies",
    beam: "13.5 pies",
    engine: "Twin Mercury 400hp",
    capacity: 12,
    colors: [
      { id: "pearl-white", name: "Blanco Perla", hex: "#F5F5F0" },
      { id: "ocean-blue", name: "Azul Océano", hex: "#1B4F72" },
      { id: "midnight-black", name: "Negro Medianoche", hex: "#1C1C1E" },
      { id: "racing-red", name: "Rojo Racing", hex: "#C0392B" },
      { id: "titanium-gray", name: "Gris Titanio", hex: "#7B8A8B" },
    ],
    accessories: [
      { id: "acc-gps", name: "GPS Chartplotter Premium", description: "Navegación satelital con pantalla táctil de 12 pulgadas", price: 4500 },
      { id: "acc-sound", name: "Sistema de Sonido JL Audio Marine", description: "8 parlantes + subwoofer sumergible con Bluetooth 5.0", price: 3200 },
      { id: "acc-teak", name: "Plataforma de Teca", description: "Plataforma de popa en teca maciza con escalera retráctil", price: 6800 },
      { id: "acc-lights", name: "Iluminación LED Subacuática", description: "Sistema RGB con 6 luces LED para navegación nocturna", price: 2100 },
      { id: "acc-vhf", name: "VHF Radio", description: "Radio transmisor marino VHF montado en tablero de conducción", price: 1800, modelPath: "/models/vhf.glb" },
    ],
  },
  {
    id: "av-58",
    slug: "av-58-cruiser",
    name: "AV-58 Cruiser",
    tagline: "Tu hogar en el agua",
    description:
      "La AV-58 Cruiser redefine el concepto de crucero de lujo. Con camarotes espaciosos, una cocina completamente equipada y un flybridge con vista panorámica, es la embarcación ideal para travesías prolongadas con la familia.",
    basePrice: 420000,
    length: "58 pies",
    beam: "17 pies",
    engine: "Twin CAT C12.9 - 1000hp",
    capacity: 18,
    colors: [
      { id: "arctic-white", name: "Blanco Ártico", hex: "#FAFAFA" },
      { id: "navy-blue", name: "Azul Naval", hex: "#0C2340" },
      { id: "champagne", name: "Champagne", hex: "#D4AF37" },
      { id: "graphite", name: "Grafito", hex: "#3D3D3D" },
      { id: "emerald", name: "Esmeralda", hex: "#1A5632" },
    ],
    accessories: [
      { id: "acc-stabilizer", name: "Estabilizadores Giroscópicos Seakeeper", description: "Sistema anti-rolido para máximo confort en navegación", price: 28000 },
      { id: "acc-generator", name: "Generador Onan 17.5kW", description: "Generador silencioso para autonomía total a bordo", price: 15000 },
      { id: "acc-hydraulic", name: "Pasarela Hidráulica", description: "Pasarela automática de acero inoxidable de 2.5 metros", price: 8500 },
      { id: "acc-ac", name: "Aire Acondicionado Marine", description: "Sistema split de 48.000 BTU con control por zonas", price: 12000 },
      { id: "acc-tender", name: "Garage para Tender", description: "Compartimento integrado en popa para embarcación auxiliar", price: 22000 },
      { id: "acc-vhf", name: "VHF Radio", description: "Radio transmisor marino VHF montado en tablero de conducción", price: 1800, modelPath: "/models/vhf.glb" },
    ],
  },
];

/* ─── Store ─── */
interface ConfiguratorState {
  selectedBoat: ConfigBoatModel;
  selectedColorId: string;
  activeAccessoryIds: Set<string>;
  totalPrice: number;
  selectBoat: (boatId: string) => void;
  setColor: (colorId: string) => void;
  toggleAccessory: (accessoryId: string) => void;
  getPayload: () => { boat: string; color: string; accessories: string[]; totalPrice: number };
}

function calculateTotal(boat: ConfigBoatModel, accessoryIds: Set<string>): number {
  const accessoriesTotal = boat.accessories
    .filter((a) => accessoryIds.has(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  return boat.basePrice + accessoriesTotal;
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  selectedBoat: configBoatModels[0],
  selectedColorId: configBoatModels[0].colors[0].id,
  activeAccessoryIds: new Set<string>(),
  totalPrice: configBoatModels[0].basePrice,

  selectBoat: (boatId) => {
    const boat = configBoatModels.find((b) => b.id === boatId);
    if (!boat) return;
    const newAccessories = new Set<string>();
    set({
      selectedBoat: boat,
      selectedColorId: boat.colors[0].id,
      activeAccessoryIds: newAccessories,
      totalPrice: calculateTotal(boat, newAccessories),
    });
  },

  setColor: (colorId) => set({ selectedColorId: colorId }),

  toggleAccessory: (accessoryId) => {
    const { selectedBoat, activeAccessoryIds } = get();
    const next = new Set(activeAccessoryIds);
    if (next.has(accessoryId)) next.delete(accessoryId);
    else next.add(accessoryId);
    set({ activeAccessoryIds: next, totalPrice: calculateTotal(selectedBoat, next) });
  },

  getPayload: () => {
    const { selectedBoat, selectedColorId, activeAccessoryIds, totalPrice } = get();
    const color = selectedBoat.colors.find((c) => c.id === selectedColorId);
    return {
      boat: selectedBoat.name,
      color: color?.name ?? selectedColorId,
      accessories: selectedBoat.accessories.filter((a) => activeAccessoryIds.has(a.id)).map((a) => a.name),
      totalPrice,
    };
  },
}));
