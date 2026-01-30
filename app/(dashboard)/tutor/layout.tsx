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
        <div className="w-full min-h-screen bg-secondary">
          <div className="flex w-full min-h-screen">
            {/* Sidebar */}

            <div className="hidden md:flex h-full w-72 bg-primary/95 flex-col fixed inset-y-0 z-50 p-6">
              <Sidebar />
            </div>
            <div className="md:pl-72 flex-1 w-full h-full    ">
              {/* Navbar */}
              <div className="w-full p-6 pb-0 sticky top-0 z-10">
                <DashNavbar title="Tutor" />
              </div>
              {/*  */} <main className="w-full p-6">{children} </main>
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
