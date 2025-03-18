import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import check1 from "@/assets/icons/check1.svg";
import check2 from "@/assets/icons/check2.svg";
import popular from "@/assets/images/premium.svg";

const pricingPlans = [
  {
    id: 1,
    price: "20",
    title: "Basic",
    description: "For small startups just starting with HR needs.",
    features: [
      "HR policy templates",
      "Employee contract drafting",
      "Basic compliance guidance",
    ],
    buttonText: "Choose plan",
  },
  {
    id: 2,
    price: "50",
    title: "Essential",
    description: "For growing businesses requiring regular HR support.",
    features: [
      "Regular HR support",
      "Leave and attendance management",
      "Payroll assistance",
    ],
    buttonText: "Choose plan",
  },
  {
    id: 3,
    price: "100",
    title: "Premium",
    description: "For businesses focused on enhanced HR support.",
    features: [
      "Recruitment and onboarding support",
      "Performance evaluation systems",
      "HR strategy consultations",
    ],
    isPopular: true,
    buttonText: "Choose plan",
  },
  {
    id: 4,
    price: "200",
    title: "Advanced",
    description: "For large enterprises with complex HR needs.",
    features: [
      "Full HR outsourcing",
      "Compliance with complex labor laws",
      "Workforce analytics and reporting",
    ],
    buttonText: "Get Quote",
  },
];
function PricingCard({
  planId,
  isMonthly,
  price,
  title,
  description,
  features,
  isPopular,
  buttonText,
  className,
  handleSubmit,
}: {
  planId: number;
  isMonthly: string;
  price: string;
  title: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  className?: string;
  handleSubmit: (data: any) => void;
}) {
  return (
    <div
      className={cn(
        " min-w-[174px] font-primary transition-all flex flex-col  ",
        isPopular
          ? "bg-black text-white bg-cover bg-center shadow-2xl rounded-3xl p-2  lg:w-[188px] "
          : "",
        className
      )}
      style={
        isPopular
          ? {
              backgroundImage: `url(${popular})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            
            }
          : {}
      }
    >
    

      <div className="flex items-baseline">
        <span className="text-[26px] font-bold">€{price}</span>
        <span
          className={cn(
            "text-[17px] font-medium",
            isPopular ? "text-white" : "text-[#848199]"
          )}
        >
          /{isMonthly === "MONTHLY" ? "month" : "year"}
        </span>
      </div>


        <div className={cn("mb-2",isPopular ? "block" : 'opacity-0')}>
          <span className="w-fit px-2 py-1 rounded-full text-[8px] font-medium bg-white text-primary mb-2 h-[18px]">
            MOST POPULAR
          </span>
        </div>
     
      <h3 className="text-[22px] font-bold ">{title}</h3>

      <p
        className={cn(
          "mt-2 mb-2 text-[13px] font-medium",
          isPopular ? "text-white" : "text-[#848199]"
        )}
      >
        {description}
      </p>

      {/* Ensure this div expands to push the button down */}
      <div className="flex-grow mb-2">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-[10px] text-[12px]"
            >
              <img
                src={isPopular ? check2 : check1}
                className="w-[20px] h-[20px]"
              />
              <span className={isPopular ? "text-white" : "text-gray-500"}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button stays at the bottom */}
      <div className="mx-auto">
        <Button
          type="button"
          onClick={()=>handleSubmit({plan:title,planId})}
          className={cn(
            "w-[174px] h-[45px] rounded-full py-6 text-[13px] font-medium mt-auto my-4 lg:my-0",
            isPopular
              ? "bg-primary hover:bg-primary/90 text-black"
              : "bg-[#FFF1EE] hover:bg-[#FFF1EE]/90 text-primary"
          )}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

function PlanPricing({screen,  onSubmit }: {  screen?:string,onSubmit: (data: any) => void }) {
  const [isMonthly, setIsMonthly] = useState<string>("MONTHLY");

  return (
    <div className=" ">
      <div className="max-w-6xl mx-auto">
        <div className="text-left mb-4">
        {screen!=="1" &&  <h2 className="text-[18px] font-semibold font-primary mb-4">
            Choose a Plan
          </h2>}
          <div className="inline-flex items-center  rounded-full p-1 ">
            {["MONTHLY", "YEARLY"].map((value) => {
              console.log(value, "value");
              return (
                <button
                  key={value}
                  type="button"
                  className={`cursor-pointer flex justify-center items-center h-[44px] w-[100px] rounded-full text-[10px] font-primary font-bold transition-all
                ${
                  isMonthly === value
                    ? "bg-gradient-to-b from-[#000000] to-[#3B3B3B] text-white"
                    : "text-[#848199]"
                }`}
                  onClick={() => setIsMonthly(value)}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 bg-[#F9F9F9] rounded-3xl gap-2  p-4">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              handleSubmit={onSubmit}
              planId={plan.id}
              key={plan.title}
              isMonthly={isMonthly}
              className={`
        ${index === 0 ? "rounded-tl-3xl rounded-bl-3xl" : ""} 
        ${
          index === pricingPlans.length - 1
            ? "rounded-tr-3xl rounded-br-3xl"
            : ""
        }
      `}
              {...plan}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlanPricing;
