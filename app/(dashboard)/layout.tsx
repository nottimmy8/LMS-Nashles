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
  // const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <div>{children}</div>
    </AuthGuard>
  );
}
