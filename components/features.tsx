"use client";
import { motion } from "motion/react";
import { FloatingCards } from "./floating-cards";

const Features = () => {
  return (
    <div
      id="features"
      className="min-h-screen bg-black px-6 py-16 md:py-32 relative "
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl text-white font-bold tracking-tight mb-6"
          >
            Why Choose <span className="text-gradient-accent"> Nashles?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Experience world-class education with cutting-edge technology and
            expert instructors
          </motion.p>
        </div>

        <FloatingCards />
      </div>
    </div>
  );
};

export default Features;
