// services/api.ts
import axios from "axios";
import { useAuthStore } from "@/store/auth.store";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const store = useAuthStore.getState();

    if (error.response?.status === 401 && store.accessToken) {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        store.setAccessToken(res.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(error.config);
      } catch {
        store.logout();
      }
    }

    return Promise.reject(error);
  },
);

export default api;
