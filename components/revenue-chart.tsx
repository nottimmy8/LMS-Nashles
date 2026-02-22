import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", revenue: 1200 },
  { month: "Feb", revenue: 1800 },
  { month: "Mar", revenue: 2600 },
  { month: "Apr", revenue: 1200 },
  { month: "May", revenue: 1800 },
  { month: "Jun", revenue: 2600 },
  { month: "Jul", revenue: 1200 },
];

export function RevenueTrendChart() {
  return (
    <Card className="bg-[#0a0a0a] border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden p-8 transition-all hover:border-white/10 group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <CardHeader className="relative z-10 pb-4">
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">
          Revenue Insights
        </div>
        <CardTitle className="text-xl font-bold text-white tracking-tight">
          Earnings Trend
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.03)"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.3)",
                fontSize: 10,
                fontWeight: 700,
              }}
              dy={15}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.3)",
                fontSize: 10,
                fontWeight: 700,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0a0a",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "700" }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#fff"
              strokeWidth={3}
              dot={{ fill: "#fff", strokeWidth: 2, r: 4 }}
              activeDot={{
                r: 6,
                strokeWidth: 0,
                fill: "var(--color-violet-glow)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="relative z-10 flex-col gap-2 text-sm pt-6 mt-6 border-t border-white/5">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 leading-none font-bold text-white/60 text-[10px] uppercase tracking-[0.2em]">
            Monthly Growth +12%{" "}
            <TrendingUp className="h-3 w-3 text-emerald-500" />
          </div>
          <div className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
            Jan - Jul 2026
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
