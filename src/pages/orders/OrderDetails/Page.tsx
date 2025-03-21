import { useAuth } from "@/context/AuthContext";

import OrderDetailsEdit from "./OrderDetailsEdit";
import OrderDetailsView from "./OrderDetailsView";
const orderDetails = {
  id: "12345",
  serviceType: "Employment Contract",
  description:
    "Hello, I would need an employment contract for an employee who is scheduled to start work next Tuesday. The contract should include all standard terms and conditions, and the necessary details are provided in the attached files. Please ensure that the contract is prepared and ready before the mentioned date to avoid any delays in onboarding. Feel free to reach out if additional information or clarification is required.",
  pricingDetails: [
    { label: "Price type", value: "Fixed Price" },
    { label: "Price before VAT", value: "134 €" },
    { label: "Additional Type", value: "Additional Contract" },
    { label: "Additional Price before VAT", value: "90 €" },
    { label: "Special Discount Type", value: "Annual Discount" },
    { label: "Discount Amount before VAT", value: "20 €" },
    { label: "Commission Rate Type", value: "Annual" },
    { label: "Commission Amount before VAT", value: "285 €" },
  ],

  taxDetails: [
    { label: "Total excl. VAT", value: "30 €" },
    { label: "VAT", value: "5€" },
    { label: "Total incl. VAT", value: "70 €" },
  ],
  attachments: [
    {
      name: "document1.pdf",
      type: "pdf",
      size: 47011,
      
    },
  
  ],
};

const OrderDetailPage = () => {
  const { user } = useAuth();
  return (
    <div>
      {user.role === "hrbp" ? (
        <OrderDetailsEdit orderDetails={orderDetails} />
      ) : (
        <OrderDetailsView orderDetails={orderDetails} />
      )}
    </div>
  );
};

export default OrderDetailPage;
