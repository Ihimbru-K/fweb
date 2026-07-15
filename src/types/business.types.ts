export type BusinessStatus = 'PENDING_REVIEW' | 'ACTIVE' | 'SUSPENDED' | 'BANNED';

export interface Address {
  street: string;
  city: string;
  region: string;
  country: string; // ISO 3166-1 alpha-2 e.g. "CM"
  latitude?: number;
  longitude?: number;
}

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  logo?: string;
  banner?: string;
  categoryId: string;
  address: Address;
  phone: string;
  email?: string;
  status: BusinessStatus;
  rating: number;
  totalReviews: number;
  isDeliveryEnabled: boolean;
  deliveryFee?: number;
  minimumOrderAmount?: number;
  createdAt: string;
}
