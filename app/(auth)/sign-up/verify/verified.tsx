"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const Verified = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center space-y-6"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
        >
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -inset-2 bg-green-100/50 rounded-full -z-10"
        />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-black font-poppins">
          Verification Successful
        </h1>
        <p className="text-white max-w-xs mx-auto">
          Your account has been verified successfully. You can now login to your
          account and start learning.
        </p>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full pt-4"
      >
        <Link
          href="/sign-in"
          className="block w-full rounded bg-primary text-black py-2 font-semibold shadow-lg shadow-primary/30 transition-all hover:bg-primary/90"
        >
          Back to Sign In
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Verified;
