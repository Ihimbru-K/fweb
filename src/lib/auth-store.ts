import { create } from 'zustand';
import type { AuthState } from '@/types/auth.types';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (token, user) => set({ token, user, isAuthenticated: true }),
  logout: () => set({ token: null, user: null, isAuthenticated: false }),
}));
