import { motion } from "framer-motion";
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
    <button
      onClick={handleClick}
      type="button"
      className={cn(
        "flex items-center gap-4 px-4 py-3 font-medium w-full rounded-2xl mb-1.5 transition-all duration-300 group relative overflow-hidden",
        isActive
          ? "bg-gradient-to-r from-violet-500 to-cyan-500 text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          : "text-white/40 hover:text-white hover:bg-white/[0.03]",
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 transition-transform duration-300",
          isActive
            ? "text-black"
            : "text-white/40 group-hover:text-white group-hover:scale-110",
        )}
      />
      <span className="text-sm tracking-tight">{label}</span>
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute left-0 w-1 h-6 bg-black rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </button>
  );
};

export default SidebarItem;
