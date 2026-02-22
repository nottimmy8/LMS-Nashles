import logo from "@/public/nashlogow.png";
import Image from "next/image";
import SidebarRoute from "./sidebar-route";
const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-[#0a0a0f] border-r border-white/5">
      {/* logo */}
      <div className="flex items-center gap-3 px-2 py-6 mb-4">
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full" />
          <Image
            src={logo}
            alt="logo"
            width={42}
            height={42}
            className="relative z-10"
          />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg tracking-tight">
            Nashles
          </h1>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium">
            Academy
          </p>
        </div>
      </div>
      {/* sidebar */}
      <div className="flex-1 px-2">
        <SidebarRoute />
      </div>
    </div>
  );
};

export default Sidebar;
