"use client";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: StaticImageData;
  activeIcon: StaticImageData;
  label: string;
  href: string;
  onClick?: () => void;
}

const SidebarItem = ({ icon, label, href, activeIcon, onClick }: SidebarItemProps) => {

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
          "flex items-center gap-4 px-4 py-3.5 font-semibold w-full rounded-md mb-3.5 transition-all duration-300 text-white text-[18px]",
          isActive
            ? "bg-white text-primary cursor-default"
            : "hover:bg-secondary/50 hover:text-white",
        )}
      >
        <Image
          src={isActive ? activeIcon : icon}
          alt={label}
          className="w-6 h-6"
        />
        <span className="text-base ">{label}</span>
      </button>
    </div>
  );
};

export default SidebarItem;
