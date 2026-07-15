export type PaymentMethod = 'MTN_MOMO' | 'ORANGE_MONEY' | 'CASH';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface Transaction {
  id: string;
  orderId?: string;
  bookingId?: string;
  customerId: string;
  businessId: string;
  amount: number;
  provider: 'MTN_MOMO' | 'ORANGE_MONEY';
  providerTransactionId: string;
  providerPhone: string;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  failureReason?: string;
  createdAt: string;
}

export interface Payout {
  id: string;
  businessId: string;
  amount: number;
  platformFee: number;
  netAmount: number;
  status: 'SCHEDULED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  scheduledAt: string;
  completedAt?: string;
}
