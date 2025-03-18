import { PageHeader } from "../PageHeader";
import TransactionHistoryPage from "./TransactionHistoryTable";
import card1 from "@/assets/images/card1.png";
import card2 from "@/assets/images/card2.png";
import editIcon from "@/assets/icons/edit.svg";
import deleteIcon from "@/assets/icons/outline-delete.svg";

const SavedPaymentMethods = () => {
  const savedPaymentMethods = [
    {
      id: 1,
      title: "Card",
      image: card1,
      paymentMode: "Card",
    },
    {
      id: 2,
      title: "Card",
      image: card2,
      paymentMode: "Card",
    },
  ];
  return (
    <div className="">
      <PageHeader title="Saved Payment Methods" buttonText="Add New" />
      <div className="mt-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {savedPaymentMethods.map((method) => (
            <div key={method.id} className="flex items-start gap-4">
              <img
                src={method.image}
                className="w-[387px] h-[247.14px]"
                alt={method.title}
              />
              <div className="flex flex-col items-center gap-2">
                <img
                  src={editIcon}
                  className="w-[24px] h-[24px]"
                  alt={"edit"}
                />
                <img
                  src={deleteIcon}
                  className="w-[24px] h-[24px]"
                  alt={"delete"}
                />
              </div>
              {/* <p>{method.title}</p> */}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center w-full mb-4">
          <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full ">
            Transaction History
          </p>
        </div>
        <TransactionHistoryPage />
      </div>
    </div>
  );
};

export default SavedPaymentMethods;
