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
      <div className=" max-w-6xl w-full mx-auto px-6">
        <Link href="/">
          <div className="flex items-center ">
            <Image src={logo} alt="" width={60} height={60} />
            <p className="text-2xl font-semibold font-roboto">Nashles</p>
          </div>
        </Link>
        <div className="w-full min-h-screen h-full ">{children}</div>
      </div>

      <footer
        ref={footerRef}
        className={`w-full bg-primary/50 min-h-102 h-full border-t border-primary py-6 text-center text-sm text-white
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
