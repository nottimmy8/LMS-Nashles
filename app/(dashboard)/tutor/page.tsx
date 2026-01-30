import React from "react";
import UserCard from "../_components/user-card";
import { EarningsChart } from "@/components/EarningsChart";
import MonthlyViewsRadialChart from "@/components/radial-chart";
import { DataTable } from "../_components/data-table";
import { columns } from "../_components/column";
import { payments, tutorCourses } from "@/data/page";

const Tutorpage = () => {
  // Get the 5 most recent courses based on lastUpdated
  const recentCourses = [...tutorCourses]
    .sort(
      (a, b) =>
        new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <UserCard type="Courses uploaded" value="1000" />
        <UserCard type="Courses sold" value="1000" />
        <UserCard type="Total earnings" value="1000" />
        <UserCard type="Total watched hours" value="1000" />
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="w-full col-span-2 ">
          <EarningsChart />
        </div>
        <div className="w-full col-span-2 md:col-span-1">
          <MonthlyViewsRadialChart />
        </div>
      </div>
      <div className="w-full bg-white rounded-2xl shadow p-6">
        <div className="pb-6">
          <h1 className="text-2xl font-bold">Recent Courses</h1>
        </div>
        <DataTable columns={columns} data={recentCourses} />
      </div>
    </div>
  );
};

export default Tutorpage;
