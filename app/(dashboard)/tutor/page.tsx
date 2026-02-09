"use client";
import { useEffect, useState } from "react";
import UserCard from "../_components/user-card";
import { PopularCoursesChart } from "@/components/popular-chart";
import MonthlyViewsRadialChart from "@/components/radial-chart";
import { RevenueTrendChart } from "@/components/revenue-chart";
import { DataTable } from "../_components/data-table";
import { columns } from "../_components/column";
import {
  BookOpen,
  ShoppingBag,
  DollarSign,
  Clock,
  Loader2,
} from "lucide-react";

import api from "@/services/api";

const Tutorpage = () => {
  const [data, setData] = useState<{
    stats: {
      totalCourses: number;
      totalStudents: number;
      totalEarnings: number;
    };
    recentCourses: any[];
    chartData: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [statsRes, recentRes, chartRes] = await Promise.all([
          api.get("/tutor/stats"),
          api.get("/tutor/recent-courses"),
          api.get("/tutor/chart-data"),
        ]);

        setData({
          stats: statsRes.data.stats,
          recentCourses: recentRes.data.courses,
          chartData: chartRes.data.chartData,
        });
      } catch (err: any) {
        console.error("DASHBOARD_FETCH_ERROR", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch dashboard data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-sky-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-6 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Could not load dashboard
        </h2>
        <p className="text-gray-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-black/90 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <UserCard
          type="Courses uploaded"
          value={data.stats.totalCourses.toString()}
          icon={BookOpen}
          variant="white"
        />
        <UserCard
          type="Total Students"
          value={data.stats.totalStudents.toString()}
          icon={ShoppingBag}
          variant="dark"
        />
        <UserCard
          type="Total earnings"
          value={`$${data.stats.totalEarnings.toLocaleString()}`}
          icon={DollarSign}
          variant="white"
        />
        <UserCard
          type="Avg. Progress"
          value="84%" // Placeholder or calculated from backend if available
          icon={Clock}
          variant="white"
        />
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="w-full col-span-2 ">
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
        <DataTable columns={columns} data={data.recentCourses} />
      </div>
    </div>
  );
};

export default Tutorpage;
