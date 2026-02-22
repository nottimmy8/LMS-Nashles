import { LucideIcon } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";

interface UserCardProps {
  type: string;
  value: string;
  icon?: LucideIcon;
  variant?: "white" | "dark" | "blue" | "green";
}

const UserCard = ({
  type,
  value,
  icon: Icon,
  variant = "white",
}: UserCardProps) => {
  const variants = {
    white: "bg-white/5 border-white/10 text-white",
    dark: "bg-[#050505]/90 text-white border-white/5",
    blue: "bg-blue-600/20 text-blue-400 border-blue-500/20",
    green: "bg-emerald-600/20 text-emerald-400 border-emerald-500/20",
  };

  return (
    <div
      className={cn(
        "relative p-6 rounded-[2rem] border backdrop-blur-3xl shadow-2xl transition-all duration-500 group flex-1 min-w-[240px] overflow-hidden",
        variants[variant],
      )}
    >
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex justify-between items-start mb-6">
        {Icon && (
          <div
            className={cn(
              "p-3 rounded-2xl transition-transform duration-500 group-hover:scale-110",
              variant === "white"
                ? "bg-white/10 text-white"
                : "bg-white/5 text-white/70",
            )}
          >
            <Icon size={22} />
          </div>
        )}
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-30">
          Analytics
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-bold opacity-40 mb-1 uppercase tracking-[0.15em]">
          {type}
        </p>
        <h2 className="text-4xl font-bold tracking-tight">{value}</h2>
      </div>
    </div>
  );
};

export default UserCard;
