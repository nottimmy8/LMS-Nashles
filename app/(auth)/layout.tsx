"use client";

import Footer from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/nashlogo.png";
import { useEffect, useRef, useState } from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /*  FOOTER ANIMATION  */
  const footerRef = useRef<HTMLDivElement | null>(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFooterVisible(true);
        }
      },
      { threshold: 0.15 },
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);
  return (
    <div className=" w-full  pt-6  ">
      <div className=" w-full  px-6 md:px-20">
        <Link href="/">
          {/* <div className="flex items-center "> */}
          {/* <Image src={logo} alt="nash logo" width={50} height={50} priority /> */}
          <p className="text-2xl font-semibold font-roboto">Nashles</p>
          {/* </div> */}
        </Link>
      </div>
      <div className="relative w-full min-h-screen h-full ">
        {/* Background Glow */}
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full " />
        <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full " />
        {children}
      </div>

      <footer
        ref={footerRef}
        className={`w-full  min-h-102 h-full  py-6 text-center text-sm text-white
          transition-all duration-700 
          ${
            footerVisible
              ? "opacity-100 translate-y-0  "
              : "opacity-0 translate-y-8"
          }
        `}
      >
        <Footer />
      </footer>
    </div>
  );
}
