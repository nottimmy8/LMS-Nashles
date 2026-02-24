import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: "up" | "down";
  color?: "slate" | "indigo" | "emerald" | "rose" | "orange";
}

const colors = {
  slate: "bg-slate-50 text-slate-700",
  indigo: "bg-indigo-50 text-indigo-700",
  emerald: "bg-emerald-50 text-emerald-700",
  rose: "bg-rose-50 text-rose-700",
  orange: "bg-orange-50 text-orange-700",
};

const StatusCard = ({
  label,
  value,
  icon: Icon,
  trend,
  trendType = "up",
  color = "slate",
}: StatusCardProps) => {
  return (
    <div className="relative bg-white/5 border-white/10 text-white backdrop-blur-3xl shadow-2xl  flex items-center gap-4 p-6 rounded-3xl group transition-all duration-300">
      {/* Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className={cn("p-4 rounded-2xl", colors[color])}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm font-medium text-white opacity-30 mb-1  tracking-wider">
          {label}
        </p>
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold text-white">{value}</h3>
          {trend && (
            <span
              className={cn(
                "text-xs font-bold px-2 py-1 rounded-full",
                trendType === "up"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-rose-100 text-rose-600",
              )}
            >
              {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
