import logo from "@/public/nashlogow.png";
import Image from "next/image";
import SidebarRoute from "./sidebar-route";
const Sidebar = () => {
  return (
    <div>
      {/* logo */}
      <div className="flex items-center  border-b border-gray-300 py-3 ">
        <Image src={logo} alt="logo" width={50} height={50} />
        <h1 className="text-white font-bold text-[20px] ">Nashles LMS</h1>
      </div>
      {/* sidebar */}
      <div className="mt-8">
        {" "}
        <SidebarRoute />
      </div>
    </div>
  );
};

export default Sidebar;
