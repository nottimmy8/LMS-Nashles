"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useState, Suspense } from "react";
import api from "@/services/api";
import OTPInput from "../../auth/verify-otp/otp-input";
import Verified from "./verified";

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
    <div className="max-w-lg mx-auto mt-40 space-y-6 px-6 py-10 bg-white shadow-xl rounded-2xl">
      {verified ? (
        <Verified />
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold text-black font-['Outfit']">
            Verify Your Email
          </h1>
          <p className="text-center text-gray-600">
            We've sent a 6-digit verification code to{" "}
            <span className="font-semibold text-primary">
              {email || "your email"}
            </span>
            .
          </p>

          <OTPInput length={6} onComplete={handleOTPComplete} />

          {loading && (
            <p className="text-center text-sm text-primary animate-pulse">
              Processing...
            </p>
          )}

          {error && (
            <p className="text-center text-sm text-red-600 font-medium">
              {error}
            </p>
          )}

          <div className="pt-4 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-2">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={loading}
              className="text-primary font-semibold hover:underline disabled:opacity-50 transition-all"
            >
              Resend Code
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            Registration as <span className="capitalize">{role}</span>
          </p>
        </>
      )}
    </div>
  );
};

export default function VerifyRegistrationOTP() {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-40 font-['Outfit'] text-primary animate-pulse">
          Loading verification...
        </div>
      }
    >
      <VerifyRegistrationOTPContent />
    </Suspense>
  );
}
