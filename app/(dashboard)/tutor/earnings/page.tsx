import React from "react";
import StatusCard from "../../_components/status-card";
import MontlyProfit from "../../_components/profit-chart";
import { DataTable } from "../../_components/data-table";

const EarningsPage = () => {
  return (
    <div>
      <div className="flex gap-6">
        <StatusCard label="Total Uploaded" value="10" />
        <StatusCard label="Total Sold" value="10" />
        <StatusCard label="Total Earnings" value="$1,000" />
      </div>
      <div>{/* <DataTable columns={columns} data={data} /> */}</div>

      <div>
        <MontlyProfit />
      </div>
    </div>
  );
};

export default EarningsPage;
