import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

const renderStepContent = (value: string, currentStepData: any) => {
  switch (Number(value)) {
    case 1:
      return (
        <span className="text-[16px] font-primary text-black font-semibold w-full ml-2">
          <span className="text-primary">|</span> {currentStepData?.plan?.title}{" "}
          {currentStepData?.plan?.isMonthly ? "Monthly" : "Yearly"}
        </span>
      );
    case 2:
      return (
        <span className="text-[16px] font-primary text-black font-semibold w-full ml-2">
          <span className="text-primary">|</span> No Extras were Selected
        </span>
      );
    case 3:
      return (
        <span className="text-[16px] font-primary text-black font-semibold w-full ml-2">
          <span className="text-primary">|</span>{" "}
          {`${currentStepData?.userInfos?.firstName} ${currentStepData?.userInfos?.lastName}`}{" "}
          , from {currentStepData?.companyInfos.name}
        </span>
      );
    default:
      return null;
  }
};

const StepAccordion = ({
  value,
  activeStep,
  title,
  isActive,
  onValueChange,
  setStepData,
  stepData,
  setIsCompare,
}: {
  activeStep: string;
  value: string;
  title: string;
  isActive: boolean;
  onValueChange: (value: string) => void;
  setStepData: (data: any) => void;
  stepData: any;
  setIsCompare: (value: boolean) => void;
}) => {
  // Correctly fetch data for the current step
  const currentStepData = stepData?.[`step${value}`] || {};
  const isExist = Object.keys(currentStepData).length > 0;

  return (
    <div
      onClick={() => onValueChange(value)}
      style={{
        display:
          activeStep !== "" && Number(value) > Number(activeStep)
            ? "none"
            : "block",
      }}
    >
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3 bg-[#40404014] transition-all rounded-[10px] h-[64px] text-[#596569] font-light",
          isActive && "bg-black text-primary font-semibold"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="font-primary text-[16px] w-full ">
            {title}

            {isExist && renderStepContent(value, currentStepData)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {isExist && (
            <div
              className="text-[16px] font-primary text-primary underline cursor-pointer  "
              onClick={() => onValueChange(value)}
            >
              Edit
            </div>
          )}
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {/* Render Step1 only if active */}
      {isActive && value === "1" && (
        <Step1
          currentStep={value}
          setCurrentStep={onValueChange}
          setStepData={setStepData}
          stepData={currentStepData}
          setIsCompare={setIsCompare}
        />
      )}
      {isActive && value === "2" && (
        <Step2
          currentStep={value}
          setCurrentStep={onValueChange}
          setStepData={setStepData}
          stepData={currentStepData}
        />
      )}
      {isActive && value === "3" && (
        <Step3
          currentStep={value}
          setCurrentStep={onValueChange}
          setStepData={setStepData}
          stepData={currentStepData}
        />
      )}
      {isActive && value === "4" && (
        <Step4
          currentStep={value}
          setCurrentStep={onValueChange}
          setStepData={setStepData}
          stepData={currentStepData}
        />
      )}

      {isActive && value === "5" && (
        <Step5
          currentStep={value}
          setCurrentStep={onValueChange}
          setStepData={setStepData}
          stepData={currentStepData}
        />
      )}
    </div>
  );
};

export default StepAccordion;
