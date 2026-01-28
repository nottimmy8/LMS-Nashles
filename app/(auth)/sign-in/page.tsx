"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import api from "@/services/api";
import { useAuthStore } from "@/store/auth.store";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignIn() {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (isInitialized && user) {
      const role = user.role;
      if (role === "student") router.push("/student");
      else if (role === "tutor") router.push("/tutor");
      else if (role === "admin") router.push("/admin");
    }
  }, [isInitialized, user, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      useAuthStore.getState().login(res.data);

      const role = res.data.user.role;

      if (role === "student") router.push("/student");
      if (role === "tutor") router.push("/tutor");
      if (role === "admin") router.push("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12">
      <form onSubmit={handleSubmit} className="space-y-5 p-6 border rounded-xl">
        <h1 className="text-xl font-semibold text-center">Welcome Back</h1>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-primary p-2 rounded"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border border-primary p-2 rounded"
        />

        <div className="flex justify-between align-center">
          <span className="gap-2 flex justify-start align-start">
            <Checkbox className="border border-primary " />
            <label className="text-sm">Remember me</label>
          </span>
          <Link href="/auth/forgot-password" className="text-primary text-sm">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded"
        >
          {loading ? "Signing in..." : "Sign in"}
        </motion.button>

        <p className="text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-primary">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
