// store/auth.store.ts
import { LoginPayload, User } from "@/types/auth.types";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  login: (data: LoginPayload) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  login: (data) => set(data),

  setAccessToken: (accessToken) => set({ accessToken }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
    }),
}));
