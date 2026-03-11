export interface BoatModel {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: "15-pies" | "18-pies" | "20-pies";
  isNew?: boolean;
  specs: {
    eslora: string;
    manga: string;
    puntal: string;
    calado: string;
    capacidad: number;
    motorizacion: string;
    combustible: string;
    uso: string;
    material: string;
  };
  equipment: string[];
  colors: string[];
  images: string[];
  heroImage: string;
}

export interface Distributor {
  id: string;
  name: string;
  address: string;
  province: string;
  phone: string;
  whatsapp?: string;
}

export interface Accessory {
  id: string;
  name: string;
  description: string;
  category: "accesorios" | "servicios";
  imageUrl?: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "repuestos" | "motores" | "accesorios" | "servicios";
  image: string;
  badge?: string;
}

export interface CartItem extends StoreProduct {
  quantity: number;
}
