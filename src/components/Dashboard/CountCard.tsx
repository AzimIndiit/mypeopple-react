import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import infoWhiteIcon from "@/assets/icons/info-white.svg"

const CountCard = ({
  bg,
  count,
  title,
  icon,
  showInfo = false,
  info
}: {
  bg: string;
  count: string;
  title: string;
  icon: string;
  showInfo?: boolean;
  info?:string
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full  h-[100px] overflow-hidden md:h-[127px]  rounded-[20px] pl-4   xl:pl-[22px]",
        bg
      )}
    >
      <div className="flex flex-col  font-primary py-2 w-full">
        <div className=" text-[26px] xl:text-[38px] font-bold text-white  flex gap-2 items-center">
          {count}{" "}
         
          {showInfo && (
            <TooltipProvider >
              <Tooltip >
                <TooltipTrigger className="flex items-center">
                 <img src={infoWhiteIcon} className="w-[20px] h-[20px] "/>
                </TooltipTrigger>
                <TooltipContent
                color="black"
                  side="top"
                  className="relative bg-black text-white p-[10px] rounded-[16px] shadow-xl  max-w-[200px]"
                >
                 {info}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="text-[16px] xl:text-[18px] font-light text-white">
          {title}
        </div>
      </div>

      <div className="flex items-center gap-2  w-[100px] h-[100px] md:w-[136px] md:h-[136px]">
        <div className="relative h-32 w-32 overflow-hidden">
          <img
            src={icon}
            alt={title}
            className="absolute bottom-[-10px] h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CountCard;
