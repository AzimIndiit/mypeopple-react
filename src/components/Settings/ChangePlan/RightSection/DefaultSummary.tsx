import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DefaultSummary = () => {
  return (
    <>
      <Card className="px-4 py-[10px] mb-4 bg-[#40404014] shadow-none rounded-[10px] gap-2">
        <h3 className="font-semibold font-primary text-[16px]">Order Summary</h3>
      <p className=" text-[#596569] mb-4 font-primary font-light text-[16px]">
        Your choices appear here in a handy overview. Choose your plan to start
        registration.
      </p>
    </Card>

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
    </>
  );
};

export default DefaultSummary;
