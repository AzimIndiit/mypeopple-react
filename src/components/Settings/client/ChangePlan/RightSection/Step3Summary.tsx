import { Card } from "@/components/ui/card";
import check2 from "@/assets/icons/check3.svg";
import { Checkbox } from "@/components/ui/checkbox";
const Step3Summary = () => {
  const features = [
    "Infos can always be modified from your Dashboard after your subscription is completed",
    "Know more about our",
  ];
  return (
    <div className="space-y-4">
      <div className="rounded-[10px] bg-[#40404014] border border-[#40404014] mt-[20px] p-4">
        <h3 className="font-semibold  font-primary text-[16px]">
          Order Summary
        </h3>
        <Card className="mt-2 p-2 w-full bg-[white] shadow-none rounded-[10px] gap-4 ">
          <div className="grid grid-cols-[60%_40%] gap-4 w-full">
            <p className="text-[14px] text-left text-[#454B54] flex items-center">
              Price Estimate
            </p>
            <p className="text-[16px] text-[#454B54] font-primary font-bold flex items-center">
              10€
            </p>

            <p className="text-[14px] text-left text-[#454B54] flex items-center">
              On Site
            </p>
            <p className="text-[16px] text-[#454B54] font-primary font-bold flex items-center">
              10€
            </p>

            <hr className="col-span-2 w-full" />

            <p className="text-[14px] text-left text-[#454B54] flex items-center">
              Special Discount
            </p>
            <p className="text-[16px] text-[#454B54] font-primary font-bold flex items-center">
              10€
            </p>

            <p className="text-[14px] text-left text-[#454B54] flex items-center">
              Total Before VAT
            </p>
            <p className="text-[16px] text-[#454B54] font-primary font-bold flex items-center">
              270€
            </p>

            <p className="text-[14px] text-left text-[#454B54] flex items-center">
              VAT
            </p>
            <p className="text-[16px] text-[#454B54] font-primary font-bold flex items-center">
              5%
            </p>

            <p className="text-[14px] text-left text-[#454B54] flex items-center">
              Total Including VAT
            </p>
            <p className="text-[16px] text-primary font-primary font-bold flex items-center">
              300€
            </p>
          </div>
        </Card>
        <div className="mt-4 space-y-2">
          <p className="text-[14px] text-left text-[#454B54] flex items-center">
            You have made the right choice. Compared to hiring an HR manager you
            save
          </p>
          <p className="text-[16px] font-primary font-bold flex items-center">
            2000€
          </p>
        </div>
      </div>

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

                  {index === 1 && (
                    <>
                      <p className="text-[14px] text-primary font-primary underline">
                        Privacy Policy
                      </p>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
      <div className="space-x-2">
        <Checkbox
          id="isPromotions"
          checked={true}
          // onCheckedChange={field.onChange}
        />
        <label
          htmlFor="isPromotions"
          className="text-[14px] font-light !leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-primary "
        >
          Yes, I would like to receive promotions regarding other services from
          Mypeople and their partners
        </label>
        </div>
        <div className="space-x-2">
        <Checkbox
          id="isInterst"
          checked={true}
          // onCheckedChange={field.onChange}
        />
        <label
          htmlFor="isInterst"
          className="text-[14px] font-light !leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  font-primary"
        >
          Yes, I would like to make optimal use of my Mypeople services and
          accept to receive information that is based on my interest or
          preferences
        </label>
      </div>
    </div>
  );
};

export default Step3Summary;
