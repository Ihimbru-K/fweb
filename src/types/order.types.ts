import type { Address } from './business.types';
import type { PaymentMethod, PaymentStatus } from './payment.types';

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PREPARING'
  | 'READY'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  customerId: string;
  businessId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryAddress?: Address;
  driverId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
