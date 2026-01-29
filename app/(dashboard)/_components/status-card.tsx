import React from "react";

const StatusCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col flex-1 items-center justify-center shadow-sm bg-white rounded-2xl p-4 ">
      <h1 className="text-2xl font-semibold">{label} </h1>
      <p className="text-lg text-primary/50 font-semibold">{value}</p>
    </div>
  );
};

export default StatusCard;
