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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <h3 className="text-lg font-semibold">Monthly Views</h3>
        <Select defaultValue="JAN">
          <SelectTrigger className="w-20">
            <SelectValue placeholder="JAN" />
          </SelectTrigger>
          <SelectContent>
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
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            width={250}
            height={250}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="90%"
            barSize={14}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar background dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="text-center flex flex-col gap-2 ">
        <p className="text-3xl font-bold">{views.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Monthly Views</p>
        <p className="text-xs text-orange-500 mt-1">{percentage}% of goal</p>
      </CardFooter>
    </Card>
  );
};

export default MonthlyViewsRadialChart;
