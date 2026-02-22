"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import banner from "@/public/bannerimg.png";
import { Button } from "./ui/button";
import { AnimatedStack } from "./animated-stack";
import { useEffect, useState } from "react";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span className="font-mono text-3xl md:text-4xl text-white">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const Hero = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.95]);
  return (
    <div
      id="home"
      className=" min-h-screen flex flex-col justify-center items-center bg-black overflow-hidden relative"
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full " />
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full " />

      <section className=" w-full mt-20 md:mt-12 py-20 px-6 flex flex-col md:flex-row justify-center items-center text-center  ">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-2"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10"
          >
            <Star className="w-4 h-4 fill-white" />
            <span className="text-sm font-medium text-white/80">
              Trusted by 2M+ Learners
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-8xl text-white font-extrabold tracking-tight leading-tight uppercase font-display">
            BUILD <span className="text-gradient-accent">IN-DEMAND</span> <br />
            <span className="text-gradient">TECH SKILLS</span>
          </h1>

          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-semibold inline-flex gap-3 flex-wrap">
            Launch your
            <AnimatedStack />
            career
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground  text-base md:text-lg leading-relaxed "
          >
            Build practical skills that modern tech companies actually hire{" "}
            <br /> for — from design thinking to real-world frontend
            development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center sm:w-auto gap-4 "
          >
            <Button
              size="lg"
              className="group relative overflow-hidden  rounded-full px-8 bg-white text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 font-bold"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-200 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="group-hover:translate-x-1 transition-transform">
                {" "}
                Get Started
              </span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              className="glass-panel glass-panel-hover rounded-full px-8 text-white hover:bg-white/5 transition-all duration-300"
            >
              Enroll Now
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className=" py-10 px-12 w-full max-w-6xl rounded-[40px] glass-panel border border-white/10 hidden md:flex items-center justify-center  "
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 w-full">
          <div className="flex flex-col items-center">
            <Counter end={12000} suffix="+" />
            <span className="text-xs text-white/40 mt-3 uppercase tracking-[0.2em] font-medium">
              Active Students
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-white/5">
            <Counter end={450} suffix="+" />
            <span className="text-xs text-white/40 mt-3 uppercase tracking-[0.2em] font-medium">
              Premium Courses
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Counter end={200} suffix="+" />
            <span className="text-xs text-white/40 mt-3 uppercase tracking-[0.2em] font-medium">
              Expert Tutors
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
