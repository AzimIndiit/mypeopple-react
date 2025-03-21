import BillingHistory from "@/components/BillingsAndPayments/BillingHistory";
import { PageHeader } from "@/components/PageHeader";
import { useRef, useState } from "react";
import BillingDetailsPage from "@/components/BillingsAndPayments/BillingDetails";
import PaymentMethodPage from "@/components/BillingsAndPayments/PaymentMethod";
import Balances from "@/components/BillingsAndPayments/Balances";
import { useNavigate } from "react-router-dom";

const BillingPage = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<string>("billing-history");
  const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const tabs = [
    {
      label: "Billing History",
      value: "billing-history",
    },
    {
      label: "Billing Info",
      value: "billing-info",
    },
    {
      label: "Balances",
      value: "balances",
    },
    {
      label: "Payment Methods",
      value: "payment-methods",
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

  return (
    <div>
      <PageHeader
        title="Billings & Payment"
        onAdd={() => {}}
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
              className={`p-4 rounded-lg w-full h-[56px] min-w-[250px] md:min-w-[200px] font-primary font-light flex items-center justify-center cursor-pointer transition-all duration-200 
          ${
            currentTab === tab.value
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
              onClick={() => handleClick(tab.value)}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      <div className="w-full">
        {currentTab === "billing-history" && (
          <BillingHistory
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        )}
        {currentTab === "billing-info" && <BillingDetailsPage />}
        {currentTab === "balances" && <Balances />}
        {currentTab === "payment-methods" && <PaymentMethodPage />}
      </div>
    </div>
  );
};

export default BillingPage;
