import type { Service } from './catalog.types';
import type { PaymentStatus } from './payment.types';

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface Booking {
  id: string;
  customerId: string;
  businessId: string;
  serviceId: string;
  service?: Service;
  staffId?: string;
  scheduledAt: string; // ISO 8601
  duration: number;    // minutes
  status: BookingStatus;
  price: number;
  paymentStatus: PaymentStatus;
  notes?: string;
  createdAt: string;
}
