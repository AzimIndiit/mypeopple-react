import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import SelectPlanPage from "./SelectPlan1";

const ChangePlan = () => {
  const [activeStep, setActiveStep] = useState<string>("");
  const steps = [
    "Select Plan",
    "Extras",
    "Your Details",
    "Payment Methods",
    "Your HRBP",
  ];
  return (
    <div className="w-full">
      <PageHeader title="Subscription" />
      <div className="flex gap-4  flex-col md:flex-row w-full">
        {/* Left side - Steps */}
        <div className="    w-full">
          <div className="mt-4 space-y-4 shadow-none border-none ">
            {steps.map((step, index) => (
              <StepAccordion
                activeStep={activeStep}
                key={step}
                value={`${index + 1}`}
                title={`${index + 1}. ${step}`}
                isActive={Number(activeStep) === index + 1}
                onValueChange={(value) => setActiveStep(value)}
              />
            ))}
          </div>
        </div>

        {/* Right side - Summary */}
        <div className=" w-full md:w-[376px]">
          <StepIndicator activeStep={activeStep} />
          <OrderSummary />
          <HelpSection />
        </div>
      </div>
    </div>
  );
};

// Step Indicator Component
const StepIndicator = ({ activeStep }: { activeStep: string }) => {
  const steps = [1, "", 2, "", 3, "", 4, "", 5];

  const activeIndex = parseInt(activeStep);
  return (
    <div className="flex items-center justify-between w-full  my-4 ">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center w-full ">
          {step !== "" ? (
            <div
              className={`!w-[38px] !h-[38px] rounded-full flex items-center justify-center font-primary text-[16px] ${
                Number(step) <= activeIndex
                  ? "bg-black text-primary"
                  : "bg-[#00000030] text-white"
              }`}
            >
              {step}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center">
              <div className={`h-[4px] w-[20px] bg-[#FC400633]`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Step Accordion Component
const StepAccordion = ({
  value,
  activeStep,
  title,
  isActive,
  onValueChange,
}: {
  activeStep: string;
  value: string;
  title: string;
  isActive: boolean;
  onValueChange: (value: string) => void;
}) => {
  return (
    <div onClick={() => onValueChange(value)} className="" style={{display: activeStep!=="" ? isActive ? "block" : "none" : "block" }}>
      <div
        className={cn(
          " flex items-center justify-between px-4 py-3 bg-[#40404014]  transition-all rounded-[10px]  h-[64px] text-[#596569] font-light",
          isActive && "bg-black text-primary font-semibold"
        )}
      >
        <p className="font-primary text-[16px] ">{title}</p>
        <ChevronDown className="w-4 h-4" />
      </div>
      {/* Content for each step would go here */}
      <div className=" " style={{ display: isActive ? "block" : "none" }}>
        {value === "1" && (
          <SelectPlanPage
            currentStep={value}
            setCurrentStep={(value) => onValueChange(value)}
          />
        )}
        {value === "2" && <ExtrasContent />}
        {value === "3" && <YourDetailsContent />}
        {value === "4" && <PaymentMethodsContent />}
        {value === "5" && <YourHrbpContent />}
      </div>
    </div>
  );
};

// Placeholder components for each step's content

const ExtrasContent = () => <div>Additional options would go here</div>;
const YourDetailsContent = () => (
  <div>Personal information form would go here</div>
);
const PaymentMethodsContent = () => (
  <div>Payment method options would go here</div>
);
const YourHrbpContent = () => <div>HRBP selection would go here</div>;

// Order Summary Component
const OrderSummary = () => {
  return (
    <Card className="px-4 py-[10px] mb-4 bg-[#40404014] shadow-none rounded-[10px] gap-2">
      <h3 className="font-semibold font-primary text-[16px]">Order Summary</h3>
      <p className=" text-[#596569] mb-4 font-primary font-light text-[16px]">
        Your choices appear here in a handy overview. Choose your plan to start
        registration.
      </p>
    </Card>
  );
};

// Help Section Component
const HelpSection = () => {
  return (
    <Card className="px-4 py-[10px] bg-[#40404014] shadow-none rounded-[10px] gap-2">
      <h3 className="font-semibold  font-primary text-[16px]">
        We are here to help
      </h3>
      <p className=" text-[#596569] mb-4 font-primary font-light text-[16px]">
        Are you hesitating between different plans or do you find yourself in a
        particular situation requiring a customized offer? Request a free,
        no-obligation meeting with one of our HR experts.
      </p>
      <Button className="w-full ">Book a Meeting</Button>
    </Card>
  );
};

export default ChangePlan;
