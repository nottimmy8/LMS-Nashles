"use client";

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
} from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", earnings: 32000, withdraw: 18000 },
  { month: "Feb", earnings: 25000, withdraw: 16000 },
  { month: "Mar", earnings: 17000, withdraw: 8000 },
  { month: "Apr", earnings: 26000, withdraw: 22000 },
  { month: "May", earnings: 5000, withdraw: 15000 },
  { month: "Jun", earnings: 22000, withdraw: 13000 },
  { month: "Jul", earnings: 40000, withdraw: 22000 },
  { month: "Aug", earnings: 18000, withdraw: 28000 },
  { month: "Sep", earnings: 32000, withdraw: 15000 },
  { month: "Oct", earnings: 25000, withdraw: 23000 },
  { month: "Nov", earnings: 17000, withdraw: 11000 },
  { month: "Dec", earnings: 22000, withdraw: 28000 },
];

export function EarningsChart() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">Total Earnings</h3>
        <Select>
          <SelectTrigger className="w-25">
            <SelectValue placeholder="2022" />
          </SelectTrigger>
        </Select>
      </CardHeader>

      <CardContent className="h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `${v / 1000}K`} />
            <Tooltip />
            <Bar dataKey="earnings" fill="#4c4b4bff" radius={[6, 6, 0, 0]} />
            <Bar dataKey="withdraw" fill="#e5e4e2" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2026
        </div>
      </CardFooter>
    </Card>
  );
}
