import {
  BarChart,
  Bar,
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
  { course: "Web Dev", students: 2450 },
  { course: "Data Science", students: 1800 },
  { course: "UI/UX Design", students: 1550 },
  { course: "Marketing", students: 1200 },
  { course: "Business", students: 950 },
  { course: "Cybersecurity", students: 780 },
];

export function PopularCoursesChart() {
  return (
    <Card className="bg-[#0a0a0a] border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden p-6 transition-all hover:border-white/10 group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <CardHeader className="relative z-10 mb-6">
        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-2">
          Performance
        </div>
        <CardTitle className="text-xl font-bold text-white tracking-tight">
          Popular Courses
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.03)"
            />
            <XAxis
              dataKey="course"
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
              domain={[0, "auto"]}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "rgba(255,255,255,0.3)",
                fontSize: 10,
                fontWeight: 700,
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.02)" }}
              contentStyle={{
                backgroundColor: "#0a0a0a",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                color: "#fff",
              }}
              itemStyle={{ color: "#fff", fontSize: "12px", fontWeight: "700" }}
            />
            <Bar
              dataKey="students"
              fill="#fff"
              radius={[10, 10, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="relative z-10 flex-col gap-2 text-sm pt-6 mt-6 border-t border-white/5">
        <div className="flex items-center gap-2 leading-none font-bold text-white/60 text-xs uppercase tracking-widest">
          Trending up by 5.2%{" "}
          <TrendingUp className="h-3 w-3 text-emerald-500" />
        </div>
      </CardFooter>
    </Card>
  );
}
