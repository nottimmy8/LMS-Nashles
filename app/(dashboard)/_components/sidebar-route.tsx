"use client";
import MenuIcon from "@/public/sidebarSVG/a.svg";
import MenuIconActive from "@/public/sidebarSVG/layout.svg";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

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
          href={routes.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoute;
