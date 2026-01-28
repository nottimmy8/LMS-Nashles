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
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleOTPComplete = async (code: string) => {
    if (!email) {
      alert("Email not found. Please try again.");
      return;
    }
    setLoading(true);
    try {
      // Verify OTP is correct before redirecting
      // Note: Some flows might return a temp token here, but we'll assume we pass the code
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

  // Removed inline success message as we are redirecting

  return (
    <div className="max-w-lg mx-auto mt-40 space-y-5 ">
      <h1 className="text-center text-2xl font-bold mb-2">Password Reset</h1>
      <p className="text-center">
        Enter the verification code sent to{" "}
        {email ? `to ${email}` : "your email address"}.
      </p>
      <OTPInput length={6} onComplete={handleOTPComplete} />

      {loading && (
        <p className="text-center text-sm text-primary">Verifying...</p>
      )}

      <p className="flex justify-center gap-1">
        Didn't receive the code?
        <button onClick={handleResend} className="text-primary hover:underline">
          Resend Code
        </button>
      </p>
    </div>
  );
};

const VerifyOTP = () => {
  return (
    <Suspense fallback={<div className="text-center mt-40">Loading...</div>}>
      <VerifyOTPContent />
    </Suspense>
  );
};

export default VerifyOTP;
