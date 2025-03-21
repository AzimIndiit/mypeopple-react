import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import user1 from "@/assets/images/users/user-1.png";
import emailIcon from "@/assets/icons/email-solid.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import connectIcon from "@/assets/icons/connect.svg";
import InvoiceTable from "@/components/Invoice/InvoiceTable";
import { PageHeader } from "@/components/PageHeader";
const UserProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);
  const userData = {
    id: id,
    name: "John Doe",
    exp: "5 years",
    image: user1,
    status: "available",
    email: "john.doe@example.com",
    phone: "+1234567890",
  };
  return (
    <div>
      <PageHeader title="HRBP Details"  onAdd={() => navigate("/orders/create")} buttonText="Create Order with HRBP"  onBack={() => navigate(-1)} />
      <div className="flex flex-col md:flex-row justify-between md:items-start items-center w-full my-4 gap-4 xl:gap-[43px]">
        <div className="flex flex-col items-center gap-2 w-full  xl:w-[278px]">
          <div className="flex items-center gap-2 md:h-[200px]  xl:h-[200px] w-full  rounded-[16px] bg-gray-100  relative">
            <img
              src={userData.image}
              alt="user"
              className="object-cover  w-full h-full rounded-[16px]"
            />
          </div>
          <div className="flex flex-col gap-2 text-left  w-full my-4">
            <p className="text-[16px] font-semibold font-primary">
              {userData.name}
            </p>
            <p className="text-[14px] font-light font-primary">
              {userData.exp}
            </p>
            <p className="text-[14px] font-light font-primary flex items-center gap-2">
              <img src={emailIcon} className="w-[16px] h-[16px]" />{" "}
              {userData.email}
            </p>
            <p className="text-[14px] font-light font-primary flex items-center gap-2">
              <img src={phoneIcon} className="w-[16px] h-[16px]" />{" "}
              {userData.phone}
            </p>
          </div>
          <Button className="h-[40px]   w-full">
            {" "}
            <img
              src={connectIcon}
              alt="connect"
              className="w-[16px] h-[16px]"
            />{" "}
            Connect{" "}
          </Button>
        </div>
        <div className="w-full">
          <p className=" text-[14px] lg:text-[14px] font-semibold font-primary w-full mb-4 uppercase text-[#1C1C1C]  ">
            Invoices
          </p>
          <InvoiceTable />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
