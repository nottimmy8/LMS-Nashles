"use client";
import { AuthGuard } from "@/components/auth/auth-guard";
import DashboardLayout from "../layout";
import Sidebar from "../_components/sidebar";
import Footer from "@/components/footer";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard role="tutor">
      <DashboardLayout>
        <div className="w-full min-h-screen bg-white/5">
          <div className="flex w-full h-screen relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Sidebar */}
            <div className="hidden md:flex h-full w-72 bg-[#050505]/95 flex-col  sticky inset-y-0 z-50">
              <Sidebar />
            </div>

            <main className=" flex-1  w-full h-full p-6  md:p-10 overflow-y-auto">
              {children}
            </main>
          </div>
          {/* footer */}
          {/* <Footer /> */}
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
}
