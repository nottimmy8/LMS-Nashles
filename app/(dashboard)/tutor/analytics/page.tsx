"use client";
import { EarningsChart } from "@/components/EarningsChart";
import { MontlyDataChart } from "@/components/radar-chart";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../_components/data-table";
// import { mockCourses } from "../my-courses/page";
import { CardTitle } from "@/components/ui/card";
import StatusCard from "../../_components/status-card";
import { RevenueTrendChart } from "@/components/revenue-chart";
import { EnrollmentGrowthChart } from "@/components/enrollment-chart";
import { CompletionRateChart } from "@/components/completion-chart";

import {
  FileText,
  ShoppingBag,
  DollarSign,
  Clock,
  TrendingUp,
  Users,
} from "lucide-react";

const TAnalyticsPage = () => {
  // const columns: ColumnDef<(typeof mockCourses.published)[number]>[] = [
  //   {
  //     accessorKey: "title",
  //     header: "Courses",
  //     cell: ({ row }) => {
  //       const course = row.original;
  //       return (
  //         <div>
  //           <span className="flex flex-col">
  //             <h1 className="font-semibold">{course.title}</h1>
  //             <p className="text-sm text-gray-500">{course.category}</p>
  //           </span>
  //         </div>
  //       );
  //     },
  //   },

  //   {
  //     accessorKey: "views",
  //     header: "Views",
  //   },
  //   {
  //     accessorKey: "revenue",
  //     header: () => <div className="text-center">Revenue</div>,
  //     cell: ({ row }) => {
  //       const revenue = parseFloat(row.getValue("revenue"));
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "USD",
  //       }).format(revenue);

  //       return <div className="text-center font-medium">{formatted}</div>;
  //     },
  //   },
  //   {
  //     accessorKey: "lastUpdated",
  //     header: "Last Updated",
  //   },
  //   {
  //     // id: "actions",
  //     accessorKey: "Actions",
  //     cell: ({ row }) => {
  //       const published = row.original;
  //       return (
  //         <div>
  //           <button className="bg-primary text-white text-xs px-3 py-1.5 rounded hover:bg-black/90 transition-colors">
  //             View More
  //           </button>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          label="Total Uploaded"
          value="10"
          icon={FileText}
          color="slate"
        />
        <StatusCard
          label="Total Sold"
          value="156"
          icon={ShoppingBag}
          color="indigo"
          trend="+12%"
        />
        <StatusCard
          label="Total Earnings"
          value="$12,450"
          icon={DollarSign}
          color="emerald"
          trend="+8.4%"
        />
        <StatusCard
          label="Total Students"
          value="1,240"
          icon={Users}
          color="orange"
          trend="+5.2%"
        />
      </div>
      <div className="w-full grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-3 md:col-span-2 ">
          <RevenueTrendChart />
        </div>
        <div className="col-span-3 md:col-span-1">
          <MontlyDataChart />
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-3 md:col-span-1">
          <CompletionRateChart />
        </div>
        <div className="col-span-3 md:col-span-2 ">
          <EnrollmentGrowthChart />
        </div>
      </div>

      <div className="w-full bg-white rounded-2xl shadow px-6 py-4 mb-6">
        <div className="pb-6">
          <CardTitle className="text-2xl font-bold">Courses Uploaded</CardTitle>
        </div>
        {/* <DataTable columns={columns} data={mockCourses.published} /> */}
      </div>
    </div>
  );
};

export default TAnalyticsPage;
