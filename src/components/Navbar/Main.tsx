import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sunIcon from "@/assets/icons/morning.svg";
import avatar from "@/assets/images/avatar.png";
import bellIcon from "@/assets/icons/notification-filld.svg";
import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
// import moonIcon from "@/assets/icons/moon.svg";
// import cloudIcon from "@/assets/icons/cloud.svg";
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12)
    return (
      <span className="flex items-center gap-2">
        <img src={sunIcon} alt="sun" className="w-[20px] h-[20px]" />
        Good morning
      </span>
    );
  if (hour < 18)
    return (
      <span className="flex items-center gap-2">
        <img src={sunIcon} alt="sun" className="w-[20px] h-[20px]" />
        Good afternoon
      </span>
    );
  return (
    <span className="flex items-center gap-2">
      <img src={sunIcon} alt="sun" className="w-[20px] h-[20px]" />
      Good evening
    </span>
  );
};

export default function AppNavbar({
  isMobile,
  collapsed,
  setCollapsed,
}: {
  isMobile: boolean;
  collapsed:boolean,
  setCollapsed: (value: boolean) => void;
}) {
  const user = {
    name: "tam tran",
    avatar: avatar,
  };
  return (
    <nav className="flex items-center justify-between h-[70px] bg-white ">
      {isMobile && (
        <MenuIcon
         onClick={()=>setCollapsed(!collapsed)}
          className="w-[24px] h-[24px] text-primary"
        />
      )}
      {/* Left Side: Greeting */}
      <div className="text-[14px] font-bold text-primary ">
        {getGreeting()}
        <div className="text-black font-medium text-[30px] capitalize">
          {user.name}
        </div>
      </div>

      {/* Right Side: Profile & Notifications */}
      <div className="flex items-center gap-4">
        <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full">
          <img src={bellIcon} alt="bell" className="w-[24px] h-[24px]" />
        </div>
        <div className="relative flex lg:w-[152px] h-[40px]  justify-between ">
          <div className=" hidden lg:block   text-center">
            <div className="text-[14px] font-regular capitalize">
              {user.name}
            </div>
            <Link
              to="/profile"
              className="text-primary font-regular hover:bg-gray-100 underline"
            >
              View Profile
            </Link>
          </div>

          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((word) => word.charAt(0))
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden hidden group-hover:block">
            <a
              href="/profile"
              className="block px-4 py-2 text-primary font-regular hover:bg-gray-100 underline "
            >
              View Profile
            </a>
            <a
              href="/logout"
              className="block px-4 py-2 text-primary font-regular hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
