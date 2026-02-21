"use client";

import Navbar from "@/components/navbar";
import Image from "next/image";
import banner from "@/public/bannerimg.png";
import { Button } from "@/components/ui/button";
import { AnimatedStack } from "@/components/animated-stack";
import { ParticlesBackground } from "@/components/particles-background";
import { MoonOrb } from "@/components/moon-orb";
import { FloatingCards } from "@/components/floating-cards";
import { ScrollReveal } from "@/components/scroll-reveal";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const stats = [
  { value: "4.5", label: "80k Reviews" },
  { value: "30M", label: "Enrollments" },
  { value: "2M+", label: "Learners" },
  { value: "1K+", label: "Popular Courses" },
];

const Home = () => {
  return (
    <div className="w-full relative overflow-hidden">
      {/* Animated Background Elements */}
      <ParticlesBackground />
      <MoonOrb />

      {/* Gradient Orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <div className="py-12 md:py-20 px-5">
          <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 border border-black/10"
              >
                <Star className="w-4 h-4 fill-black" />
                <span className="text-sm font-medium">
                  Trusted by 2M+ Learners
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                BUILD IN-DEMAND <br />
                <span className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-transparent">
                  TECH SKILLS
                </span>
              </h1>

              <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-3 flex-wrap">
                Launch your
                <AnimatedStack />
                career
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-muted-foreground max-w-md text-base leading-relaxed"
              >
                Build practical skills that modern tech companies actually hire
                for — from design thinking to real-world frontend development.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-4 flex gap-4"
              >
                <Button
                  size="lg"
                  className="rounded-full px-8 group hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  className="rounded-full px-8 border border-black bg-transparent text-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  Enroll Now
                </Button>
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-4 bg-gradient-to-br from-black/10 to-black/5 rounded-3xl blur-2xl"
              />
              <Image
                src={banner}
                alt="Learning illustration"
                className="relative z-10 drop-shadow-2xl"
                priority
              />
            </motion.div>
          </section>
        </div>

        {/* Stats Section */}
        <ScrollReveal>
          <section className="px-5 py-12 md:py-20 max-w-5xl mx-auto ">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <motion.span
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-black to-black/60 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.value}
                  </motion.span>
                  <span className="text-sm text-muted-foreground mt-2 group-hover:text-black transition-colors">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Features Section */}
        <ScrollReveal>
          <section className="py-16 md:py-24 px-5 bg-gradient-to-b from-transparent via-black/5 to-transparent">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold mb-4"
                >
                  Why Choose Nashles?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-muted-foreground max-w-2xl mx-auto"
                >
                  Experience world-class education with cutting-edge technology
                  and expert instructors
                </motion.p>
              </div>

              <FloatingCards />
            </div>
          </section>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal>
          <section className="py-16 md:py-24 px-5">
            <div className="max-w-4xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-3xl bg-black text-white p-12 md:p-16 text-center"
              >
                {/* Animated background gradient */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80"
                  style={{ backgroundSize: "200% 200%" }}
                />

                <div className="relative z-10">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Ready to Start Learning?
                  </h2>
                  <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                    Join thousands of students already learning on Nashles.
                    Start your journey today.
                  </p>
                  <Button
                    size="lg"
                    className="rounded-full px-10 bg-white text-black hover:bg-white/90 hover:scale-105 transition-all duration-300"
                  >
                    Get Started for Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Home;
