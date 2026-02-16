"use client";
import { Suspense, useEffect, useState } from "react"; // 1. Import Suspense
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

  // Next.js handles this safely inside Suspense
  const roleFromUrl = searchParams?.get("role") as Role | null;

  const getInitialTab = (): Tab =>
    roleFromUrl === "tutor" ? "Tutor" : "Student";

  const [activeTab, setActiveTab] = useState<Tab>(getInitialTab);

  useEffect(() => {
    setActiveTab(getInitialTab());
  }, [roleFromUrl]);

  const role: Role = activeTab === "Tutor" ? "tutor" : "student";

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    router.replace(`/sign-up?role=${tab.toLowerCase()}`, {
      scroll: false,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      className="py-8 grid grid-cols-1 gap-6 pt-15 pb-15 max-w-xl w-full mx-auto"
    >
      <div className="flex flex-col items-center">
        <motion.div className="flex justify-center w-50 bg-white gap-4 rounded-full shadow-md relative z-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`relative px-6 py-2 font-medium transition-colors duration-300 text-sm ${
                activeTab === tab ? "text-white" : "text-primary"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 -z-10 h-full bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
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

// 3. This is the component Next.js will call
export default function SignUp() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}
