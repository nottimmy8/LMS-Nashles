"use client";
import api from "@/services/api";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const ResetPasswordContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !code) {
      alert("Missing email or verification code. Please request a new link.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        otp: code,
        newPassword: password,
      });
      alert(
        "Password reset successfully! Please login with your new password.",
      );
      router.push("/sign-in");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-40">
      <form onSubmit={handleSubmit} className="space-y-5 p-6 ">
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        <p className="text-center text-gray-600">Enter your new password</p>

        <div>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-primary p-2 rounded"
            minLength={6}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border border-primary p-2 rounded"
            minLength={6}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          type="submit"
          className="w-full bg-primary text-white py-2 rounded disabled:opacity-70"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </motion.button>

        <Link href="/sign-in">
          <p className="text-center text-primary mt-4 hover:underline">
            Back to login
          </p>
        </Link>
      </form>
    </div>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div className="text-center mt-40">Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPassword;
