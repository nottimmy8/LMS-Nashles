"use client";
import StatusCard from "../../_components/status-card";
import MontlyProfit from "../../_components/profit-chart";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { mockCourses } from "@/app/(dashboard)/tutor/my-courses/page";
import { DataTable } from "../../_components/data-table";

const EarningsPage = () => {
  const columns: ColumnDef<(typeof mockCourses.published)[number]>[] = [
    {
      accessorKey: "title",
      header: "Courses",
      cell: ({ row }) => {
        const course = row.original;
        return (
          <div className="flex items-center gap-3">
            <Image
              src={course.thumbnail}
              alt={course.title}
              width={50}
              height={50}
            />
            <span className="flex flex-col">
              <h1 className="font-semibold">{course.title}</h1>
              <p className="text-sm text-gray-500">{course.category}</p>
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "level",
      header: "Level",
    },

    {
      accessorKey: "views",
      header: "Views",
    },
    {
      accessorKey: "revenue",
      header: () => <div className="text-center">Revenue</div>,
      cell: ({ row }) => {
        const revenue = parseFloat(row.getValue("revenue"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(revenue);

        return <div className="text-center font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "rating",
      header: "Rating",
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
    },
    {
      // id: "actions",
      accessorKey: "Actions",
      cell: ({ row }) => {
        const published = row.original;
        return (
          <div>
            <button className="bg-primary text-white text-xs px-3 py-1.5 rounded">
              View More
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex gap-6 mb-6">
        <StatusCard label="Total Uploaded" value="10" />
        <StatusCard label="Total Sold" value="10" />
        <StatusCard label="Total Earnings" value="$1,000" />
      </div>
      <div className="w-full bg-white rounded-2xl shadow px-6 py-4 mb-6">
        <div className="pb-6">
          <h1 className="text-2xl font-bold"> Courses Revenue</h1>
        </div>
        <DataTable columns={columns} data={mockCourses.published} />
      </div>

      <div className="">
        <MontlyProfit />
      </div>
    </div>
  );
};

export default EarningsPage;
