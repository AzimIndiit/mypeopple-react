import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import backArrow from "@/assets/icons/backArrow.svg";
import addIcon from "@/assets/icons/add-solid.svg";
import { Button } from "@/components/ui/button";
import OrderTable from "@/components/Orders/OrderTable";
import user1 from "@/assets/images/users/user-1.png";
import emailIcon from "@/assets/icons/email-solid.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import connectIcon from "@/assets/icons/connect.svg";
import InvoiceTable from "@/components/Invoice/InvoiceTable";
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
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <div
            className="cursor-pointer w-[30px]"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={backArrow} className="w-[30px] h-[30px]" />
          </div>
          <p className="text-[20px] font-light font-primary">HRBP Details</p>
        </div>
        <Button
          onClick={() => navigate("/orders/create")}
          variant="ghost"
          className="group text-[12px] font-light hover:border-1 hover:border-black hover:text-white font-primary bg-black text-white h-[41px] rounded-[15px] w-[200px] border border-transparent transition-all duration-300"
        >
          <img
            src={addIcon}
            className="w-[16px] h-[16px] filter invert transition-all duration-300 group-hover:filter-none"
          />
          <span className="ml-2 transition-all duration-300 group-hover:text-black">
            Create Order with HRBP
          </span>
        </Button>
      </div>
      <div className="flex flex-col md:flex-row justify-between md:items-start items-center w-full my-4 gap-4 xl:gap-[43px]">
        <div className="flex flex-col items-center gap-2 w-[278px]">
          <div className="flex items-center gap-2 h-[240px] xl:h-[200px] w-full xl:w-[238px] rounded-[16px] bg-gray-100  relative">
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
