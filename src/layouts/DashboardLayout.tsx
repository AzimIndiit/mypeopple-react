import React,{ ReactNode } from "react";
import { Outlet } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/Main"

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = () => {
//   const { t, i18n } = useTranslation();
const [open, setOpen] = React.useState(true)

  return (
    <div className="flex w-full  ">
    
      <AppSidebar />
      <main>
        <Outlet />
      </main>
    
    </div>
  );
};

export default DashboardLayout;