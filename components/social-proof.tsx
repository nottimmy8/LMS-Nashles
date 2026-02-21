"use client";

import { motion } from "motion/react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Senior Product Designer",
    company: "TechCorp",
    image: "https://picsum.photos/seed/user1/100/100",
    content:
      "The AI-powered learning paths completely transformed how I upskill. It feels like having a personal mentor available 24/7.",
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Frontend Engineer",
    company: "StartupX",
    image: "https://picsum.photos/seed/user2/100/100",
    content:
      "The gamified progress and real-time analytics kept me motivated. Best LMS I have ever used, hands down.",
  },
  {
    id: 3,
    name: "David Chen",
    role: "Engineering Manager",
    company: "GlobalTech",
    image: "https://picsum.photos/seed/user3/100/100",
    content:
      "We onboarded our entire engineering team onto this platform. The results have been phenomenal. Highly recommended.",
  },
];

export default function SocialProof() {
  return (
    <section id="reviews" className="py-32 relative z-10 bg-black">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Loved by{" "}
            <span className="text-gradient-accent">Industry Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            Join thousands of professionals who are accelerating their careers
            with our platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="relative p-[1px] rounded-3xl overflow-hidden group"
            >
              {/* Glowing Gradient Outline */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/50 via-transparent to-cyan-500/50 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full glass-panel rounded-3xl p-8 flex flex-col bg-[#05050A]/90">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-white/60">
                      {testimonial.role} @ {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-white/80 leading-relaxed italic">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
