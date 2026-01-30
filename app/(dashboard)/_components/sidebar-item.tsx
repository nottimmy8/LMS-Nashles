"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  onClick?: () => void;
}

const SidebarItem = ({
  icon: Icon,
  label,
  href,
  onClick,
}: SidebarItemProps) => {
  const pathname = usePathname();

  const router = useRouter();

  const ROOT_ROUTES = ["/admin", "/tutor", "/student"];

  const isActive =
    pathname === href ||
    (!ROOT_ROUTES.includes(href) && pathname.startsWith(`${href}/`));

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (!isActive) {
      router.push(href);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        className={cn(
          "flex items-center gap-4 px-4 py-3 font-medium w-full rounded-xl mb-1.5 transition-all duration-200 group",
          isActive
            ? "bg-white text-black shadow-sm"
            : "text-white/70 hover:bg-white/10 hover:text-white",
        )}
      >
        <Icon
          className={cn(
            "w-5 h-5 transition-colors",
            isActive ? "text-black" : "text-white/70 group-hover:text-white",
          )}
        />
        <span className="text-sm">{label}</span>
      </button>
    </div>
  );
};

export default SidebarItem;
