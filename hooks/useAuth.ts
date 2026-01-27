// // hooks/useAuth.ts
// import { useAuthStore } from "@/store/auth.store";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export const useAuth = (role?: string) => {
//   const { user } = useAuthStore();
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) router.push("/login");
//     if (role && user?.role !== role) router.push("/unauthorized");
//   }, [user, role]);
// };
