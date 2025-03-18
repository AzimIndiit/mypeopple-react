import MyPlansTable from "./MyPlansTable";
import { PageHeader } from "../PageHeader";
import switchIcon from "@/assets/icons/outline_switch.svg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const MyPlans = () => {
  const navigate = useNavigate();
  const subscription = {
    name: "Essential Plan",
    recurring: "Monthly",
    nextBilling: "12/12/2024",
    lastBilled: "12/12/2024",
    daysLeft: 20,
  };
  return (
    <div className="">
      <PageHeader title="My Plans" buttonText="Change Plan" icon={switchIcon} onAdd={() => navigate("/settings/change-plan")} />
      <div className="mt-4 space-y-4">
        <div className="flex flex-col md:flex-row justify-between md:items-center items-end bg-[#FFF4F0] px-[19px] py-[10px] rounded-[6px] gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 md:items-center w-full gap-4 xl:gap-[45px]">
            <div className="pr-6">
              <p className="text-[14px] font-primary font-light">Plan</p>
              <p className="text-[16px] font-primary font-semibold">
                {subscription.name}{" "}
                <span className="text-[12px] font-primary font-light">
                  | {subscription.recurring}
                </span>
              </p>
            </div>

            <div className="md:border-l border-gray-300 h-full md:px-6">
              <p className="text-[14px] font-primary font-light">
                Last Billed On
              </p>
              <p className="text-[16px] font-primary font-medium">
                {subscription.lastBilled}
              </p>
            </div>

            <div className="md:border-l border-gray-300 h-full md:px-6">
              <p className="text-[14px] font-primary font-light">Days Left</p>
              <p className="text-[16px] font-primary font-semibold">
                {subscription.daysLeft}
              </p>
            </div>

            <div className="md:border-l border-gray-300 h-full md:px-6">
              <p className="text-[14px] font-primary font-light">
                Next Billing
              </p>
              <p className="text-[16px] font-primary font-semibold">
                {subscription.nextBilling}
              </p>
            </div>
          </div>

          <div className="">
            <Button
              variant="outline"
              className="text-[14px] font-primary font-medium border-primary text-primary h-[38px] shadow-md"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full mb-4">
          <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full ">
            Billing History
          </p>
        </div>
        <MyPlansTable />
      </div>
    </div>
  );
};

export default MyPlans;
