// store/auth.store.ts
import { create } from "zustand";

interface User {
  id: string;
  email: string;
  role: "admin" | "student" | "tutor";
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  login: (data: any) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  login: ({ user, accessToken }) => set({ user, accessToken }),

  setAccessToken: (accessToken) => set({ accessToken }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
    }),
}));
