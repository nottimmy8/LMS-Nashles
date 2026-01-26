import { StaticImageData } from "next/image";
import React from "react";

const UserCard = ({
  type,
  value,
  //   icon,
}: {
  type: string;
  value: string;
  //   icon: StaticImageData;
}) => {
  return (
    <div className="rounded-2xl shadow-md odd:bg-white odd:text-black even:bg-primary even:text-white p-4  flex-1 min-w-32.5 ">
      {/* <div>{icon} </div> */}
      <p>{type} </p>
      <h2>{value} </h2>
    </div>
  );
};

export default UserCard;
