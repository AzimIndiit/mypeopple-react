import {  useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import { AppSidebar } from "@/components/Sidebar/Main";
import AppNavbar from "@/components/Navbar/Main";
import { useViewport } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  //   const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);
  const viewPort = useViewport();
  const isMobile = viewPort === "mobile" || viewPort === "tablet";
  const isDesktop = viewPort === "desktop" || viewPort === "laptop";

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
    if (isDesktop) {
      setCollapsed(false);
    }
  }, [isMobile, isDesktop]);

  if (isMobile) {
    return (
      <div className="flex w-full    ">
        <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed}  />
        <header className="">
          <AppNavbar
            isMobile={isMobile}
            setCollapsed={setCollapsed}
            collapsed={collapsed}
          />
        </header>
        <main className=" w-full px-[2%] mt-[12vh] md:mt-[14vh] bg-white h-screen xl:h-full overflow-auto">
          <Outlet />
        </main>
      </div>
    );
  }

  //For sticky nav and sidebar

  return (
    <div className="flex w-full   min-h-screen relative ">
      <AppSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex flex-col flex-1 ">
        <header className="">
          <AppNavbar
            isMobile={isMobile}
            setCollapsed={setCollapsed}
            collapsed={collapsed}
            className={
              collapsed
                ? "left-[8%] w-[92%] "
                : " left-[18%] xl:left-[16%]  w-[82%] xl:w-[84%] "
            }
          />
        </header>
        <main
          className={cn(
            " h-[88vh] transition-all duration-300  mt-[14vh] px-[2%] md:px-[4%]",
            collapsed
              ? "ml-[8%] left-[8%] w-[92%]"
              : "  ml-[18%] xl:ml-[16%] left-[18%] xl:left-[16%]  w-[82%] xl:w-[84%]"
          )}
        >
          {/* <div className="  bg-yellow-500  "> */}
          <Outlet />
          {/* </div> */}
        </main>
      </div>

      {/*

      <main className={cn(" w-full mt-[35px]  bg-white h-screen xl:h-full overflow-auto fixed top-0 ",collapsed ? "lg:left-[56px]" :"lg:left-[256px]")}>
        <div
          className={cn(
            " px-4  w-full     h-full      ",
            isMobile ? "w-full" : "",
            collapsed ? "lg:px-[4.5vw]   lg:w-[calc(100%-156px)]  " : "lg:px-[4.5vw]  lg:w-[calc(100%-256px)]   "
          )}
        >
          
      <div className="my-[12vh] overflow-hidden">
    

      <Outlet /> 
      </div>
        </div>
      </main> */}
    </div>
  );
};

export default DashboardLayout;
