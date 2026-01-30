"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";
import { Label, Pie, PieChart } from "recharts";

const chartData = [
  { browser: "Pending courses", total: 200, fill: "var(--color-chrome)" },
  { browser: "Courses sold", total: 800, fill: "var(--color-safari)" },
];

const chartConfig = {
  total: {
    label: "Total",
  },
  chrome: {
    label: "Chrome",
    color: "#f1f5f9",
  },
  safari: {
    label: "Safari",
    color: "#0d0d0d",
  },
} satisfies ChartConfig;

export const description = "A donut chart with text";

const MontlyProfit = () => {
  const totaltotal = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0);
  }, []);
  return (
    // <div className="border border-tertiary rounded-lg p-5 bg-white ">
    <Card className="flex flex-col w-full md:max-w-122  ">
      <CardHeader className="items-center pb-0">
        <CardTitle className=" text-[28px] font-semibold ">
          Montly Income
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1  pb-0 flex items-center justify-center ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-62.5  "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="total"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          ${totaltotal.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        {/* INDICATOR */}
        <div className="flex flex-col items-start">
          <span className="flex items-center justify-center gap-2">
            <div className="p-1.5 rounded-full  bg-primary " />
            <p className="text-[14px] ">Course Sold</p>
          </span>
          <span className="flex items-center justify-center gap-2">
            <div className="p-1.5 rounded-full  bg-secondary " />
            <p className="text-[14px] ">Pending Courses</p>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MontlyProfit;
