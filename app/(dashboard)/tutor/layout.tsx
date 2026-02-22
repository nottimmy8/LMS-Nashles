import { AuthGuard } from "@/components/auth/auth-guard";
import DashboardLayout from "../layout";
import Sidebar from "../_components/sidebar";
import DashNavbar from "../_components/navbar";
// import { useEffect, useState } from "react";

export default function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 20);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);
  return (
    <AuthGuard role="tutor">
      <DashboardLayout>
        <div className="w-full min-h-screen bg-[#050505]">
          <div className="flex w-full min-h-screen relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Sidebar */}
            <div className="hidden md:flex h-full w-72 bg-[#050505]/95 flex-col fixed inset-y-0 z-50">
              <Sidebar />
            </div>
            <div className="md:pl-72 flex-1 w-full min-h-screen relative z-10">
              {/* Navbar / Top Bar */}
              <div className="w-full px-6 py-6 md:px-10 flex justify-end">
                <DashNavbar title="Instructor Hub" />
              </div>

              <main className="w-full h-full p-6 pt-0 md:p-10 md:pt-0">
                {children}
              </main>
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
      </DashboardLayout>
    </AuthGuard>
  );
}
