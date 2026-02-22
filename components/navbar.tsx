"use client";

import { motion } from "motion/react";
import logo from "@/public/nashlogo.png";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        {/* <Image src={logo} alt="logo" width={55} height={55} /> */}
        <span className="font-display text-xl font-bold tracking-wide text-white">
          Nashles
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
        <a
          href="#"
          className="hover:text-white hover:font-medium  transition-colors relative group"
        >
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
        </a>
        <a
          href="#features"
          className="hover:text-white hover:font-medium transition-colors relative group"
        >
          Features
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
        </a>
        <a
          href="#courses"
          className="hover:text-white  hover:font-medium  transition-colors relative group"
        >
          Courses
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
        </a>
        <a
          href="#roles"
          className="hover:text-white  hover:font-medium  transition-colors relative group"
        >
          Roles
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
        </a>
        <a
          href="#reviews"
          className="hover:text-white  hover:font-medium  transition-colors relative group"
        >
          Reviews
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
        </a>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/sign-in">
          <button className="hidden sm:block px-5 py-2 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors">
            I&apos;m a Student
          </button>
        </Link>
        <Link href="/sign-in">
          <button className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            I&apos;m a Tutor
          </button>
        </Link>
      </div>
    </motion.nav>
  );
}
