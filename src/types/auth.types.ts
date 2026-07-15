export type UserRole =
  | 'CUSTOMER'
  | 'MERCHANT'
  | 'STAFF'
  | 'CASHIER'
  | 'DRIVER'
  | 'ADMIN'
  | 'SUPER_ADMIN';

export interface AuthUser {
  id: string;
  phone: string;
  name: string;
  role: UserRole;
  businessId?: string; // present for merchant / staff / cashier
  avatar?: string;
  isVerified: boolean;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export interface OtpRequest {
  phone: string; // E.164 format e.g. +237612345678
}

export interface OtpVerifyRequest {
  phone: string;
  otp: string;         // 6-digit code
  operationId: string; // returned from OtpRequest response
}

export interface AuthResponse {
  token: string; // JWT
  user: AuthUser;
}
