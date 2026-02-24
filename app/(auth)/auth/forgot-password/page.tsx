"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/forgot-password", { email });

      // Navigate to verify-otp with email
      router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      console.log("Forgot Password Error:", error);
      if (error.response) {
        console.log("Error Response Data:", error.response.data);
        console.log("Error Response Status:", error.response.status);
      }
      setError(error.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full mx-auto flex flex-col items-center justify-center text-center">
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
              Forgot Password?
            </h1>
            <p className="text-sm text-white/40">
              Enter your email address and we'll send you a code to reset your
              password.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-200 placeholder:text-white/20 text-sm"
              />
            </div>
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
            type="submit"
            className="w-full bg-white text-black hover:bg-white/90 py-3 rounded-xl font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "SENDING..." : "SEND RESET CODE"}
          </motion.button>

          <p className="text-xs text-center text-white/40 pt-2">
            Remember your password?{" "}
            <Link
              href="/sign-in"
              className="text-white hover:underline underline-offset-4 font-medium transition-all"
            >
              Back to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
