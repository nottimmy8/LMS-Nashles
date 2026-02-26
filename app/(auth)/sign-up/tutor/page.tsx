"use client";
import Image from "next/image";

import { useState } from "react";
import emailIcon from "@/public/mail.png";
import googleIcon from "@/public/google-icon.png";
import eyeIcon from "@/public/show.png";
import appleIcon from "@/public/apple.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

import api from "@/services/api";

const TutorSignUp = ({ role }: { role: "tutor" }) => {
  const router = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    expertise: "",
    password: "",
    comfirmPassword: "",
    acceptedTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (checked: boolean) => {
    setForm((prev) => ({ ...prev, acceptedTerms: checked }));
  };

  const isFormValid = Boolean(
    form.fullName &&
    form.email &&
    form.expertise &&
    form.password &&
    form.comfirmPassword &&
    form.acceptedTerms,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isFormValid) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password !== form.comfirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.fullName,
        email: form.email,
        password: form.password,
        expertise: form.expertise,
        role,
      };

      await api.post("/auth/register", payload);
      router.push(`/sign-up/verify?email=${encodeURIComponent(form.email)}`);
      // router.push("/sign-in");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  console.log("error", error);
  return (
    <div className="w-full flex flex-col gap-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-200 placeholder:text-white/20 text-sm text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">
              Email address
            </label>
            <div className="relative group">
              <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full bg-white/[0.03] border border-white/10 p-3 pr-11 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-200 placeholder:text-white/20 text-sm text-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-50 transition-opacity">
                <Image
                  src={emailIcon}
                  alt="icon"
                  width={18}
                  height={18}
                  className="invert"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">
              Area of Expertise
            </label>
            <select
              name="expertise"
              value={form.expertise}
              onChange={handleChange}
              className="w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all duration-200 text-sm text-white appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-black bg-white/20">
                Select your expertise
              </option>
              <option value="ui-ux" className="text-black bg-white/20">
                UI/UX Design
              </option>
              <option
                value="software-engineer"
                className="text-black bg-white/20"
              >
                Software Engineering
              </option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">
              Password
            </label>
            <div className="relative group">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/10 p-3 pr-11 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-200 placeholder:text-white/20 text-sm text-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-50 transition-opacity cursor-pointer">
                <Image
                  src={eyeIcon}
                  alt="icon"
                  width={18}
                  height={18}
                  className="invert"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/40 ml-1 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative group">
              <input
                type="password"
                name="comfirmPassword"
                value={form.comfirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/10 p-3 pr-11 rounded-xl focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all duration-200 placeholder:text-white/20 text-sm text-white"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-50 transition-opacity cursor-pointer">
                <Image
                  src={eyeIcon}
                  alt="icon"
                  width={18}
                  height={18}
                  className="invert"
                />
              </div>
            </div>
          </div>
        </div>

        <label className="flex items-start gap-3 group cursor-pointer">
          <Checkbox
            checked={form.acceptedTerms}
            onCheckedChange={handleCheckbox}
            className="mt-1 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black h-4 w-4 rounded-sm transition-colors transition-none"
          />
          <p className="text-[11px] leading-relaxed text-white/40 group-hover:text-white/60 transition-colors">
            By signing up you agree to our{" "}
            <span className="text-white decoration-white/20 hover:underline underline-offset-2">
              Terms and conditions
            </span>{" "}
            and{" "}
            <span className="text-white decoration-white/20 hover:underline underline-offset-2">
              Privacy policy
            </span>
            .
          </p>
        </label>

        <div className="space-y-4">
          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full bg-white text-black hover:bg-white/90 py-3 rounded-xl font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
          >
            {loading ? "Creating..." : "Create account"}
          </motion.button>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-red-400 text-center font-medium bg-red-500/10 border border-red-500/20 p-3 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <p className="text-xs text-center text-white/40 pt-2">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-white hover:underline underline-offset-4 font-medium transition-all"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>

      <div className="relative flex items-center gap-4 py-2">
        <div className="flex-1 border-t border-white/5" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-semibold">
          Or continue with
        </span>
        <div className="flex-1 border-t border-white/5" />
      </div>

      <div className="grid grid-cols-2 gap-3 ">
        <button className="flex items-center justify-center py-2.5 border border-white/10 rounded-xl gap-3 text-xs text-white/60 font-medium hover:bg-white/5 hover:border-white/20 transition-all">
          <Image src={googleIcon} alt="google" width={16} height={16} />
          Google
        </button>
        <button className="flex items-center justify-center py-2.5 border border-white/10 rounded-xl gap-3 text-xs text-white/60 font-medium hover:bg-white/5 hover:border-white/20 transition-all">
          <Image
            src={appleIcon}
            alt="apple"
            width={16}
            height={16}
            className="invert"
          />
          Apple
        </button>
      </div>
    </div>
  );
};

export default TutorSignUp;
