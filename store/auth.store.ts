// store/auth.store.ts
import { LoginPayload, User } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/services/api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isInitialized: boolean;
  login: (data: LoginPayload) => void;
  logout: () => Promise<void>;
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

      logout: async () => {
        try {
          await api.post("/auth/logout");
        } catch (error) {
          console.error("Logout API call failed:", error);
        } finally {
          set({
            user: null,
            accessToken: null,
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    },
  ),
);
