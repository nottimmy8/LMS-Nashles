"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { CardHeader } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const MonthlyViewsRadialChart = ({
  views,
  target,
}: {
  views: number;
  target: number;
}) => {
  const percentage = Math.min(Math.round((views / target) * 100), 100);

  const data = [
    {
      name: "Views",
      value: percentage,
      fill: "#0D0D0D80",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow w-full p-5 max-w-sm">
      {/* heading Label */}
      <div className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-lg font-semibold">Monthly Views</h3>
          <Select>
            <SelectTrigger className="w-20">
              <SelectValue placeholder="JAN" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="JAN">JAN</SelectItem>
              <SelectItem value="FEB">FEB</SelectItem>
              <SelectItem value="MAR">MAR</SelectItem>
              <SelectItem value="APR">APR</SelectItem>
              <SelectItem value="MAY">MAY</SelectItem>
              <SelectItem value="JUN">JUN</SelectItem>
              <SelectItem value="JUL">JUL</SelectItem>
              <SelectItem value="AUG">AUG</SelectItem>
              <SelectItem value="SEP">SEP</SelectItem>
              <SelectItem value="OCT">OCT</SelectItem>
              <SelectItem value="NOV">NOV</SelectItem>
              <SelectItem value="DEC">DEC</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
      </div>

      <div className="px-6 ">
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
      </div>
      {/* bottom label */}
      <div className="text-center ">
        <p className="text-3xl font-bold">{views.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">Monthly Views</p>
        <p className="text-xs text-orange-500 mt-1">{percentage}% of goal</p>
      </div>
    </div>
  );
};

export default MonthlyViewsRadialChart;
