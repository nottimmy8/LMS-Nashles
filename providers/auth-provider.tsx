"use client";

import { useAuthHydrate } from "@/store/auth.hydrate";
import { ReactNode } from "react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  useAuthHydrate();
  return <>{children}</>;
}
