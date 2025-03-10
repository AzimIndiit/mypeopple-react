import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import userIcon from "@/assets/icons/user.svg";
import logo from "@/assets/icons/logo.svg";
import logo1 from "@/assets/icons/logo1.svg";
import chevronLeft from "@/assets/icons/chevron-left.svg";
import chevronRight from "@/assets/icons/chevron-right.svg";
import addSolidIcon from "@/assets/icons/add-solid.svg";
import dashboardIcon from "@/assets/icons/dashboard.svg";
import chartIcon from "@/assets/icons/Chart.svg";
import settingIcon from "@/assets/icons/Setting.svg";
import currencyIcon from "@/assets/icons/currency.svg";
import languageIcon from "@/assets/icons/language.svg";
import logoutIcon from "@/assets/icons/logout.svg";
import coinIcon from "@/assets/icons/coin.svg";
import messageIcon from "@/assets/icons/message.svg";
import discoverIcon from "@/assets/icons/Discovery.svg";


// Menu items.
const menuItems1 = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: dashboardIcon,
  },
  {
    title: "My HRBP",
    url: "/users",
    icon: userIcon,
  },
  {
    title: "My Orders",
    url: "/orders",
    icon: chartIcon,
  },
  {
    title: "My Tools Box",
    url: "/search",
    icon: discoverIcon,
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: messageIcon,
  },
  {
    title: "Billing & Payments",
    url: "/settings",
    icon: coinIcon,
  },
];
const menuItems2 = [
    {
      title: "Language",
      url: "/language",
      icon: languageIcon,
    },
    {
      title: "Currency",
      url: "/inbox",
      icon: currencyIcon,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: settingIcon,
    },
    {
      title: "Logout",
      url: "/login",
      icon: logoutIcon,
    },
  ];
export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // Get current route

  return (
    <div
      className={cn(
        "text-white p-4 transition-all duration-300 border-r border-gray-200 max-h-screen overflow-y-auto", // Add bg color
        collapsed ? "w-[119px]" : "w-[256px]"
      )}
    >
      <div className="flex justify-center items-center my-[30px] lg:my-[40px]">
        {!collapsed ? (
          <img src={logo} alt="logo" className="h-[32px] w-[176px] " />
        ) : (
          <img src={logo1} alt="logo" className="h-[56px] w-[56px]" />
        )}
      </div>
     <div className="flex justify-center items-center">
     <div
        //   onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "mb-[26px] lg:mb-[36px] h-[56px] p-[16px] rounded-[12px] flex gap-4 items-center font-primary font-semibold text-[16px] border border-black text-black cursor-pointer hover:bg-black/10",
            collapsed ? "w-[56px]" : "w-full"
          )}
        >
          <img
            src={addSolidIcon}
            alt="toggle"
            className="w-[36px] h-[36px]"
          />
          {!collapsed && "Create Order"}
        </div>
     </div>
      <ul className={cn("flex flex-col", collapsed ? "justify-center items-center" : "w-full")}>
        {menuItems1.map(({ title, url, icon: Icon }) => (
         <Link key={title} to={url} >
             <li
            // key={title}
            className={cn(
              "flex items-center gap-4 h-[56px] p-[16px] rounded-[12px] cursor-pointer transition-colors",
              collapsed ? "w-[56px]" : "w-full",
              location.pathname === url ? "bg-black " : "hover:bg-black/10"
            )}
          >
           {collapsed ? <img src={Icon} alt={title}  className={`w-[36px] h-[36px] ${location.pathname === url ? "filter invert-0" : ""}`} /> :
           <>
            <img src={Icon} alt={title} className="w-[36px] h-[36px]" />
              <div  className={`${collapsed ? "hidden" : "block"} transition-all duration-300 font-primary font-medium text-[14px] text-[#A4A5A6] ${location.pathname === url ? "text-white" : ""}`}>
                {title}
              </div></>}
          </li>
         </Link>
        ))}
      </ul>
  <hr className="my-[26px] lg:my-[36px]"/>
  <ul className={cn("flex flex-col", collapsed ? "justify-center items-center" : "w-full")}>
        {menuItems2.map(({ title, url, icon: Icon }) => (
         <Link key={title} to={url} >
             <li
            // key={title}
            className={cn(
              "flex items-center gap-4 h-[56px] p-[16px] rounded-[12px] cursor-pointer transition-colors",
              collapsed ? "w-[56px]" : "w-full",
              location.pathname === url ? "bg-black " : "hover:bg-black/10"
            )}
          >
               {collapsed ? <img src={Icon} alt={title} className="w-[36px] h-[36px]" /> :
           <>
            <img src={Icon} alt={title} className="w-[36px] h-[36px]" />
              <div  className={`${collapsed ? "hidden" : "block"} transition-all duration-300 font-primary font-medium text-[14px] text-[#A4A5A6] ${location.pathname === url ? "text-white" : ""}`}>
                {title}
              </div></>}
          </li>
         </Link>
        ))}
      </ul>
      <div className="flex justify-center items-center">
        <div
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "mb-4 h-[56px] p-[16px] rounded-[12px] flex gap-4 items-center font-primary font-medium text-[14px] text-[#A4A5A6] cursor-pointer hover:bg-black/10",
            collapsed ? "w-[56px]" : "w-full"
          )}
        >
          <img
            src={collapsed ? chevronRight : chevronLeft}
            alt="toggle"
            className="w-[36px] h-[36px]"
          />
          {!collapsed && "Collapse"}
        </div>
      </div>
    </div>
  );
}
