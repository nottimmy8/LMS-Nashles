"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
  onContinue: () => void;
};

export default function ResultModal({
  open,
  type,
  title,
  message,
  onContinue,
}: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md text-center"
          >
            <div className="flex justify-center mb-4">
              {type === "success" ? (
                <CheckCircle className="w-14 h-14 text-green-500" />
              ) : (
                <XCircle className="w-14 h-14 text-red-500" />
              )}
            </div>

            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>

            <Button onClick={onContinue} className="w-full">
              Continue
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
