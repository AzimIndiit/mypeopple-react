import { cn } from "@/lib/utils";
import  { useState } from "react";
import callIcon from "@/assets/icons/call.svg";
import { Button } from "../ui/button";
import PopupMeetingModal from "./MeetingModal";
interface TimeSlot {
  id: number;
  date: string;
  time: string;
}
const MeetingOne = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<any>({
    isOpen: false,
    data: null,
    type: "",
  });
  const timeSlots: TimeSlot[] = [
    {
      id: 1,
      date: "Friday, Dec 5 ",
      time: "From 10:00 AM to 11:00 AM",
    },
    {
      id: 2,
      date: "Friday, Dec 5 ",
      time: "From 10:00 AM to 11:00 AM",
    },
    {
      id: 3,
      date: "Friday, Dec 5 ",
      time: "From 10:00 AM to 11:00 AM",
    },
  ];
  return (
    <div className="w-full flex flex-col-reverse md:flex-row gap-[20px]">
      <div className="w-full">
        <h1 className="text-[18px] font-semibold">Select a time slot</h1>
        <hr className="border-t border-gray-200 my-[20px]" />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {timeSlots.map((timeSlot: TimeSlot) => (
            <div
              key={timeSlot.id}
              onClick={() => setSelectedTimeSlot(timeSlot.id)}
              className={cn(
                "w-full h-[89px] bg-[#F0F0F0] rounded-[10px] p-[20px] hover:bg-primary/[0.1] cursor-pointer ",
                timeSlot.id === selectedTimeSlot && "bg-primary"
              )}
            >
              <div
                className={cn(
                  "flex flex-col",
                  timeSlot.id === selectedTimeSlot && "text-white"
                )}
              >
                <h2 className="text-[16px] font-semibold">{timeSlot.date}</h2>
                <p
                  className={cn(
                    "text-[14px] text-[#596569] font-light",
                    timeSlot.id === selectedTimeSlot && "text-white"
                  )}
                >
                  {timeSlot.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-[18px] font-semibold text-center my-[20px]">
          Or
        </div>
        <div
          onClick={() => {}}
          className={cn(
            "w-full h-[89px] cursor-pointer  rounded-[10px] p-[20px] bg-[rgba(252,64,6,0.08)] text-center border border-primary"
          )}
        >
          <div className={cn("flex flex-col")}>
            <h2 className="text-[16px] font-semibold">
              Call Me{" "}
              <img
                src={callIcon}
                alt="call"
                className="w-[24px] h-[24px] inline-block"
              />
            </h2>
            <p className={cn("text-[14px] text-[#596569] font-light")}>
              Whenever you like!
            </p>
          </div>
        </div>
        <p className="text-[14px]  font-light font-primary my-[20px]">
          This personal invitation is solely for Tran and will expire on Jan 5,
          2025 (+ 1 month)
        </p>
      </div>
      <div className="w-full md:w-[300px] lg:w-[376px]">
        <div
          className={cn(
            "w-full  rounded-[10px] p-[10px]  text-left bg-[rgba(64,64,64,0.08)] "
          )}
        >
          <p className={cn("text-[14px]  font-light")}>
            Hi Tran, Thank you for your interest in Mypeople services. We invite
            you to take advantage of a free advisory with one of our Senior HR
            manager. Let's work together to find the Mypeople services that work
            best for your business and your goals in a virtual one-to-one
            session.
          </p>
        </div>
        <div className="flex flex-col gap-[10px] mt-[20px]">
          <div className="flex flex-col md:flex-row gap-[10px]">
            <Button
              variant="outline"
              type="button"
              className="w-full md:w-[140px] lg:w-[180px] text-primary border-primary hover:bg-primary/[0.1] hover:text-primary "
              onClick={() =>
                setIsOpen({
                  isOpen: true,
                  data: {
                    button:{url:"/contact",text:"Contact Information"},
                    title: "We can't wait to meet you",
                    description:
                      "You've asked us to call you back and so we will within 24 hours. If necessary, please make sure your contact information is up to date.",
                  },
                  type: "callback",
                })
              }
            >
              Call me Back  
            </Button>
            <Button
              type="button"
              className="w-full md:w-[140px] lg:w-[180px] "
              onClick={() =>
                setIsOpen({
                  isOpen: true,
                  data: {
                    title: "We can't wait to meet you",
                    button:{url:"/meetings",text:"Meeting Link"},
                    description1:"If you can't make it at the last minute, please feel free to reschedule.",
                    description:
                      "We confirm your appointment for Friday, December 5, 2024 from 2:00 to 2:30 p.m. We will send you a reminder before the time of your appointment.",
                  },
                  type: "confirm",
                })
              }
            >
              Confirm
            </Button>
          </div>
          <Button
            variant="outline"
            type="button"
            className="w-full text-[#596569] border-[#596569] hover:bg-white"
          >
            Not Ready Yet
          </Button>
        </div>
      </div>

      {isOpen.isOpen && (
        <PopupMeetingModal
          type={isOpen.type}
          isOpen={isOpen.isOpen}
          onOpenChange={() => {
            setIsOpen({ isOpen: false, data: null });
          }}
          data={isOpen.data}
        />
      )}
    </div>
  );
};

export default MeetingOne;
