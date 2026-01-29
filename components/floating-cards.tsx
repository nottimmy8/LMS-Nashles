"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Award, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description: "Learn from industry professionals with real-world experience",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join thousands of learners on their journey to success",
  },
  {
    icon: Award,
    title: "Certified Programs",
    description: "Earn recognized certificates upon course completion",
  },
  {
    icon: Sparkles,
    title: "Lifetime Access",
    description: "Access your courses anytime, anywhere, forever",
  },
];

export const FloatingCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="group"
        >
          <div className="relative h-full p-6 rounded-2xl bg-white border border-black/10 shadow-sm hover:shadow-xl transition-all duration-300">
            {/* Hover gradient effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 rounded-xl bg-black flex items-center justify-center mb-4"
              >
                <feature.icon className="w-6 h-6 text-white" />
              </motion.div>

              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
