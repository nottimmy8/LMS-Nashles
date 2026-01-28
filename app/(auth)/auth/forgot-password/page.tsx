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
    <div className="max-w-lg mx-auto mt-40 space-y-5">
      <h1 className="text-center text-2xl font-bold  mb-4">Forgot Password?</h1>
      <p className="text-center mb-4">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-primary p-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          type="submit"
          className="w-full bg-primary text-white py-2 rounded disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </motion.button>
      </form>
      <Link href="/sign-in">
        <p className="text-center "> Back to login</p>
      </Link>
    </div>
  );
};

export default ForgotPassword;
