"use client";
import { useEffect, useState } from "react";
import { EarningsChart } from "@/components/EarningsChart";
import { MontlyDataChart } from "@/components/radar-chart";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../_components/data-table";
import { CardTitle } from "@/components/ui/card";
import StatusCard from "../../_components/status-card";
import { RevenueTrendChart } from "@/components/revenue-chart";
import { EnrollmentGrowthChart } from "@/components/enrollment-chart";
import { CompletionRateChart } from "@/components/completion-chart";
import {
  Loader2,
  FileText,
  ShoppingBag,
  DollarSign,
  Users,
} from "lucide-react";

import api from "@/services/api";

const TAnalyticsPage = () => {
  const [data, setData] = useState<{
    stats: {
      totalCourses: number;
      totalStudents: number;
      totalEarnings: number;
    };
    chartData: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);

        const [statsRes, chartRes] = await Promise.all([
          api.get("/tutor/stats"),
          api.get("/tutor/chart-data"),
        ]);

        setData({
          stats: statsRes.data.stats,
          chartData: chartRes.data.chartData,
        });
      } catch (err: any) {
        console.error("ANALYTICS_FETCH_ERROR", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch analytics data",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
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
          Could not load analytics
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard
          label="Total Uploaded"
          value={data.stats.totalCourses.toString()}
          icon={FileText}
          color="slate"
        />
        <StatusCard
          label="Total Students"
          value={data.stats.totalStudents.toString()}
          icon={Users}
          color="indigo"
          trend="+12%" // Placeholder
        />
        <StatusCard
          label="Total Earnings"
          value={`$${data.stats.totalEarnings.toLocaleString()}`}
          icon={DollarSign}
          color="emerald"
          trend="+8.4%" // Placeholder
        />
        <StatusCard
          label="Sales Growth"
          value="15%" // Placeholder
          icon={ShoppingBag}
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
          <CardTitle className="text-2xl font-bold">
            Performance Summary
          </CardTitle>
        </div>
        <p className="text-gray-500">
          Showing real-time data for your published courses and total unique
          students.
        </p>
      </div>
    </div>
  );
};

export default TAnalyticsPage;
