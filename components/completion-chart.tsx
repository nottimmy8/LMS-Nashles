import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const data = [{ name: "Completion", value: 72 }];

export function CompletionRateChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Avg Completion Rate</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={data}
            startAngle={90}
            endAngle={450}
          >
            <RadialBar
              dataKey="value"
              background
              fill="#0d0d0d"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <span className="text-4xl font-bold text-gray-900">72%</span>
          <span className="text-xs text-gray-400 font-medium">Completed</span>
        </div>
      </CardContent>
    </Card>
  );
}
