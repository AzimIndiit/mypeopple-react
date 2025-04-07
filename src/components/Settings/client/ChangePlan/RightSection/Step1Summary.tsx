import { Card } from "@/components/ui/card";
import check2 from "@/assets/icons/check3.svg";
import { Button } from "@/components/ui/button";
const Step1Summary = () => {
  const features = [
    "This form is about to know you and prepare our onboarding meeting.",
    "Your public profile will be completed from your Dashboard after Membership final completion.",

  ];
  return (
    <div className="space-y-4">


      <Card className="px-4 py-[10px] bg-[#FC40060F] shadow-none rounded-[10px] gap-2">
        <h3 className="font-semibold  font-primary text-[16px]">Notes</h3>
        <div className="flex-grow my-2">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-[10px] text-[15px]"
              >
                <img src={check2} className="w-[20px] h-[20px] " />
                <span className={"text-gray-500"}>
                  {feature}

                
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      <Card className="px-4 py-[10px] bg-[#40404014] shadow-none rounded-[10px] gap-2">
        <h3 className="font-semibold  font-primary text-[16px]">
          We are here to help
        </h3>
        <p className=" text-[#596569] mb-4 font-primary font-light text-[16px]">
          Are you hesitating between our different membership options ? Request
          a free meeting with one of our HR experts.
        </p>
        <Button className="w-full ">Book a Online Meeting</Button>
      </Card>
    </div>
  );
};

export default Step1Summary;
