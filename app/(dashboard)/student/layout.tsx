import { AuthGuard } from "@/components/auth/auth-guard";
import DashboardLayout from "../layout";
import DashNavbar from "../_components/navbar";
import Sidebar from "../_components/sidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard role="student">
      <DashboardLayout>
        <div className="w-full min-h-screen bg-white/5">
          <div className="flex w-full min-h-screen relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Sidebar */}
            <div className="hidden md:flex h-full w-72 bg-[#050505]/95 flex-col fixed inset-y-0 z-50">
              <Sidebar />
            </div>
            <div className="md:pl-72 flex-1 w-full min-h-screen relative z-10">
              <main className="w-full h-full p-6 md:p-10">{children}</main>
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
