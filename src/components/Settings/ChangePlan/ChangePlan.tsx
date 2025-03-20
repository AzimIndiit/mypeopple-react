import { PageHeader } from "@/components/PageHeader";
import { useEffect, useState } from "react";
import StepIndicator from "./RightSection/RightSection";
import StepAccordion from "./LeftSection/LeftSection";
import Step1Summary from "./RightSection/DefaultSummary";
import PlanPricing from "@/components/PlanPricing";
import { useNavigate } from "react-router-dom";
import Step2Summary from "./RightSection/Step2Summary";
import DefaultSummary from "./RightSection/DefaultSummary";
import Step3Summary from "./RightSection/Step3Summary";
import Step4Summary from "./RightSection/Step4Summary";
import Step5Summary from "./RightSection/Step5Summary";

const ChangePlan = () => {
  const [activeStep, setActiveStep] = useState<string>("");
  const [stepData, setStepData] = useState<any>(null);
  const [isCompare, setIsCompare] = useState<boolean>(false);

  const steps = [
    "Select Plan",
    "Extras",
    "Your Details",
    "Payment Methods",
    "Your HRBP",
  ];
  console.log(stepData, "stepData");
  const navigate = useNavigate();
  const ScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    ScrollToTop();
  }, [activeStep]);
  return (
    <div className="w-ful h-fit">
      <PageHeader
        title={isCompare ? "Compare Plan" : "Subscription"}
        onBack={() => {
          if (isCompare) {
            setIsCompare(false);
          } else {
            navigate(-1);
          }
        }}
      />
      {isCompare ? (
        <PlanPricing
          screen="2"
          className="w-full  flex justify-between items-center"
          onSubmit={(value) => {
            setStepData((prev: any) => ({
              ...prev,
              step1: {
                ...prev.step1,
                plan: value,
              },
            }));
            setIsCompare(false);
          }}
        />
      ) : (
        <div className="flex gap-4  flex-col md:flex-row w-full">
          {/* Left side - Steps */}
          <div className="  w-full">
            <div className="mt-4 space-y-4 shadow-none border-none ">
              {steps.map((step, index) => (
                <StepAccordion
                  setStepData={setStepData}
                  activeStep={activeStep}
                  setIsCompare={setIsCompare}
                  stepData={stepData}
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
          <div className="   w-full md:w-[376px]">
            <StepIndicator activeStep={activeStep} />
            {activeStep === "" && <DefaultSummary />}
            {activeStep === "1" && <Step1Summary />}
            {activeStep === "2" && <Step2Summary />}
            {activeStep === "3" && <Step3Summary />}
            {activeStep === "4" && <Step4Summary />}
            {activeStep === "5" && <Step5Summary />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePlan;
