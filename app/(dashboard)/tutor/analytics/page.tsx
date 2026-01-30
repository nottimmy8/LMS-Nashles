import { EarningsChart } from "@/components/EarningsChart";
import { MontlyDataChart } from "@/components/radar-chart";
import React from "react";

const TAnalyticsPage = () => {
  return (
    <div>
      <div className="w-full grid grid-cols-3 gap-6">
        <div className="col-span-3 md:col-span-2 ">
          <EarningsChart />
        </div>
        <div className="col-span-3 md:col-span-1">
          <MontlyDataChart />
        </div>
      </div>
    </div>
  );
};

export default TAnalyticsPage;
