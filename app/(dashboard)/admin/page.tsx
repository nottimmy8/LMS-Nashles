import React from "react";
import { Users, GraduationCap, UserRound, DollarSign } from "lucide-react";
import UserCard from "../_components/user-card";
import { EarningsChart } from "@/components/EarningsChart";

const AdminDash = () => {
  return (
    <div className="flex gap-6 flex-col">
      {/* STAT CARD */}
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <UserCard type="Student" value="1,240" icon={Users} variant="white" />
          <UserCard
            type="Teachers"
            value="48"
            icon={GraduationCap}
            variant="dark"
          />
          <UserCard
            type="Parents"
            value="956"
            icon={UserRound}
            variant="white"
          />
          <UserCard
            type="Earnings"
            value="$45,200"
            icon={DollarSign}
            variant="white"
          />
        </div>
      </div>
      <div className="flex w-full flex-col md:flex-row gap-6">
        {/* LEFT */}
        <div className="lg:w-2/3 grid grid-cols-3   ">
          <div className=" col-span-3 ">
            <EarningsChart />
          </div>
          <div></div>
        </div>
        {/* RIGHT */}
        <div className=" lg:w-1/3  bg-blue-400 p-4"></div>
      </div>
    </div>
  );
};

export default AdminDash;
