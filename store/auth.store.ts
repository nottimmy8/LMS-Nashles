// store/auth.store.ts
import { LoginPayload, User } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AuthState {
  user: User | null;
  accessToken: string | null;
  isInitialized: boolean;
  login: (data: LoginPayload) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
  setInitialized: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isInitialized: false,

      login: (data) => set(data),

      setAccessToken: (accessToken) => set({ accessToken }),

      setInitialized: (val) => set({ isInitialized: val }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
    },
  ),
);


