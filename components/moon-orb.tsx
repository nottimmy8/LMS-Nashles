"use client";

import { motion } from "framer-motion";

export const MoonOrb = () => {
  return (
    <div className="absolute top-20 right-10 md:right-20 pointer-events-none">
      <motion.div
        className="relative"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Main moon orb */}
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-black/10 to-black/5 backdrop-blur-sm" />

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-black/5 blur-2xl scale-150" />

        {/* Inner glow */}
        <div className="absolute inset-8 rounded-full bg-white/20" />

        {/* Craters */}
        <div className="absolute top-8 left-12 w-6 h-6 rounded-full bg-black/5" />
        <div className="absolute bottom-12 right-8 w-8 h-8 rounded-full bg-black/5" />
        <div className="absolute top-16 right-16 w-4 h-4 rounded-full bg-black/5" />
      </motion.div>
    </div>
  );
};
