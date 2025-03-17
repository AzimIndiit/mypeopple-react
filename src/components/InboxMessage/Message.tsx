import { memo } from "react";
import { ThumbsDown, ThumbsUp, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import docIcon from "@/assets/icons/doc-file.svg";
import meetingStartIcon from "@/assets/icons/meeting-start.svg";
import meetingEndIcon from "@/assets/icons/meeting-end.svg";
import languageIcon from "@/assets/icons/language-translate.svg";
import { formatCurrency } from "@/utils/helper";
import { cn } from "@/lib/utils";

const Attachments = ({ attachments }: { attachments: any }) => {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {attachments.map((attachment: any, index: any) => (
        <div
          key={index}
          className="flex items-center gap-[10px] justify-between bg-gray-100 rounded-[7px] p-[15px] h-[54px]"
        >
          <span className="text-sm flex items-center gap-[10px] font-primary capitalize">
            <img src={docIcon} alt="doc" className="w-[24px] h-[24px]" />
            {attachment.name}
          </span>
        </div>
      ))}
    </div>
  );
};

const MeetingMessage = ({ message }: { message: any }) => (
  <div
    className={cn(
      "text-[12px]  text-gray-500 flex gap-4 md:gap-0 font-primary rounded-[10px] p-[10px]",
      "bg-gray-100"
    )}
  >
    <div className="w-20 ">
      <img
        src={
          message.meetingStatus === "upcoming"
            ? meetingStartIcon
            : meetingEndIcon
        }
        alt="meeting"
        className="w-[48px] h-[48px]"
      />
    </div>
    <div className="space-y-4 w-80 md:w-full">
      <div>
        <p className="text-[18px] font-semibold text-black">
          {message.meetingStatus === "upcoming"
            ? "Let's meet up now"
            : "Video call ended, Duration: 14 mins"}
        </p>
        <p>{message.message}</p>
      </div>
      {message.meetingStatus === "upcoming" ? (
        <div className="flex gap-2 md:flex-row flex-col !font-light justify-end">
          <Button
            type="button"
            className="w-[140px] h-[41px] bg-[#C7C7C7] hover:bg-[#C7C7C7]/80 text-black"
          >
            cancel
          </Button>
          <Button type="button" className="w-[140px] h-[41px]">
            Join
          </Button>
        </div>
      ) : (
        <div className="flex gap-2 !font-light justify-end">
          <Button type="button" className="w-[140px] h-[41px]">
            Watch Recording
          </Button>
        </div>
      )}
    </div>
  </div>
);

const EstimateMessage = ({
  message,
  onEstimateAction,
}: {
  message: any;
  onEstimateAction: any;
}) => (
  <div className="">
    {message.message && <p className="font-semibold">{message.message}</p>}
    {message?.estimateContent && (
      <>
        <div className="rounded-[15px] bg-[#F8F8F8] border border-[#E3E5E8] mt-[20px]">
          <div className="flex gap-[10px] w-full bg-black text-white rounded-t-[15px]">
            <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center">
              Internal Regulation
            </p>
            <p className="text-[14px] font-primary w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center">
              Included in the package
            </p>
          </div>

          <EstimateRow
            label="Additional: Translation"
            value={formatCurrency(
              message?.estimateContent?.additionalTranslation ?? 0
            )}
          />
          <EstimateRow
            label="HRBP Discount"
            value={`${message?.estimateContent?.hrbpDiscount} %`}
          />

          <hr className="w-full" />

          <EstimateRow
            label="TOTAL BEFORE DISCOUNT"
            value={formatCurrency(
              message?.estimateContent?.additionalTranslation
            )}
          />
          <EstimateRow
            label="TOTAL AFTER DISCOUNT"
            value={formatCurrency(
              message?.estimateContent?.additionalTranslation -
                (message?.estimateContent?.additionalTranslation *
                  message?.estimateContent?.hrbpDiscount) /
                  100
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-[10px] w-full justify-center my-4 text-[14px]">
          <Button
            type="button"
            onClick={() => onEstimateAction("edit", message.estimateContent)}
            className="w-full md:w-[140px] bg-[#C7C7C7] hover:bg-[#C7C7C7]/80 text-black h-[41px] font-light"
          >
            Edit Estimate
          </Button>
          <Button
            type="button"
            onClick={() =>
              onEstimateAction("validated", message.estimateContent)
            }
            className="w-full md:w-[140px] h-[41px] font-light"
          >
            Validate Estimate
          </Button>
        </div>
      </>
    )}
  </div>
);

const EstimateRow = ({ label, value }: { label: any; value: any }) => (
  <div className="flex gap-[10px] w-full">
    <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]">
      {label}
    </p>
    <p className="text-[16px] text-[#454B54] font-primary font-bold w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center">
      {value}
    </p>
  </div>
);

const TextMessage = ({
  message,
  currentUserId,
}: {
  message: any;
  currentUserId: any;
}) => {
  const renderIcon = (Icon: any, onClick: any) => (
    <div className="cursor-pointer p-2" onClick={onClick}>
      <Icon className="w-[22px] h-[22px] filter invert-[50%]" />
    </div>
  );

  return (
    <>
      <div className="flex items-center gap-2">
        <p className="text-[14px] font-primary text-primary">
          {currentUserId === message.sender.id ? (
            "Me"
          ) : (
            <span>
              {message.sender.name} |{" "}
              <span className="font-semibold">{message.sender.role}</span>{" "}
            </span>
          )}
        </p>
        <p className="text-[12px] font-primary text-gray-500">{message.date}</p>
      </div>
      <p
        className={cn(
          "text-[14px] font-primary rounded-[10px] p-[10px]",
          currentUserId === message.sender.id
            ? "bg-[rgba(252,64,6,0.08)]"
            : "bg-gray-100"
        )}
      >
        {message.message}

        {message.tags && message.tags.length > 0 && (
          <div className="flex gap-[10px] flex-wrap mt-2">
            {message.tags.map((tag: any, index: any) => (
              <span
                key={tag}
                className={cn(" flex justify-center items-center text-[14px] md:text-[16px] font-primary text-[#596569] font-light border border-primary rounded-full p-[15px] py-1 h-[46px] bg-[rgba(252,64,6,0.08)]",index === 0 ? "text-primary" : "")}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </p>
      {currentUserId !== message.sender.id && (
        <div className="flex flex-col md:flex-row justify-between gap-2 md:items-center">
          <div className="flex gap-1">
            {renderIcon(ThumbsUp, () => {})}
            {renderIcon(ThumbsDown, () => {})}
            <div className="cursor-pointer p-2" onClick={() => {}}>
              <img
                src={languageIcon}
                alt="language"
                className="w-[22px] h-[22px] filter invert-[50%]"
              />
            </div>
            {renderIcon(Copy, () => {})}
          </div>
        </div>
      )}
    </>
  );
};

export const Message = memo(
  ({
    message,
    messageRef,
    onEstimateAction,
    currentUserId,
  }: {
    message: any;
    messageRef: any;
    onEstimateAction: any;
    currentUserId: any;
  }) => {
    return (
      <div key={message.id} className="space-y-2" ref={messageRef}>
        {message.type === "meeting" ? (
          <MeetingMessage message={message} />
        ) : message.type === "estimate" ? (
          <EstimateMessage
            message={message}
            onEstimateAction={onEstimateAction}
          />
        ) : (
          <TextMessage message={message} currentUserId={currentUserId} />
        )}
        <Attachments attachments={message.attachment} />
      </div>
    );
  }
);
