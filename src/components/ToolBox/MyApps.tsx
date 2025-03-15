import { Link as LinkIcon, ShareIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import myApp1 from "@/assets/icons/myapp1.svg";
import myApp2 from "@/assets/icons/myapp2.svg";
import myApp3 from "@/assets/icons/myapp3.svg";

import addIcon from "@/assets/icons/add-solid.svg";
const MyApps = () => {
  const navigate = useNavigate();

  const toolList = [
    {
      name: "Silae",
      icon: myApp1,
      link: "https://silae.com",
      description:
        "A payroll and HR management tool designed to automate payroll processes and ensure compliance.",
    },
    {
      name: "BambooHR",
      icon: myApp2,
      link: "https://bamboohr.com",
      description:
        "A human resources software platform for managing employee records, time tracking, and benefits.",
    },
    {
      name: "Workday",
      icon:  myApp3,
      link: "https://workday.com",
      description:
        "An enterprise-level tool for human capital management, payroll, and financials.",
    },
    
  ];

  return (
    <div className="w-full ">
      <div className="flex justify-between items-center">
        <p className=" text-[16px] lg:text-[20px] font-medium font-primary w-full ">
         My Apps
        </p>
        <Button
          onClick={() => navigate("/orders/create")}
          variant="ghost"
          className="group text-[12px]  hover:border-1 hover:border-black hover:text-white font-primary bg-black text-white h-[41px] rounded-[10px] w-fit border border-transparent transition-all duration-300"
        >
          <img
            src={addIcon}
            className="w-[16px] h-[16px] filter invert transition-all duration-300 group-hover:filter-none"
          />
          <span className="ml-2 transition-all duration-300 group-hover:text-black">
            ADD SAAS LINK
          </span>
        </Button>
      </div>
      <div className="mt-4 space-y-4">
        <div className=" grid grid-cols-1  gap-4">
       {toolList.map((tool) => (
          <div key={tool.name} className="flex  flex-col  md:flex-row  items-center md:items-start gap-4 w-full  text-left border border-gray-200 rounded-[15px] p-4  ">
            
            <img
              src={tool.icon}
              alt={tool.name}
              className="w-[139px] h-[95px]"
            />
            <div className="w-full h-full flex flex-col items-center md:items-start gap-2 text-center md:text-left ">
            <p className="text-[16px] font-semibold font-primary">{tool.name}</p>
            <p className="text-[12px] font-light font-primary  text-[#737373]">{tool.description}</p>
            <div className="flex justify-center md:justify-start  gap-2 w-full ">
              <Link to={tool.link} target="_blank" className="flex items-center gap-1 h-[32px] bg-black text-white  text-[12px] font-semibold  p-[20px] w-[96px] rounded-[8px]">
                <LinkIcon className="w-[16px] h-[16px]"/> Go To
              </Link>
              <div className="flex items-center gap-2 h-[32px]  text-primary text-[12px] font-semibold  border border-primary p-[20px] w-[96px] rounded-[8px]">
                <ShareIcon className="w-[16px] h-[16px]"/> Share
              </div>
            </div>
            </div>
          
          </div>
        ))}
       </div>
      </div>
    </div>
  );
};

export default MyApps;
