import logo from "@/assets/icons/logo.svg";
import logo1 from "@/assets/icons/logo1.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/helper";
import { Link } from "react-router-dom";
import avatar from "@/assets/images/avatar.png";
import { useState } from "react";
import MeetingOne from "@/components/Meetings/MeetingOne";
import MeetingTwo from "@/components/Meetings/MeetingTwo";
const MeetingPage = () => {
  const [meetingLayout, setMeetingLayout] = useState<string>("layout1");
  const user = {
    name: "Tam Tran",
    avatar: avatar,
  };

  const meetingLayouts = {
    layout1: <MeetingOne />,
    layout2: <MeetingTwo />,
  };

  return (
    <div className="min-h-screen bg-white text-black w-full">
      {/* Logo */}
      <div className="w-full h-[100px] flex items-center justify-between mb-[16px] bg-black px-[20px] md:px-[50px] lg:px-[90px]">
        <div className=" hidden  md:flex justify-start items-center shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-[30px] w-full sm:w-[181px] block"
          />
        </div>
        <div className=" flex justify-start items-center shrink-0  md:hidden">
        <img
            src={logo1}
            alt="Logo"
            className="h-[30px] w-full sm:w-[181px] block"
          />
        </div>
        <div className="relative flex w-full md:w-[152px] h-[40px] gap-2 justify-end md:justify-between ">
          <div className="    text-right">
            <div className="text-[14px] font-light capitalize text-white">
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
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden hidden group-hover:block">
            <a
              href="/profile"
              className="block px-4 py-2 text-primary font-light hover:bg-gray-100 underline "
            >
              View Profile
            </a>
            <a
              href="/logout"
              className="block px-4 py-2 text-primary font-light hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
      <div className="px-[20px] md:px-[50px] lg:px-[90px] py-[20px]">
        {meetingLayouts[meetingLayout as keyof typeof meetingLayouts]}
      </div>
    </div>
  );
};

export default MeetingPage;
