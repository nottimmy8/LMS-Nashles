"use client";
import StatusCard from "../../_components/status-card";
import MontlyProfit from "../../_components/profit-chart";
// import Image from "next/image";
// import { ColumnDef } from "@tanstack/react-table";
// import { mockCourses } from "@/app/(dashboard)/tutor/my-courses/page";
// import { DataTable } from "../../_components/data-table";
import { EarningsChart } from "@/components/EarningsChart";
// import { RevenueTrendChart } from "@/components/revenue-chart";
// import { RevenueByCourseChart } from "@/components/revenuebychart";

import { useEffect, useState } from "react";
import { getTutorAnalytics } from "@/services/analytics-service";
import {
  DollarSign,
  ArrowUpRight,
  Wallet,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";

const EarningsPage = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getTutorAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  const handleWithdraw = () => {
    // Placeholder logic for withdrawal
    alert(`Withdrawal request for $${withdrawAmount} submitted!`);
    setShowWithdrawModal(false);
    setWithdrawAmount("");
  };

  const totalRevenue = analytics?.totalRevenue || 0;
  // const totalEnrollments = analytics?.totalEnrollments || 0;

  return (
    <div className="space-y-8">
      {/* Balance Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black text-white p-8 rounded-[2rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 transition-transform">
            <Wallet size={80} />
          </div>
          <p className="text-white/60 text-sm font-medium mb-2 uppercase tracking-widest">
            Available Balance
          </p>
          <h2 className="text-5xl font-bold mb-6">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalRevenue)}
          </h2>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="bg-white text-black px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2"
          >
            Withdraw Now
            <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <StatusCard
            label="Pending Clearance"
            value="$0.00"
            icon={Clock}
            color="orange"
          />
          <StatusCard
            label="Total Withdrawn"
            value="$0.00"
            icon={CheckCircle2}
            color="emerald"
          />
          <StatusCard
            label="Lifetime Earnings"
            value={new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(totalRevenue)}
            icon={DollarSign}
            color="indigo"
          />
          <StatusCard
            label="Monthly Limit"
            value="$50,000.00"
            icon={AlertCircle}
            color="slate"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-xl font-bold">Revenue by Course</h3>
            <button className="text-sm font-medium text-gray-400 hover:text-black transition-colors underline underline-offset-4">
              Download Report
            </button>
          </div>
          <div className="p-4">
            {/* <DataTable columns={columns} data={mockCourses.published} /> */}
            <div className="p-8 text-center text-gray-500">
              Detail view coming soon.
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <MontlyProfit />
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <CheckCircle2 size={18} />
              Payout Schedule
            </h4>
            <p className="text-sm text-emerald-700 leading-relaxed">
              Your next automatic payout is scheduled for{" "}
              <strong>Feb 15, 2026</strong>. Add a bank account to enable
              instant withdrawals.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Earnings Analytics</h3>
        <EarningsChart />
      </div>

      <Modal
        isOpen={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        title="Withdraw Funds"
        description="Transfer your available balance to your linked bank account."
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Amount to withdraw
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">
                $
              </span>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2">
              Available:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalRevenue)}{" "}
              • Transaction fee: $2.50
            </p>
          </div>
          <div className="pt-4 flex gap-3">
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleWithdraw}
              disabled={!withdrawAmount}
              className="flex-1 px-4 py-3 bg-black text-white rounded-xl text-sm font-bold hover:bg-black/90 transition-all disabled:opacity-50"
            >
              Confirm Withdrawal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EarningsPage;
