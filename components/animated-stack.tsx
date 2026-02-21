"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const stacks = ["Frontend", "UI/UX", "Backend"];

export const AnimatedStack = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % stacks.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-flex h-11 min-w-30  px-2 overflow-hidden font-damion">
      <AnimatePresence mode="wait">
        <motion.span
          key={stacks[index]}
          initial={{ y: 32, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -32, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-2xl md:text-3xl text-white"
        >
          {stacks[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
