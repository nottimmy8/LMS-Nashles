"use client";
import Link from "next/link";
import OTPInput from "./otp-input";
import { motion } from "framer-motion";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/services/api";

const VerifyOTPContent = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleOTPComplete = async (code: string) => {
    if (!email) {
      alert("Email not found. Please try again.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/verify-reset-otp", { email, otp: code });
      router.push(
        `/auth/password-reset?email=${encodeURIComponent(
          email,
        )}&code=${encodeURIComponent(code)}`,
      );
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      await api.post("/auth/forgot-password", { email });
      alert("Code sent successfully");
    } catch (error) {
      alert("Failed to resend code");
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

        <div className="relative z-10 space-y-6 p-8 rounded-2xl bg-[#050505]/95 backdrop-blur-3xl shadow-2xl flex flex-col items-stretch">
          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-gradient">
              Password Reset
            </h1>
            <p className="text-sm text-white/40">
              Enter the verification code sent to{" "}
              <span className="font-semibold text-white/70">
                {email || "your email address"}
              </span>
              .
            </p>
          </div>

          <OTPInput length={6} onComplete={handleOTPComplete} />

          {loading && (
            <p className="text-center text-sm text-white/50 animate-pulse">
              Verifying...
            </p>
          )}

          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-sm text-white/40 mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              className="text-white font-semibold hover:underline underline-offset-4 transition-all"
            >
              Resend Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const VerifyOTP = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-40 text-white/50 animate-pulse">
          Loading...
        </div>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
};

export default VerifyOTP;
