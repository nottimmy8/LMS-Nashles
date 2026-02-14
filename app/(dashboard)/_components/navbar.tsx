import React from "react";
import Search from "../search/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NotificationPopover from "@/components/notification-popover";

const DashNavbar = ({ title }: { title: string }) => {
  return (
    <div className="  p-4 bg-white/80 backdrop-blur-md shadow-xs  bg-transparent rounded-lg flex justify-between gap-10 items-center  ">
      <h1 className="text-[22px] font-semibold ">{title} </h1>

      <div className="flex max-w-1/2 w-full gap-6 ">
        <div className="flex-1  min-w-1/2   ">
          <Search />
        </div>
        <Avatar className="justify-end">
          {/* <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          /> */}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <NotificationPopover />
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
