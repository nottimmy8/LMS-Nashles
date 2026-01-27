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
        <div className="w-full min-h-screen bg-secondary">
          <div className="flex w-full min-h-screen">
            {/* Sidebar */}

            <div className="hidden md:flex h-full w-72 bg-primary flex-col fixed inset-y-0 z-50 p-6">
              <Sidebar />
            </div>
            <div className="md:pl-72 flex-1 w-full mt-6 ml-6 mr-6  h-full    ">
              {/* Navbar */}
              <DashNavbar title="Student" />
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
      </DashboardLayout>
    </AuthGuard>
  );
}
