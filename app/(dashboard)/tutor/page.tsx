"use client";
import UserCard from "../_components/user-card";
import { EarningsChart } from "@/components/EarningsChart";
import MonthlyViewsRadialChart from "@/components/radial-chart";
import { DataTable } from "../_components/data-table";
import { columns } from "../_components/column";
import { payments, tutorCourses } from "@/data/page";
import { PopularCoursesChart } from "@/components/popular-chart";
import { RevenueTrendChart } from "@/components/revenue-chart";

import { BookOpen, ShoppingBag, DollarSign, Clock } from "lucide-react";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <UserCard
          type="Courses uploaded"
          value="12"
          icon={BookOpen}
          variant="white"
        />
        <UserCard
          type="Courses sold"
          value="456"
          icon={ShoppingBag}
          variant="dark"
        />
        <UserCard
          type="Total earnings"
          value="$12,450"
          icon={DollarSign}
          variant="white"
        />
        <UserCard
          type="Total hours"
          value="1,240h"
          icon={Clock}
          variant="white"
        />
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="w-full col-span-2 ">
          {/* <EarningsChart /> */}
          <PopularCoursesChart />
        </div>
        <div className="w-full col-span-2 md:col-span-1">
          <MonthlyViewsRadialChart />
        </div>
      </div>
      <div className="">
        <RevenueTrendChart />
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
