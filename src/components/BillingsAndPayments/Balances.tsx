import { cn } from "@/lib/utils";
import CountCard from "../Dashboard/CountCard";
import BillingHistoryTable from "./BillingHistoryTable";
import referalIcon from "@/assets/icons/referal.svg";
import newMessageIcon from "@/assets/icons/new-message.svg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
const Balances = () => {
    const navigate = useNavigate()
  const CountCardData = [
    {
      bg: "bg-primary",
      count: "240 €",
      title: "From canceled orders",
      icon: newMessageIcon,
    },
    {
      bg: "bg-[#1A3E81]",
      count: "50 €",
      title: "Referal Credits",
      icon: referalIcon,
    },
  ];
  return (
    <div className="w-full">
      <div className="grid  grid-cols-1  md:grid-cols-3  xl:grid-cols-3 gap-[8px] mb-4">
        {CountCardData.map((item, index) => (
          <CountCard key={index} {...item} />
        ))}
        <div
        
          className={cn(
            "flex items-center justify-between w-full  xl:h-[127px]  rounded-[20px] px-4  xl:py-[30px] xl:px-[22px] bg-primary/10"
          )}
        >
          <div className="flex flex-col  font-primary py-2 w-full gap-2">
            <div className="text-[16px]  font-light text-[#848199]">
              Like to earn some Credits ? Join our Mypeople Referal Contribution
              Program
            </div>
            <Button type="button" onClick={() => {
                navigate("/billings/referral")
            }} className=" text-white h-[44px]">Earn Credits</Button>
          </div>
        </div>
      </div>
      <BillingHistoryTable />
    </div>
  );
};

export default Balances;
