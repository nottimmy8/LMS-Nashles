"use client";

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
  const [rememberMe, setRememberMe] = useState(false);
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
        rememberMe,
      });

      useAuthStore.getState().login(res.data);

      const role = res.data.user.role;

      if (role === "student") window.location.href = "/student";
      else if (role === "tutor") window.location.href = "/tutor";
      else if (role === "admin") window.location.href = "/admin";
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" h-screen w-full mx-auto shadow-xl rounded-xl flex flex-col items-center justify-center text-center">
      <div className="group relative w-full max-w-[420px] rounded-2xl p-[1.5px] overflow-hidden -mt-26">
        {/* Professional Border Beam Effect */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            padding: "1.5px",
            maskImage:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "destination-out",
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,var(--color-violet-glow)_330deg,var(--color-cyan-glow)_360deg)] opacity-100"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 space-y-6 p-8 rounded-2xl bg-[#050505]/95 backdrop-blur-3xl shadow-2xl flex flex-col items-stretch"
        >
          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-gradient">
              Welcome Back
            </h1>
            <p className="text-sm text-white/40">
              Enter your credentials to access your account
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-200 placeholder:text-white/20 text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-200 placeholder:text-white/20 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 group cursor-pointer">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black h-4 w-4 rounded-sm transition-colors"
              />
              <span className="text-xs text-white/60 group-hover:text-white transition-colors cursor-pointer">
                Remember me
              </span>
            </label>
            <Link href="/auth/forgot-password">
              <span className="text-xs text-white/60 group-hover:text-white transition-colors cursor-pointer">
                Forgot password?
              </span>
            </Link>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg"
            >
              <p className="text-red-400 text-xs text-center font-medium">
                {error}
              </p>
            </motion.div>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-white text-black hover:bg-white/90 py-3 rounded-xl font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN"}
          </motion.button>

          <p className="text-xs text-center text-white/40 pt-2">
            New here?{" "}
            <Link
              href="/sign-up"
              className="text-white hover:underline underline-offset-4 font-medium transition-all"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
