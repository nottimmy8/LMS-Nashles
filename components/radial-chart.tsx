"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ChartContainer, type ChartConfig } from "./ui/chart";

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface MonthlyViewsRadialChartProps {
  views?: number;
  goal?: number;
}

const MonthlyViewsRadialChart = ({
  views = 1200,
  goal = 2000,
}: MonthlyViewsRadialChartProps) => {
  const percentage = Math.min(Math.round((views / goal) * 100), 100);

  const data = [
    {
      name: "views",
      value: percentage,
      fill: "hsl(var(--orange-500))",
    },
  ];

  return (
    <Card className="bg-[#0a0a0a] border-white/5 shadow-2xl rounded-[2.5rem] overflow-hidden transition-all hover:border-white/10 group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <CardHeader className="relative z-10 flex flex-row items-center justify-between p-8 pb-4">
        <div>
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-1">
            Engagement
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Monthly Views
          </h3>
        </div>
        <Select defaultValue="JAN">
          <SelectTrigger className="w-24 bg-white/5 border-white/10 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl">
            <SelectValue placeholder="JAN" />
          </SelectTrigger>
          <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
            {[
              "JAN",
              "FEB",
              "MAR",
              "APR",
              "MAY",
              "JUN",
              "JUL",
              "AUG",
              "SEP",
              "OCT",
              "NOV",
              "DEC",
            ].map((month) => (
              <SelectItem
                key={month}
                value={month}
                className="text-[10px] font-bold uppercase tracking-widest focus:bg-white/10"
              >
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="relative z-10 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[220px]"
        >
          <RadialBarChart
            width={220}
            height={220}
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="95%"
            barSize={12}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              background={{ fill: "rgba(255,255,255,0.03)" }}
              dataKey="value"
              cornerRadius={10}
              fill="#fff"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="relative z-10 text-center flex flex-col gap-1 p-8 pt-4">
        <p className="text-4xl font-bold text-white tracking-tighter">
          {views.toLocaleString()}
        </p>
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
          {percentage}% OF MONTHLY GOAL
        </p>
        <div className="mt-4 bg-white/5 rounded-full h-1 w-24 mx-auto overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default MonthlyViewsRadialChart;
