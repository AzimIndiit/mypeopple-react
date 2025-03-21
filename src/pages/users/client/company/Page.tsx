import { useNavigate, useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
import user1 from "@/assets/images/users/user-1.png";

// import connectIcon from "@/assets/icons/connect.svg";

import { PageHeader } from "@/components/PageHeader";
import { useRef, useState } from "react";
import AccountInfo from "./AccountInfo";
import UserAccount from "./UserAccount";
import BillingInfo from "./BillingInfo";
import ClientOrders from "./Orders";
import ClientSourcing from "./Sourcing";
import ClientTools from "./Tools";
import ClientFiles from "./PermanentFiles";

const CompanyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState<string>("account-info");
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const tabs = [
    {
      label: "Account Info",
      value: "account-info",
    },
    {
      label: "User Accounts",
      value: "user-accounts",
    },
    {
      label: "Billings and Invoices",
      value: "billings",
    },
    {
      label: "Orders",
      value: "orders",
    },
    {
      label: "Tools",
      value: "tools",
    },
    {
      label: "Permanent File",
      value: "permanent-file",
    },
    {
      label: "Sourcing",
      value: "sourcing",
    },
  ];

  const handleClick = (tabValue: string) => {
    setCurrentTab(tabValue);

    // Scroll into view
    tabRefs.current[tabValue]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  console.log(id);
  const userData = {
    id: id,
    name: "Ecoflex",
    image: user1,
    status: "available",
    ern: "452452",
    vatNo: "UYGHUIG7587IUYGF",
    nafCode: "YHGYU76",
    bargainingAgreement: 234,
    address: "965 Saint Joseph St, California, USA, 190055 ",
    email: "SophieBernard@gmail.com",
    phone: "+56 458456 6562",
  };
  return (
    <div>
      <PageHeader
        title={`Client Details`}
        onAdd={() => navigate("/orders/create")}
        buttonText="Create Order with Client"
        onBack={() => navigate(-1)}
      />
      <div className="w-full overflow-auto">
        <div className="flex gap-4 my-4 w-full">
          {tabs.map((tab) => (
            <div
              key={tab.value}
              ref={(el) => {
                tabRefs.current[tab.value] = el; // Ensure no return value
              }}
              className={`p-4 text-[12px] rounded-lg h-[28px] min-w-fit font-primary font-light flex items-center justify-center cursor-pointer transition-all duration-200 border border-primary 
          ${
            currentTab === tab.value
              ? "bg-primary text-white"
              : "bg-white text-primary hover:bg-gray-200"
          }`}
              onClick={() => handleClick(tab.value)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>
      <div>
        {currentTab === "account-info" && <AccountInfo userData={userData} />}
        {currentTab === "user-accounts" && <UserAccount userData={userData} />}
        {currentTab === "billings" && <BillingInfo />}
        {currentTab === "orders" && <ClientOrders showFilters />}
        {currentTab === 'tools' && <ClientTools/> }
               {currentTab === "permanent-file" && <ClientFiles />}
        {currentTab === "sourcing" && <ClientSourcing />}
 
      </div>
    </div>
  );
};

export default CompanyDetails;
