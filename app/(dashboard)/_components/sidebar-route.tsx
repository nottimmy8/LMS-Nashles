"use client";
import MenuIcon from "@/public/sidebarSVG/a.svg";
import MenuIconActive from "@/public/sidebarSVG/layout.svg";
import SidebarItem from "./sidebar-item";
import { usePathname, useRouter } from "next/navigation"; // Added useRouter
import { useAuthStore } from "@/store/auth.store"; // Added useAuthStore
import { useState } from "react";
import { Modal } from "@/components/ui/modal";



const adminRoutes = [
  {
    icon: MenuIcon,
    activeIcon: MenuIconActive,
    label: "Overview",
    href: "/admin",
  },
  {
    icon: MenuIcon,
    activeIcon: MenuIconActive,
    label: "Student",
    href: "/admin/students",
  },
  {
    icon: MenuIcon,
    activeIcon: MenuIconActive,
    label: "Teachers",
    href: "/admin/teachers",
  },
  {
    icon: MenuIcon,
    activeIcon: MenuIconActive,
    label: "Attendance",
    href: "/admin/attendance",
  },
  {
    icon: MenuIcon,
    activeIcon: MenuIconActive,
    label: "Courses",
    href: "/admin/courses",
  },
  {
    icon: MenuIcon,
    activeIcon: MenuIconActive,
    label: "LogOut",
    href: "/",
  },
];

const studentRoutes = [
  {
    icon: MenuIcon,
    activeIcon: MenuIconActive,
    label: "Overview",
    href: "/student",
  },
  {
    icon: MenuIcon,
    activeIcon: MenuIconActive,
    label: "LogOut",
    href: "/",
  },
];

const tutorRoutes = [
  {
    icon: MenuIcon,
    activeIcon: MenuIconActive,
    label: "Overview",
    href: "/tutor",
  },
  {
    icon: MenuIcon,
    activeIcon: MenuIconActive,
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
          activeIcon={routes.activeIcon}
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
