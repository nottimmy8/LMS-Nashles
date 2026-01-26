"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export function AuthGuard({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "student" | "tutor" | "admin";
}) {
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user) router.replace("/sign-in");
    else if (role && user.role !== role) router.replace("/unauthorized");
  }, [user, role, router]);

  if (!user) return null;

  return <>{children}</>;
}
