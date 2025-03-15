import { Link as LinkIcon, ShareIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import slackIcon from "@/assets/icons/slack.svg";
import msOfficeIcon from "@/assets/icons/msOffice.svg";
import zoomIcon from "@/assets/icons/zoomCall.svg";
import trelloIcon from "@/assets/icons/trello.svg";
import addIcon from "@/assets/icons/add-solid.svg";
const AiCompanion = () => {
  const navigate = useNavigate();

  const toolList = [
    {
      name: "Slack",
      icon: slackIcon,
      link: "https://slack.com",
      description:
        "A communication platform for team collaboration with features like channels, direct messaging, and file sharing",
    },
    {
      name: "Ms Office",
      icon: msOfficeIcon,
      link: "https://office.com",
      description:
        "A suite of tools including Word, Excel, PowerPoint, and Teams for documentation, spreadsheets, and communication.",
    },
    {
      name: "Zoom Call",
      icon: zoomIcon,
      link: "https://zoom.us",
      description:
        "A video conferencing platform for meetings, webinars, and virtual team collaboration.",
    },
    {
      name: "Trello",
      icon: trelloIcon,
      link: "https://trello.com",
      description:
        "A project management tool that organizes tasks and workflows using boards, lists, and cards.",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <p className=" text-[16px] lg:text-[20px] font-medium font-primary w-full ">
          Generic Tool
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
      <div className="my-4 space-y-4">
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
       {toolList.map((tool) => (
          <div key={tool.name} className="flex flex-col items-center gap-4 w-full text-center border border-gray-200 rounded-lg p-4 l]">
            <div className="w-full h-full flex flex-col items-center gap-4">
            <img
              src={tool.icon}
              alt={tool.name}
              className="w-[82px] h-[82px]"
            />
            <p className="text-[16px] font-semibold font-primary">{tool.name}</p>
            <p className="text-[12px] font-light font-primary text-[#737373]">{tool.description}</p>
            </div>
            <div className="flex gap-2 w-full justify-center">
              <Link to={tool.link} target="_blank" className="flex items-center gap-1 h-[32px] bg-black text-white  text-[12px] font-semibold  p-[20px] w-[96px] rounded-[8px]">
                <LinkIcon className="w-[16px] h-[16px]"/> Go To
              </Link>
              <div className="flex items-center gap-2 h-[32px]  text-primary text-[12px] font-semibold  border border-primary p-[20px] w-[96px] rounded-[8px]">
                <ShareIcon className="w-[16px] h-[16px]"/> Share
              </div>
            </div>
          </div>
        ))}
       </div>
      </div>
    </>
  );
};

export default AiCompanion;
