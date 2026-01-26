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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

const data = [
  { month: "Jan", earnings: 32000, expense: 18000 },
  { month: "Feb", earnings: 25000, expense: 16000 },
  { month: "Mar", earnings: 17000, expense: 8000 },
  { month: "Apr", earnings: 26000, expense: 22000 },
  { month: "May", earnings: 5000, expense: 15000 },
  { month: "Jun", earnings: 22000, expense: 13000 },
  { month: "Jul", earnings: 40000, expense: 22000 },
  { month: "Aug", earnings: 18000, expense: 28000 },
  { month: "Sep", earnings: 32000, expense: 15000 },
  { month: "Oct", earnings: 25000, expense: 23000 },
  { month: "Nov", earnings: 17000, expense: 11000 },
  { month: "Dec", earnings: 22000, expense: 28000 },
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
            <Bar dataKey="earnings" fill="#0d0d0d" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#e5e4e2" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
