import CountCard from "@/components/Dashboard/CountCard";
import newMessageIcon from "@/assets/icons/new-message.svg";
import pendingOrdersIcon from "@/assets/icons/pending-orders.svg";
import myListIcon from "@/assets/icons/my-plan.svg";
import UsersPage from "../hrbp/users/Page";
import { Link, useNavigate } from "react-router-dom";
import OrdersPage from "../orders/Page";
import { useViewport } from "@/hooks/use-mobile";
import DashboardModal from "@/components/Dashboard/DashboardModal";
import { useState } from "react";

const CountCardData = [
  {
    bg: "bg-primary",
    count: "4",
    title: "New Messages",
    icon: newMessageIcon,
  },
  {
    bg: "bg-[#1A3E81]",
    count: "25",
    title: "Pending Orders",
    icon: pendingOrdersIcon,
  },
  {
    bg: "bg-[#1DBF73]",
    count: "Essential",
    title: "My Plan",
    icon: myListIcon,
  },
];

const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const viewPort = useViewport();
  console.log("viewPort", viewPort);

  return (
    <div className="w-full">
      <div className="grid  grid-cols-1  md:grid-cols-3  xl:grid-cols-3 gap-[8px]">
        {CountCardData.map((item, index) => (
          <CountCard key={index} {...item} />
        ))}
      </div>
      <div className="w-full my-4">
        <UsersPage showFilters={false} isDashboard={true} />
        <div className="flex justify-between items-center w-full mb-4">
          <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full ">
            Recent Orders
          </p>
          <Link
            to="/orders"
            className="text-[12px] font-semibold font-primary w-full text-primary underline text-end "
          >
            View All
          </Link>
        </div>

        <OrdersPage showFilters={false} />
      </div>
      {isOpen && (
        <DashboardModal
          isOpen={isOpen}
          onOpenChange={() => setIsOpen(false)}
          data={{ name: "Tran" }}
          onContinue={() => navigate("/tutorial")}
        />
      )}
    </div>
  );
};

export default DashboardPage;
