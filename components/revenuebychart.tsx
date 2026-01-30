import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function RevenueByCourseChart() {
  const data = [
    { course: "React", revenue: 3200 },
    { course: "Node", revenue: 2100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue by Course</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="course" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
