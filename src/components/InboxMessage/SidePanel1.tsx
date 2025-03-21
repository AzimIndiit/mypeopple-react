import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/helper";
import attachmentIcon from "@/assets/icons/attachment-soild.svg";
import videoFillIcon from "@/assets/icons/video-filled.svg";
import { Button } from "../ui/button";
import checkSolidIcon from "@/assets/icons/check-solid.svg";
import rightArrowIcon from "@/assets/icons/arrow-left.svg";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export const SidePanel1 = ({
  fileInputRef,
  otherUser,
  scheduledMeeting,
  currentUser,
}: {
  fileInputRef: React.RefObject<HTMLInputElement>;
  otherUser: any;
  scheduledMeeting: () => void;
  currentUser: any;
}) => {
  const { user } = useAuth();
  const triggerButtonClick = (messageId: string) => {
    const button = document.getElementById(`btn-${messageId}`);
    if (button) {
      button.click();
    }
  };
  return (
    <div className="border-b py-4 md:py-0 md:border-l border-[#E4E4E4] md:px-4 md:w-[40%] w-full relative">
      <div className=" w-full  space-y-2">
        <div className="bg-gray-100 h-[60px] w-full flex  gap-2 rounded-[10px] p-[10px] items-center">
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="!text-[14px] !font-primary capitalize font-light">
              Created By
            </p>
            <p className="!text-[12px] !font-primary text-[#596569] capitalize  font-light">
              {`${currentUser.name} | ${
                user.id === currentUser.id ? "Me" : currentUser.role
              }`}
            </p>
          </div>
        </div>
        <div className={cn("bg-gray-100 h-[60px] w-full flex  gap-2 rounded-[10px] p-[10px] items-center",user.id === otherUser.id && user.role === "hrbp" && "border border-[#000000]")}>
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
            <AvatarFallback>{getInitials(otherUser.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="!text-[14px] !font-primary capitalize font-light">
              Handler/HRBP
            </p>
            <p className="!text-[12px] !font-primary text-[#596569] capitalize  font-light">
              {user.id === otherUser.id && user.role === "hrbp"
                ? "Me"
                : otherUser.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 my-4">
          <p className="text-[14px] font-primary text-primary">Created On</p>
          <p className="text-[12px] font-primary text-gray-500">
            November 28, 2024 12:00 PM
          </p>
        </div>
        {user.role === "hrbp" && (
          <Button
            type="button"
            className="bg-black hover:bg-black/80 h-[44px] w-full flex  gap-2 rounded-[15px] p-[10px] justify-start items-center font-light text-[12px]"
          >
            <img
              src={rightArrowIcon}
              alt="attachment"
              className="w-[24px] h-[24px]"
            />{" "}
            Submit Contract
          </Button>
        )}
        <Button
          type="button"
          className="bg-[#1DBF73] hover:bg-[#1DBF73]/80 h-[44px] w-full flex  gap-2 rounded-[15px] p-[10px] justify-start items-center font-light text-[12px]"
        >
          <img
            src={checkSolidIcon}
            alt="attachment"
            className="w-[24px] h-[24px]"
          />{" "}
          Mark as Complete
        </Button>
      </div>

      <div className="space-y-2 mt-4 md:absolute bottom-20  w-full left-0 px-4 ">
        <hr className="w-full my-4" />
        <div className="flex flex-col xl:flex-row gap-[10px] w-full justify-center my-4 text-[14px]">
          <Button
            type="button"
            onClick={() => triggerButtonClick("edit")}
            className="w-full xl:w-[130px] bg-[#C7C7C7] hover:bg-[#C7C7C7]/80 text-black h-[41px] font-light"
          >
            Edit Estimate
          </Button>
          <Button
            type="button"
            onClick={() => triggerButtonClick("valid")}
            className="w-full xl:w-[130px] h-[41px] font-light"
          >
            Validate Estimate
          </Button>
        </div>
        <div
          className="w-full h-[44px] cursor-pointer bg-black text-white text-[14px] font-primary font-light flex items-center gap-[5px] rounded-[15px] p-[10px]"
          onClick={() => fileInputRef.current?.click()}
        >
          <img
            src={attachmentIcon}
            alt="attachment"
            className="w-[24px] h-[24px]"
          />
          Attach More
        </div>
        <div
          className="w-full h-[44px] cursor-pointer bg-black text-white text-[14px] font-primary font-light flex items-center gap-[5px] rounded-[15px] p-[10px]"
          onClick={scheduledMeeting}
        >
          <img
            src={videoFillIcon}
            alt="attachment"
            className="w-[24px] h-[24px]"
          />
          Start Video Call
        </div>
      </div>
    </div>
  );
};
