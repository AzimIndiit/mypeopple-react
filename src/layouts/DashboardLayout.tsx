import React,{ ReactNode, useState } from "react";
import { Outlet } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import { AppSidebar } from "@/components/Sidebar/Main"
import AppNavbar from "@/components/Navbar/Main";
import { useViewport } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = () => {
//   const { t, i18n } = useTranslation();
const [collapsed, setCollapsed] = useState( false);
const viewPort = useViewport()
const isMobile = viewPort === "mobile" || viewPort === "tablet"

  return (
    <div className="flex w-full   relative ">
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <main className=" w-full mt-[35px] bg-white h-screen xl:h-full overflow-auto">
      
        
        <div className={cn(" px-4  w-full   lg:w-[800px]  h-full  xl:w-[1113px] mx-auto   ", isMobile ? "w-full" : "")}>
        <AppNavbar isMobile={isMobile} setCollapsed={setCollapsed} collapsed={collapsed} />
        <hr className="border-t border-gray-200 my-[20px]"/>
          <Outlet />
        </div>
      </main>
    
    </div>
  );
};

export default DashboardLayout;