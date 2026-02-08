import { useEffect } from "react";
import { useAuthStore } from "./auth.store";
import api from "@/services/api";

export const useAuthHydrate = () => {
  const login = useAuthStore((state) => state.login);
  const setInitialized = useAuthStore((state) => state.setInitialized);

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      try {
        const res = await api.get("/auth/me");
        login(res.data);
      } catch {
        // silent fail — user not logged in
      } finally {
        if (isMounted) {
          setInitialized(true);
        }
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, [login, setInitialized]);
};
