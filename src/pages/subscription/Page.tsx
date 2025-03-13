import { useState } from "react";
import logo from "@/assets/icons/logo.svg";
import logo1 from "@/assets/icons/logo1.svg";
import backArrow from "@/assets/icons/backArrow.svg";
import SelectPlanPage from "./SelectPlan";
import BillingDetailsPage from "./BillingDetailsPage";
import PayementMethodPage from "./PaymentMethod";

function SubscriptionPage() {
  const [currentStep, setCurrentStep] = useState("payement-method");

  // Define steps array
  const steps = [
    { id: "select-plan", name: "Select Plan" },
    { id: "billing-details", name: "Billing Details" },
    { id: "payement-method", name: "Payment Method" },
  
  ];

  // Define page components
  const pageComponents: Record<string, React.FC<{ currentStep: string; setCurrentStep: (step: string) => void }>> = {
    "select-plan": SelectPlanPage,
    "billing-details": BillingDetailsPage,
    "payement-method": PayementMethodPage,
    
  };

  // Render current step component
  const renderSteps = () => {
    const Component = pageComponents[currentStep];
    return Component ? <Component currentStep={currentStep} setCurrentStep={setCurrentStep} /> : null;
  };

  return (
    <div className="min-h-screen bg-white text-black w-full">
      {/* Logo */}
    
      <div className="w-full h-[100px] flex items-center justify-between mb-[16px] bg-black px-[20px] md:px-[50px] lg:px-[90px]">
        <div className=" hidden  md:flex justify-start items-center shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-[30px] w-full sm:w-[181px] block"
          />
        </div>
        <div className=" flex justify-start items-center shrink-0  md:hidden">
        <img
            src={logo1}
            alt="Logo"
            className="h-[30px] w-full sm:w-[181px] block"
          />
        </div>
        {/* <div className="relative flex w-full md:w-[152px] h-[40px] gap-2 justify-end md:justify-between ">
          <div className="    text-right">
            <div className="text-[14px] font-light capitalize text-white">
              {user.name}
            </div>
            <Link
              to="/profile"
              className="text-primary font-light hover:bg-gray-100 underline"
            >
              View Profile
            </Link>
          </div>

          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden hidden group-hover:block">
            <a
              href="/profile"
              className="block px-4 py-2 text-primary font-light hover:bg-gray-100 underline "
            >
              View Profile
            </a>
            <a
              href="/logout"
              className="block px-4 py-2 text-primary font-light hover:bg-gray-100"
            >
              Logout
            </a>
          </div>
        </div> */}
      </div>

      {/* Progress Steps */}
      <div className="max-w-[1133px] mx-auto  px-[10px] lg:px-0 ">
        <div className="flex gap-[10px] lg:justify-between items-center ">
          {/* Back Button */}
          <div
            className="cursor-pointer w-[30px]"
            onClick={() => {
              const currentIndex = steps.findIndex((s) => s.id === currentStep);
              if (currentIndex > 0) {
                setCurrentStep(steps[currentIndex - 1].id);
              }
            }}
          >
            <img src={backArrow} className="w-[30px] h-[30px]" />
          </div>

          {/* Step Indicators */}
          <div className="flex flex-col w-full lg:flex-row space-x-[10px]">
            {steps.map((s, index) => {
               const currentIndex = steps.findIndex(s=>s.id===currentStep)
               console.log('currentIndex', currentIndex,index)
              return (
                <div
                  key={s.id}
                  className={`flex p-[10px] w-full lg:w-[357px] h-[50px] font-[20px] font-primary font-base items-center justify-start
                  ${index < currentIndex ? "bg-black text-white hidden lg:flex" : index === currentIndex ? "bg-black text-primary" : "bg-[rgba(0,0,0,0.2)] text-white hidden lg:flex"}
                  ${
                    index === 0
                      ? "rounded-tl-[10px] rounded-bl-[10px] rounded-tr-[5px] rounded-br-[5px]" // First step
                      : index === steps.length - 1
                      ? "rounded-tr-[10px] rounded-br-[10px] rounded-tl-[5px] rounded-bl-[5px] " // Last step
                      : "rounded-[5px]" // Middle steps
                  }`}
                >
                  {s.name}
                </div>
              )
            })}
          </div>
        </div>

        {/* Render Current Step Component */}
        {renderSteps()}
      </div>
    </div>
  );
}

export default SubscriptionPage;
