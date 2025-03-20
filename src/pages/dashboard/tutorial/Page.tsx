import tutorialImg from "@/assets/images/tutorial.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sections = [
  { id: 1, name: "My Plan" },
  { id: 2, name: "How to place an order" },
  { id: 3, name: "Messaging" },
  { id: 4, name: "Billings & Invoices" },
  { id: 5, name: "Referral Program" },
];

const TutorialPage = () => {
  const [currentStep, setCurrentStep] = useState(sections[0].id);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <p className="md:text-[20px] text-[16px] font-light font-primary">
            Tutorial
          </p>
        </div>
      </div>
      <div className="my-4 flex flex-col md:flex-row gap-4 w-full">
        {/* Sidebar for sections */}
        <div className="flex md:flex-col w-full md:w-[300px] xl:w-[355px] gap-2 overflow-x-auto md:overflow-visible scrollbar-hide">
          {sections.map((item) => (
            <div
              key={item.id}
              onClick={() => setCurrentStep(item.id)}
              className={cn(
                "min-w-[300px] xl:min-w-[355px]  h-[64px] font-primary rounded-[10px] px-[20px] flex justify-center items-center border border-[#E2E2E2] text-[#596569] text-[14px] md:text-[16px] shrink-0",
                currentStep === item.id &&
                  "bg-primary text-white border-primary"
              )}
            >
              <p className="w-full">{item.name}</p>
            </div>
          ))}
        </div>

        {/* Image section */}
        <div className="w-full">
          <img src={tutorialImg} alt="tutorial" className="h-full w-full" />
        </div>
      </div>
      <div className="flex justify-end my-4">
        <Button className="w-[216px]">Check FAQ's</Button>
      </div>
    </div>
  );
};

export default TutorialPage;
