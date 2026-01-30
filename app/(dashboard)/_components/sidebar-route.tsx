"use client";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  BookOpen,
  PlusCircle,
  BarChart3,
  DollarSign,
  Settings,
  LogOut,
  Search,
  PlayCircle,
  Award,
  Heart,
} from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { Modal } from "@/components/ui/modal";

const adminRoutes = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/admin",
  },
  {
    icon: Users,
    label: "Student",
    href: "/admin/students",
  },
  {
    icon: GraduationCap,
    label: "Teachers",
    href: "/admin/teachers",
  },
  {
    icon: CalendarCheck,
    label: "Attendance",
    href: "/admin/attendance",
  },
  {
    icon: BookOpen,
    label: "Courses",
    href: "/admin/courses",
  },
  {
    icon: LogOut,
    label: "LogOut",
    href: "/",
  },
];

const studentRoutes = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/student",
  },
  {
    icon: PlayCircle,
    label: "My Learning",
    href: "/student/my-learning",
  },
  {
    icon: Search,
    label: "Browse Courses",
    href: "/student/search",
  },
  {
    icon: Award,
    label: "Certificates",
    href: "/student/certificates",
  },
  {
    icon: Heart,
    label: "Wishlist",
    href: "/student/wishlist",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/student/settings",
  },
  {
    icon: LogOut,
    label: "LogOut",
    href: "/",
  },
];

const tutorRoutes = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    href: "/tutor",
  },
  {
    icon: BookOpen,
    label: "My Courses",
    href: "/tutor/my-courses",
  },
  {
    icon: PlusCircle,
    label: "Upload Course",
    href: "/tutor/upload-course",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    href: "/tutor/analytics",
  },
  {
    icon: DollarSign,
    label: "Earnings",
    href: "/tutor/earnings",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/tutor/settings",
  },
  {
    icon: LogOut,
    label: "LogOut",
    href: "/",
  },
];

const SidebarRoute = () => {
  const pathname = usePathname() || "";
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    router.replace("/sign-in");
  };

  let routes = adminRoutes;

  if (pathname.startsWith("/admin")) {
    routes = adminRoutes;
  } else if (pathname.startsWith("/tutor")) {
    routes = tutorRoutes;
  } else if (pathname.startsWith("/student")) {
    routes = studentRoutes;
  }

  return (
    <div>
      {routes.map((routes) => (
        <SidebarItem
          key={routes.href}
          icon={routes.icon}
          label={routes.label}
          href={routes.label === "LogOut" ? "#" : routes.href}
          onClick={routes.label === "LogOut" ? handleLogoutClick : undefined}
        />
      ))}

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Log Out"
        description="Are you sure you want to log out?"
      >
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={confirmLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Log Out
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SidebarRoute;
