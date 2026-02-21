"use client";

import { motion } from "motion/react";
import {
  CheckCircle2,
  ArrowRight,
  PlayCircle,
  Users,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";

export default function RoleSplit() {
  const [hovered, setHovered] = useState<"student" | "tutor" | null>(null);

  return (
    <section
      id="roles"
      className="relative py-24 overflow-hidden  max-w-7xl mx-auto "
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none noise-bg"></div>

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center pt-10">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
          Two Roles.{" "}
          <span className="text-gradient-accent">One Ecosystem.</span>
        </h2>
        <p className="text-lg text-ivory/70 max-w-2xl mx-auto">
          Tailored experiences whether you are here to absorb knowledge or share
          your expertise with the world.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row w-full min-h-[700px] max-w-[1600px] mx-auto px-4 lg:px-8 gap-4 lg:gap-8">
        {/* Student Side */}
        <motion.div
          onHoverStart={() => setHovered("student")}
          onHoverEnd={() => setHovered(null)}
          animate={{
            flex: hovered === "student" ? 1.5 : hovered === "tutor" ? 0.8 : 1,
            opacity: hovered === "tutor" ? 0.6 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal/20 to-navy border border-teal/20 p-8 md:p-12 flex flex-col group cursor-pointer"
        >
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full " />
          <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full " />

          <h3 className="font-display text-4xl font-bold mb-4 text-teal">
            For Students
          </h3>
          <p className="text-ivory/80 mb-8 max-w-md">
            Master new skills with structured paths, interactive lessons, and
            direct access to experts.
          </p>

          <ul className="space-y-4 mb-12 flex-1">
            {[
              "Browse & enroll in curated courses",
              "Track progress with visual dashboards",
              "Submit assignments & get feedback",
              "Earn certificates and verifiable badges",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-cyan-500 shrink-0" />
                <span className="text-ivory/90">{item}</span>
              </li>
            ))}
          </ul>

          {/* Student Mockup */}
          <div className="glass-panel backdrop-blur-md border border-violet-500/10 rounded-xl p-5 shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-cyan-500">
                CURRENT COURSE
              </span>
              <span className="font-mono text-xs bg-cyan-500/20 text-cyan-500 px-2 py-1 rounded">
                72%
              </span>
            </div>
            <h4 className="font-display text-xl mb-2">
              Advanced UI/UX Principles
            </h4>
            <div className="w-full bg-black/50 h-2 rounded-full mb-4 overflow-hidden">
              <div className=" bg-gradient-to-r from-cyan-500 to-violet-500 h-full w-[72%] rounded-full"></div>
            </div>
            <div className="flex items-center gap-3 text-sm ">
              <PlayCircle className="w-4 h-4" /> Next: Typography Systems
            </div>
          </div>

          <button className="mt-8 self-start flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Join as Student <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Tutor Side */}
        <motion.div
          onHoverStart={() => setHovered("tutor")}
          onHoverEnd={() => setHovered(null)}
          animate={{
            flex: hovered === "tutor" ? 1.5 : hovered === "student" ? 0.8 : 1,
            opacity: hovered === "student" ? 0.6 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber/20 to-navy border border-amber/20 p-8 md:p-12 flex flex-col group cursor-pointer"
        >
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-cyan-600/10  blur-[120px] rounded-full " />
          <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-violet-600/10  blur-[120px] rounded-full " />

          <h3 className="font-display text-4xl font-bold mb-4 text-amber">
            For Tutors
          </h3>
          <p className="text-ivory/80 mb-8 max-w-md">
            Build your audience, share your expertise, and monetize your
            knowledge with powerful tools.
          </p>

          <ul className="space-y-4 mb-12 flex-1">
            {[
              "Create & publish rich media courses",
              "Manage enrollments & grade assignments",
              "Host live sessions with calendar sync",
              "View deep analytics on performance",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-violet-500 shrink-0" />
                <span className="text-ivory/90">{item}</span>
              </li>
            ))}
          </ul>

          {/* Tutor Mockup */}
          <div className="glass-panel backdrop-blur-md border border-ivory/10 rounded-xl p-5 shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500">
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs text-violet-500">
                MONTHLY OVERVIEW
              </span>
              <span className="font-mono text-xs bg-violet-500/20 text-violet-500 px-2 py-1 rounded">
                +14%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-violet-500/5 rounded-lg p-3">
                <Users className="w-5 h-5 text-violet-500 mb-2" />
                <div className="font-mono text-2xl">1,248</div>
                <div className="text-xs text-ivory/50">Active Students</div>
              </div>
              <div className="bg-violet-500/5 rounded-lg p-3">
                <TrendingUp className="w-5 h-5 text-violet-500 mb-2" />
                <div className="font-mono text-2xl">$4.2k</div>
                <div className="text-xs text-ivory/50">Revenue</div>
              </div>
            </div>
          </div>

          <button className="mt-8 self-start flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            Apply as Tutor <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
