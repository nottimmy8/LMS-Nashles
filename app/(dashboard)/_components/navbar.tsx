import React from "react";
import Search from "../search/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashNavbar = () => {
  return (
    <div className=" w-full p-4 bg-white rounded-lg flex justify-between gap-10 items-center  ">
      <h1 className="text-[22px] font-semibold ">ADMIN</h1>

      <div className="flex max-w-1/2 w-full gap-6 ">
        <div className="flex-1  min-w-1/2   ">
          <Search />
        </div>
        <Avatar className="justify-end">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default DashNavbar;
