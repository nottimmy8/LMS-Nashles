"use client";

import { useEffect, useRef, useState } from "react";
import Sidebar from "./_components/sidebar";
import DashNavbar from "./_components/navbar";
import Footer from "@/components/footer";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <AuthGuard>
      <div className="w-full min-h-screen bg-secondary">
        <div className="flex w-full min-h-screen">
          {/* Sidebar */}
          <div className=" h-full w-72 bg-primary flex-col fixed inset-y-0 z-50 p-6">
            <Sidebar />
          </div>
          <div className="md:pl-72 flex-1 w-full mt-6 ml-6 mr-6  h-full    ">
            {/* Navbar */}
            <DashNavbar />
            {/*  */} <main className="w-full mt-6">{children} </main>
          </div>
        </div>
        {/* footer */}
        {/* <footer
        className={`w-full bg-black min-h-102 h-full py-6 text-center transition-all  duration-700 ${
          footerVisible
            ? "opacity-100 translate-y-0  "
            : "opacity-0 translate-y-8"
        }`}
      >
        <Footer />
      </footer> */}
      </div>
    </AuthGuard>
  );
}
