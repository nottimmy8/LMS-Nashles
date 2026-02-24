"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useState, Suspense } from "react";
import api from "@/services/api";
import OTPInput from "../../auth/verify-otp/otp-input";
import Verified from "./verified";
import { motion } from "framer-motion";

const VerifyRegistrationOTPContent = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const email = searchParams.get("email");
  const role = params.role as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  const handleOTPComplete = async (code: string) => {
    if (!email) {
      setError("Email not found. Please try again.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/verify-otp", { email, otp: code });
      setVerified(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      await api.post("/auth/resend-otp", { email });
      alert("Verification code resent successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend code");
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

        <div className="relative z-10 space-y-6 p-8 rounded-2xl bg-[#050505]/95 backdrop-blur-3xl shadow-2xl flex flex-col items-stretch">
          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />

          {verified ? (
            <Verified />
          ) : (
            <>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight text-gradient">
                  Verify Your Email
                </h1>
                <p className="text-sm text-white/40">
                  We've sent a 6-digit verification code to{" "}
                  <span className="font-semibold text-white/70">
                    {email || "your email"}
                  </span>
                  .
                </p>
              </div>

              <OTPInput length={6} onComplete={handleOTPComplete} />

              {loading && (
                <p className="text-center text-sm text-white/50 animate-pulse">
                  Processing...
                </p>
              )}

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

              <div className="pt-4 border-t border-white/10 text-center">
                <p className="text-sm text-white/40 mb-2">
                  Didn't receive the code?
                </p>
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="text-white font-semibold hover:underline underline-offset-4 disabled:opacity-50 transition-all"
                >
                  Resend Code
                </button>
              </div>

              <p className="text-center text-xs text-white/30">
                Registration as <span className="capitalize">{role}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function VerifyRegistrationOTP() {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-40 text-white/50 animate-pulse">
          Loading verification...
        </div>
      }
    >
      <VerifyRegistrationOTPContent />
    </Suspense>
  );
}
