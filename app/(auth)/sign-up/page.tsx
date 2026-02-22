"use client";
import { Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import StudentSignUp from "./student/page";
import TutorSignUp from "./tutor/page";

const tabs = ["Student", "Tutor"] as const;
type Tab = (typeof tabs)[number];
type Role = "student" | "tutor";

// Move your logic here
const SignUpContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Use URL as source of truth
  const roleFromUrl = searchParams?.get("role") as Role | null;
  const activeTab: Tab = roleFromUrl === "tutor" ? "Tutor" : "Student";
  const role: Role = activeTab === "Tutor" ? "tutor" : "student";

  const handleTabChange = (tab: Tab) => {
    router.replace(`/sign-up?role=${tab.toLowerCase()}`, {
      scroll: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group max-w-[500px] relative w-full  rounded-2xl p-[1.5px] overflow-hidden mx-auto mt-20 md:mt-12"
    >
      {/* Precision Border Beam Effect */}
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
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[-150%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,var(--color-violet-glow)_330deg,var(--color-cyan-glow)_360deg)] opacity-100"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center bg-[#050505]/95 backdrop-blur-3xl p-8 rounded-2xl shadow-2xl overflow-hidden">
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="space-y-2 mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gradient">
            Create Account
          </h1>
          <p className="text-sm text-white/40">
            Choose your role to get started
          </p>
        </div>

        <motion.div className="flex justify-center p-1 bg-white/[0.03] border border-white/10 rounded-full relative z-10 w-full max-w-[280px]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`relative flex-1 px-6 py-2 rounded-full font-medium transition-all duration-300 text-xs tracking-wider uppercase ${
                activeTab === tab
                  ? "text-black"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tab-highlight"
                  className="absolute inset-0 -z-10 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        <div className="w-full mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={role}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
            >
              {role === "student" ? (
                <StudentSignUp role="student" />
              ) : (
                <TutorSignUp role="tutor" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default function SignUp() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
