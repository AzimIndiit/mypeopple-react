import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/helper";
import attachmentIcon from "@/assets/icons/attachment-soild.svg";
import videoFillIcon from "@/assets/icons/video-filled.svg";

export const SidePanel = ({ fileInputRef, otherUser ,scheduledMeeting}: { fileInputRef: React.RefObject<HTMLInputElement>; otherUser:any ,scheduledMeeting:()=>void}) => {
  return (
    <div className="border-b py-4 md:py-0 md:border-l border-[#E4E4E4] md:px-4 md:w-[40%] w-full relative">
      <div className="w-full space-y-2">
        <div className="bg-gray-100 h-[60px] w-full flex gap-2 rounded-[10px] p-[10px] items-center">
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
            <AvatarFallback>{getInitials(otherUser.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="!text-[14px] !font-primary capitalize font-light">
              Client
            </p>
            <p className="!text-[12px] !font-primary text-[#596569] capitalize font-light">
              {otherUser.name}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 my-4">
          <p className="text-[14px] font-primary text-primary">
            Started On
          </p>
          <p className="text-[12px] font-primary text-gray-500">
            November 28, 2024 12:00 PM
          </p>
        </div>
      </div>

      <div className="space-y-2 mt-4 md:absolute bottom-20 w-full left-0 px-4">
        <hr className="w-full my-4" />
        <div
          className="w-full h-[44px] cursor-pointer bg-black text-white text-[14px] font-primary font-light flex items-center gap-[5px] rounded-[15px] p-[10px]"
          onClick={() => fileInputRef?.current?.click()}
        >
          <img
            src={attachmentIcon}
            alt="attachment"
            className="w-[24px] h-[24px]"
          />
          Add Attachments
        </div>
        <div
          className="w-full h-[44px] cursor-pointer bg-black text-white text-[14px] font-primary font-light flex items-center gap-[5px] rounded-[15px] p-[10px]"
          onClick={scheduledMeeting}
        >
          <img
            src={videoFillIcon}
            alt="video"
            className="w-[24px] h-[24px]"
          />
          Start Schedule Meeting
        </div>
      </div>
    </div>
  );
};