import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import check1 from "@/assets/icons/check1.svg";
import check2 from "@/assets/icons/check2.svg";
import popular from "@/assets/images/premium.svg";

const pricingPlans = [
  {
    id: 1,
    price: "3620",
    title: "Invest in France",
    duration: "month",
    description: "Our HR package to settle right",
    features: [
      "Recruitment and onboarding support",
      "Performance evaluation systems",
      "HR strategy consultations",
    ],
    buttonText: "Choose plan",
    isPopular: true,
  },
  {
    id: 2,
    price: "520",
    title: "Change Management",
    duration: "day",
    description:
      "To manage a one time key strategic project or transition period.",
    features: [
      "Recruitment and onboarding support",
      "Performance evaluation systems",
      "HR strategy consultations",
    ],
    buttonText: "Choose plan",
  },
];
function PricingCard({
  planId,
  duration,
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
  duration: string;
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
        " w-full font-primary transition-all flex flex-col p-4 shadow-md rounded-3xl ",
        isPopular
          ? "bg-black text-white bg-cover bg-center shadow-2xl rounded-3xl  "
          : "  border border-[#E3E5E8]",
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
          /{duration}
        </span>
      </div>

      <div className={cn("mb-2", isPopular ? "block" : "opacity-0")}>
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
      <div className="w-full">
        <Button
          type="button"
          onClick={() =>
            handleSubmit({
              planId,
              price,
              title,
              duration,
            })
          }
          className={cn(
            "w-full h-[45px] rounded-full py-6 text-[13px] font-medium mt-auto my-4 lg:my-0",
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

function ExtraPlanPricing({ onSubmit }: { onSubmit: (data: any) => void }) {
  return (
    <div className=" ">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2  rounded-3xl gap-5 ">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              handleSubmit={onSubmit}
              planId={plan.id}
              key={index}
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

export default ExtraPlanPricing;
