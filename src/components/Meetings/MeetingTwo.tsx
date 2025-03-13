import { cn } from "@/lib/utils";
import React, { useState } from "react";
import callIcon from "@/assets/icons/call.svg";
import { Button } from "../ui/button";
interface TimeSlot {
  id: number;
  date: string;
  time: string;
}
const MeetingTwo = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number>(1);
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
    <div className="w-full lg:px-[90px] ">
      <div className="w-full text-center my-4">
        <p className={cn("text-[14px]  font-light")}>Helllo Tran !</p>
        <p className={cn("text-[14px]  font-light")}>Let's arrange a meeting with us</p>
      </div>
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
        <div className="flex justify-center mt-[20px]">
        <Button type="button" className="w-full md:w-[140px] lg:w-[180px] ">
              Confirm
            </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingTwo;
