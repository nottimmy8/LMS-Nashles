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
    <div className="grid grid-cols-1 gap-4 py-2.5 px-6 rounded-b-2xl shadow-xl  ">
      <h1 className="text-center font-medium text-black text-[28px]">
        Share Your Knowledge & Earn!
      </h1>
      <form className=" space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm block mb-2 font-medium text-black">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name"
            className="border border-primary/50 w-full py-2.5 px-3 outline-none text-sm rounded text-black "
          />
        </div>
        <div>
          <label className="text-sm block mb-2 font-medium text-black">
            Email address
          </label>
          <div className="flex items-center w-full overflow-hidden border border-primary/50 rounded">
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              className="w-full py-2.5 px-3 outline-none text-sm text-black "
            />
            <div className="w-12 h-full flex items-center justify-center ">
              <Image src={emailIcon} alt="icon" width={20} height={20} />{" "}
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm block mb-2 font-medium text-black">
            Area of Experise
          </label>

          <select
            name="expertise"
            value={form.expertise}
            onChange={handleChange}
            className="w-full py-2.5 px-3  text-sm text-black bg-secondary  border border-primary/50 rounded "
          >
            <option value="" disabled>
              Select your expertise
            </option>
            <option value="ui-ux">UI/UX Design</option>
            <option value="software-engineer">Software Engineering</option>
          </select>
        </div>
        <div>
          <label className="text-sm block mb-2 font-medium text-black">
            Password
          </label>
          <div className="flex items-center w-full overflow-hidden border border-primary/50 rounded">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full py-2.5 px-3 outline-none text-sm text-black "
            />
            <div className="w-12 h-full flex items-center justify-center ">
              <Image src={eyeIcon} alt="icon" width={20} height={20} />{" "}
            </div>
          </div>
        </div>
        <div>
          <label className="text-sm block mb-2 font-medium text-black">
            Comfirm Password
          </label>
          <div className="flex items-center w-full overflow-hidden border border-primary/50 rounded">
            <input
              type="password"
              name="comfirmPassword"
              value={form.comfirmPassword}
              onChange={handleChange}
              placeholder="Comfirm Password"
              className="w-full py-2.5 px-3 outline-none text-sm text-black "
            />
            <div className="w-12 h-full flex items-center justify-center ">
              <Image src={eyeIcon} alt="icon" width={20} height={20} />{" "}
            </div>
          </div>
        </div>
        <Field orientation={"horizontal"}>
          <Checkbox
            checked={form.acceptedTerms}
            onCheckedChange={handleCheckbox}
            className="border-primary/50"
          />
          <FieldLabel className="text-gray">
            By signing up you agree to our Terms and conditions and Privacy
            policy.
          </FieldLabel>
        </Field>
        <motion.button
          whileHover={{ scale: 1.0 }}
          whileTap={{ scale: 0.95 }}
          // disabled={!isFormValid || loading}
          className="rounded bg-primary text-white px-4.5 py-2 w-full "
        >
          {loading ? "Creating..." : "Create account"}
        </motion.button>
        <p className="text-sm text-red-600">{error} </p>
        <p className="text-sm">
          Already have an account?
          <Link href="/sign-in" className="text-primary/50">
            Sign in
          </Link>
        </p>
      </form>
      <div className="inline-flex justify-center items-center gap-4 text-sm mt-6">
        <div className="w-full border border-primary/50" /> or
        <div className="w-full border border-primary/50" />
      </div>
      <div className="grid grid-cols-1 gap-4 ">
        <button className="flex items-center justify-center px-3 py-2.5 border border-primary/50 rounded gap-5 text-base text-gray font-medium ">
          <Image src={googleIcon} alt="google icon" width={25} height={25} />
          Continue with Google
        </button>
        <button className="flex items-center justify-center px-3 py-2.5 border border-primary/50 rounded gap-5 text-base text-gray font-medium">
          <Image src={appleIcon} alt="google icon" width={25} height={25} />{" "}
          Continue with Apple
        </button>
      </div>
    </div>
  );
};

export default TutorSignUp;
