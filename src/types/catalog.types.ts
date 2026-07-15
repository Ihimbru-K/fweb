export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  parentId?: string; // null for top-level categories
}

export interface Product {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;        // minor XAF units (e.g. 150000 = 1500 XAF)
  comparePrice?: number;
  images: string[];
  categoryId: string;
  category?: Category;
  stock: number;
  sku?: string;
  isActive: boolean;
  createdAt: string;    // ISO 8601
  updatedAt: string;
}

export interface Service {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  duration: number;    // minutes
  images: string[];
  categoryId: string;
  staffIds: string[];
  isActive: boolean;
}

// Discriminated union
export type CatalogItem =
  | (Product & { type: 'product' })
  | (Service & { type: 'service' });
