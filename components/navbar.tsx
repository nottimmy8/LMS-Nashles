"use client";

import Image from "next/image";
import logo from "@/public/nashlogo.png";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl w-full mx-auto flex items-center justify-between px-5 py-4"
    >
      {/* nav item */}
      <ul className=" hidden md:flex gap-6 text-base">
        {["Home", "Course", "Review"].map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ y: -2 }}
            className="cursor-pointer relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
          </motion.li>
        ))}
      </ul>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05 }}
        className="flex items-center justify-center"
      >
        <Image src={logo} alt="logo" width={55} height={55} />
        <h2 className="font-bold text-xl font-roboto">Nashles</h2>
      </motion.div>

      {/* Buttons */}
      <div className="gap-4 flex">
        <Link href="/sign-in">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="hover:shadow-lg transition-shadow">Login</Button>
          </motion.div>
        </Link>
        <Link href="/sign-up">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="hover:shadow-lg transition-shadow">
              Sign Up
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default Navbar;
