import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useViewport } from "@/hooks/use-mobile";

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
    url: "/tool-box",
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
    url: "/currency",
    icon: currencyIcon,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: settingIcon,
  },
  {
    title: "Logout",
    url: "/auth/client",
    icon: logoutIcon,
  },
];
export function AppSidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  className?: string;
}) {
  const viewPort = useViewport();
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  const isMobile = viewPort === "mobile" || viewPort === "tablet";

  if (isMobile) {
    return (
      <div
        className={cn(
          "   fixed  h-screen top-0 z-101 ",
          collapsed
            ? "transition-all duration-300 hidden"
            : "w-full bg-[rgba(0,0,0,0.5)] overscroll-contain "
        )}
      >
        <div className="flex w-full h-full">
          <div
            className={cn(
              "text-white bg-white h-full p-4 transition-all duration-300 border-r border-gray-200 overflow-y-auto  ", // Add bg color
              "w-[256px]"
            )}
          >
            <div className="flex justify-center items-center my-[26px] lg:my-[40px] ">
              {!collapsed ? (
                <img src={logo} alt="logo" className="h-[32px] w-[176px] " />
              ) : (
                <img src={logo1} alt="logo" className="h-[56px] w-[56px]" />
              )}
            </div>
            <div className="flex justify-center items-center">
              <div
                onClick={() => {
                  navigate("/orders/create");
                }}
                className={cn(
                  "mb-[26px]  h-[56px] p-[16px] rounded-[12px] transition-opacity duration-300 flex gap-4 items-center font-primary font-semibold text-[16px] border border-black text-black cursor-pointer hover:bg-black/10",
                  collapsed ? "w-[56px]" : "w-full"
                )}
              >
                <img
                  src={addSolidIcon}
                  alt="toggle"
                  className="w-[36px] h-[36px]"
                />
                {!collapsed && <span className=""> Create Order</span>}
              </div>
            </div>
            <ul
              className={cn(
                "flex flex-col",
                collapsed ? "justify-center items-center" : "w-full"
              )}
            >
              {menuItems1.map(({ title, url, icon: Icon }) => (
                <Link
                  key={title}
                  to={url}
                  onClick={() => {
                    if (isMobile) {
                      setCollapsed(true);
                    }
                  }}
                >
                  <li
                    // key={title}
                    className={cn(
                      "flex items-center gap-4 h-[56px] p-[16px] rounded-[12px] cursor-pointer transition-colors",
                      collapsed ? "w-[56px]" : "w-full",
                      location.pathname === url
                        ? "bg-black "
                        : "hover:bg-black/10"
                    )}
                  >
                    <img src={Icon} alt={title} className="w-[36px] h-[36px]" />

                    {/* Wrap the text in a transition container */}
                    <div className="overflow-hidden transition-all duration-300">
                      <span
                        className={cn(
                          "opacity-0 transition-opacity duration-300 font-primary font-medium text-[14px] text-[#A4A5A6]",
                          !collapsed && "opacity-100",
                          location.pathname === url && "text-white"
                        )}
                      >
                        {title}
                      </span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
            <hr className="my-[26px] " />
            <ul
              className={cn(
                "flex flex-col",
                collapsed ? "justify-center items-center" : "w-full"
              )}
            >
              {menuItems2.map(({ title, url, icon: Icon }) => (
                <Link
                  key={title}
                  to={url}
                  onClick={() => {
                    if (title === "Logout") {
                      localStorage.clear(); // Clear localStorage
                    }
                  }}
                >
                  <li
                    className={cn(
                      "flex items-center gap-4 h-[56px] p-[16px] rounded-[12px] cursor-pointer transition-colors",
                      collapsed ? "w-[56px]" : "w-full",
                      location.pathname === url
                        ? "bg-black "
                        : "hover:bg-black/10"
                    )}
                  >
                    <img src={Icon} alt={title} className="w-[36px] h-[36px]" />

                    {/* Wrap the text in a transition container */}
                    <div className="overflow-hidden transition-all duration-300">
                      <span
                        className={cn(
                          "opacity-0 transition-opacity duration-300 font-primary font-medium text-[14px] text-[#A4A5A6]",
                          !collapsed && "opacity-100",
                          location.pathname === url && "text-white"
                        )}
                      >
                        {title}
                      </span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
            <div className="flex justify-center items-center">
              <div
                onClick={() => setCollapsed(!collapsed)}
                className={cn(
                  " h-[56px] p-[16px] rounded-[12px] flex gap-4 transition-opacity duration-300 items-center font-primary font-medium text-[14px] text-[#A4A5A6] cursor-pointer hover:bg-black/10",
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
          <div
            className="w-[10%]"
            onClick={() => setCollapsed(!collapsed)}
            onTouchEnd={() => setCollapsed(!collapsed)}
          >
            {" "}
          </div>
        </div>
      </div>
    );
  }
  return (
    <aside
      className={cn(
        " bg-white transition-all duration-300  overflow-y-auto min-h-screen border-r border-gray-200 ",
        collapsed ? "w-[8%]" : "lg:w-[18%] xl:w-[16%]  "
      )}
      style={{
        position: "fixed",
        background: "white",
        zIndex: 999,
        top: 0,
        left: 0,
      }}
    >
      <div
        className={cn(
          "text-white p-4  " // Add bg color
        )}
      >
        <div className="flex justify-center items-center my-[26px] lg:my-[40px] ">
          {!collapsed ? (
            <img src={logo} alt="logo" className="h-[32px] w-[176px] " />
          ) : (
            <img src={logo1} alt="logo" className="h-[56px] w-[56px]" />
          )}
        </div>
        <div className="flex justify-center items-center">
          <div
            onClick={() => {
              navigate("/orders/create");
            }}
            className={cn(
              "mb-[26px]  h-[56px] p-[16px] rounded-[12px] transition-opacity duration-300 flex gap-4 items-center font-primary font-semibold text-[14px] xl:text-[16px] border border-black text-black cursor-pointer hover:bg-black/10",
              collapsed ? "w-[56px]" : "w-full"
            )}
          >
            <img
              src={addSolidIcon}
              alt="toggle"
              className=" w-[24px] h-[24px] xl:w-[36px] xl:h-[36px]"
            />
            {!collapsed && <span className=""> Create Order</span>}
          </div>
        </div>
        <ul
          className={cn(
            "flex flex-col",
            collapsed ? "justify-center items-center" : "w-full"
          )}
        >
          {menuItems1.map(({ title, url, icon: Icon }) => (
            <Link key={title} to={url}>
              <li
                // key={title}
                className={cn(
                  "flex items-center gap-4 h-[56px] p-[16px] rounded-[12px] cursor-pointer transition-colors",
                  collapsed ? "w-[56px]" : "w-full",
                  location.pathname === url ? "bg-black " : "hover:bg-black/10"
                )}
              >
                <img
                  src={Icon}
                  alt={title}
                  className="w-[24px] h-[24px] xl:w-[36px] xl:h-[36px]"
                />

                {/* Wrap the text in a transition container */}
                <div className="overflow-hidden transition-all duration-300">
                  <span
                    className={cn(
                      "opacity-0 transition-opacity duration-300 font-primary font-medium text-[14px] xl:text-[16px] text-[#A4A5A6]",
                      !collapsed && "opacity-100",
                      location.pathname === url && "text-white"
                    )}
                  >
                    {title}
                  </span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
        <hr className="my-[26px] " />
        <ul
          className={cn(
            "flex flex-col",
            collapsed ? "justify-center items-center" : "w-full"
          )}
        >
          {menuItems2.map(({ title, url, icon: Icon }) => (
            <Link key={title} to={url}     onClick={() => {
              if (title === "Logout") {
                localStorage.clear(); // Clear localStorage
              }
            }}>
              <li
                // key={title}
                className={cn(
                  "flex items-center gap-4 h-[56px] p-[16px] rounded-[12px] cursor-pointer transition-colors",
                  collapsed ? "w-[56px]" : "w-full",
                  location.pathname === url ? "bg-black " : "hover:bg-black/10"
                )}
              >
                <img
                  src={Icon}
                  alt={title}
                  className="w-[24px] h-[24px] xl:w-[36px] xl:h-[36px]"
                />

                {/* Wrap the text in a transition container */}
                <div className="overflow-hidden transition-all duration-300">
                  <span
                    className={cn(
                      "opacity-0 transition-opacity duration-300 font-primary font-medium text-[14px] xl:text-[16px]  text-[#A4A5A6]",
                      !collapsed && "opacity-100",
                      location.pathname === url && "text-white"
                    )}
                  >
                    {title}
                  </span>
                </div>
              </li>
            </Link>
          ))}
        </ul>
        <div className="flex justify-center items-center">
          <div
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              " h-[56px] p-[16px] rounded-[12px] flex gap-4 transition-opacity duration-300 items-center font-primary font-medium text-[14px] xl:text- text-[#A4A5A6] cursor-pointer hover:bg-black/10",
              collapsed ? "w-[56px]" : "w-full"
            )}
          >
            <img
              src={collapsed ? chevronRight : chevronLeft}
              alt="toggle"
              className="w-[24px] h-[24px] xl:w-[36px] xl:h-[36px]"
            />
            {!collapsed && "Collapse"}
          </div>
        </div>
      </div>
    </aside>
  );
}
