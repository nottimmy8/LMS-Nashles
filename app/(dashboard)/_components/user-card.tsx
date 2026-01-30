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
    white: "bg-white text-gray-900 border-gray-100",
    dark: "bg-black text-white border-white/10",
    blue: "bg-blue-600 text-white border-transparent",
    green: "bg-emerald-600 text-white border-transparent",
  };

  return (
    <div
      className={cn(
        "p-6 rounded-[2rem] border shadow-sm transition-all hover:shadow-md group flex-1 min-w-[200px]",
        variants[variant],
      )}
    >
      <div className="flex justify-between items-start mb-4">
        {Icon && (
          <div
            className={cn(
              "p-3 rounded-2xl",
              variant === "white"
                ? "bg-gray-50 text-gray-500"
                : "bg-white/10 text-white",
            )}
          >
            <Icon size={24} />
          </div>
        )}
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-60">
          Metric
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold opacity-60 mb-1 uppercase tracking-wider">
          {type}
        </p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>
    </div>
  );
};

export default UserCard;
