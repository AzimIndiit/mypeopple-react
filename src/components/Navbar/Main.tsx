import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sunIcon from "@/assets/icons/morning.svg";
import avatar from "@/assets/images/avatar.png";
import bellIcon from "@/assets/icons/notification-filld.svg";
import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";
import { getGreeting, getInitials } from "@/utils/helper";
import { cn } from "@/lib/utils";
// import moonIcon from "@/assets/icons/moon.svg";
// import cloudIcon from "@/assets/icons/cloud.svg";

export default function AppNavbar({
  isMobile,
  collapsed,
  setCollapsed,
  className,
}: {
  isMobile: boolean;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  className?: string;
}) {
  const user = {
    name: "tam tran",
    avatar: avatar,
  };

  return (
    <nav
      className={cn(
        "w-full flex flex-col items-center justify-between h-[10vh] md:h-[12vh] px-[2%] lg:px-[4%] ",
        className
      )}
      style={{
        position:"fixed",
        backgroundColor:"white",
        zIndex:50,
        top:0,

      }}
    >
      {/* Left Side: Greeting */}
        <div className="flex justify-between items-center w-full bg-white border-b border-gray-200 h-full md:pt-4  ">
          <div className="flex items-center justify-between w-full gap-2">
            {isMobile && (
              <MenuIcon
                onClick={() => setCollapsed(!collapsed)}
                className="w-[24px] h-[24px] text-primary mr-4"
              />
            )}
            <div className="text-[14px] font-bold text-primary w-full ">
              <span className="flex items-center gap-2">
                <img src={sunIcon} alt="sun" className="w-[20px] h-[20px]" />
                {getGreeting()}
              </span>
              <div className="text-black font-medium text-[18px] md:text-[24px] xl:text-[30px] capitalize">
                {user.name}
              </div>
            </div>
          </div>

          {/* Right Side: Profile & Notifications */}
          <div className="flex items-center gap-4">
            <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full">
              <img src={bellIcon} alt="bell" className="w-[24px] h-[24px]" />
            </div>
            <div className="relative flex lg:w-[152px] h-[40px] justify-between">
              <div className="hidden lg:block text-right">
                <div className="text-[14px] font-light capitalize">
                  {user.name}
                </div>
                <Link
                  to="/profile"
                  className="text-primary font-light hover:bg-gray-100 underline"
                >
                  View Profile
                </Link>
              </div>

              <Avatar className="w-[40px] h-[40px]">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        {isMobile &&   <div className=" my-4 bg-white hidden lg:block" />}
    </nav>
  );
}
