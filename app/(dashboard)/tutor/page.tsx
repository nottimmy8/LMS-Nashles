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
      <div className="flex items-center justify-center h-[70vh]">
        <Loader2 className="h-10 w-10 animate-spin  text-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center p-8 bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 mx-auto max-w-md">
        <h2 className="text-xl font-bold text-white mb-2">
          Dashboard Unavailable
        </h2>
        <p className="text-white/40 mb-8 text-sm">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-white text-black px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-white/90 transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full flex flex-col gap-10 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
          Instructor Hub
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Tutor <span className="text-gradient">Dashboard</span>
        </h1>
        <p className="text-white/40 text-sm max-w-md">
          Manage your academy, track earnings, and monitor student performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <UserCard
          type="Courses active"
          value={data.stats.totalCourses.toString()}
          icon={BookOpen}
          variant="white"
        />
        <UserCard
          type="Total Students"
          value={data.stats.totalStudents.toString()}
          icon={ShoppingBag}
          variant="white"
        />
        <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 text-white p-6 rounded-[2.5rem] shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex items-center justify-between mb-8">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <DollarSign size={22} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
              Earnings
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-1 tracking-tighter">
              ${data.stats.totalEarnings.toLocaleString()}
            </h3>
            <p className="text-[11px] font-bold opacity-60 uppercase tracking-wider">
              Total Revenue
            </p>
          </div>
        </div>
        <UserCard
          type="Avg. Activity"
          value="84%"
          icon={Clock}
          variant="white"
        />
      </div>

      {/* Charts Section */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <PopularCoursesChart />
        </div>
        <div className="w-full">{/* <MonthlyViewsRadialChart /> */}</div>
      </div>

      {/* Recent Courses Table */}
      <div className="w-full glass-panel rounded-[2.5rem] border border-white/5 shadow-2xl p-5 overflow-hidden transition-all hover:border-white/10 group">
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Recent Activity
            </h2>
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
              Latest Updates
            </div>
          </div>
          <DataTable columns={columns} data={data.recentCourses} />
        </div>
      </div>
    </div>
  );
};

export default Tutorpage;
