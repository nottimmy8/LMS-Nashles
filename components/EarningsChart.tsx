"use client";

import { useEffect, useState } from "react";
import { getEarningsChartData } from "@/services/analytics-service";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, Loader2 } from "lucide-react";

export function EarningsChart() {
  const [data, setData] = useState<any[]>([]);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getEarningsChartData(parseInt(year));
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch earnings chart data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [year]);

  const years = ["2024", "2025", "2026"]; // Could be dynamic

  return (
    <Card className="border-gray-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Total Earnings</CardTitle>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-24">
            <SelectValue placeholder={year} />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="h-75 ">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-300 font-medium">
            No recording found for this year
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="rgba(255,255,255,0.03)"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 12 }}
                tickFormatter={(v) => (v >= 1000 ? `${v / 1000}K` : v)}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.02)" }}
                contentStyle={{
                  backgroundColor: "#0a0a0a",
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  color: "#fff",
                }}
                itemStyle={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              />
              <Bar dataKey="earnings" fill="#0d0d0d" radius={[6, 6, 0, 0]} />
              <Bar dataKey="enrollments" fill="#94a3b8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Analytics for the year {year} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - December {year}
        </div>
      </CardFooter>
    </Card>
  );
}
