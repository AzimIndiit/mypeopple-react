import {  useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import connectIcon from "@/assets/icons/connect.svg";
import emailIcon from "@/assets/icons/email-solid.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import locationIcon from "@/assets/icons/location-fill.svg";
import client1 from "@/assets/images/clients/client1.png"
const UserAccount = ({userData}:{userData:any}) => {
  const { id } = useParams();
  console.log(id);

  const clientUser:any={
    name:"Jabari Keita",
    image:client1,
    status:"active",
    position:"CEO",
    address:'965 Saint Joseph St, California, USA, 190055 ',
    email:"Jabari Keita@gmail.com",
    phone:"+56 458456 6562"
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between md:items-start items-center w-full my-4 gap-5">
        
          <img
            src={clientUser.image}
            alt="user"
            className="object-cover  w-full h-full rounded-[16px]"
          />
       
      {/* </div> */}
      <div className="flex flex-col  justify-between text-left w-full h-full   " >
        <p className="text-[16px] font-semibold font-primary ">
            User Info
          </p>
       <div  className="space-y-2">
       <p className="text-[20px] font-semibold font-primary">
            {clientUser.name} <span className="capitalize text-[16px] text-white rounded- h-[32px] rounded-full bg-[#1DBF73] font-light p-[10px]">{clientUser.status}</span>
          </p>
          <p className="text-[14px] font-light font-primary">
          {clientUser.position}
          </p>
    
        <p className="text-[14px] font-light font-primary flex items-start gap-2 text-black">
            <img
              src={locationIcon}
              className="w-[16px] xl:w-[24px] h-[16px] xl:h-[24px]"
            />{" "}
            {clientUser.address}
          </p>
          <p className="text-[16px] font-light font-primary flex items-center gap-2">
            <img src={emailIcon} className="w-[24px] h-[24px]" />{" "}
            {clientUser.email}
          </p>
          <p className="text-[16px] font-light font-primary flex items-center gap-2">
            <img src={phoneIcon} className="w-[24px] h-[24px]" />{" "}
            {clientUser.phone}
          </p>
        </div>
     <Button className="h-[40px]   w-full">
        <img
          src={connectIcon}
          alt="connect"
          className="w-[16px] h-[16px]"
        />{" "}
        Connect
      </Button>
        </div>
        <div className="flex text-left flex-col items-start gap-2 w-full h-full bg-[#F8F8F8] p-[10px] rounded-[10px] ">

          <p className="text-[16px] font-semibold font-primary mb-4">
            Company Info
          </p>
          <p className="text-[16px] font-semibold font-primary">
            {userData.name}{" "}
            <span className="font-light">(ERN : {userData.ern})</span>
          </p>
          <p className="text-[16px] text-[#858494] font-light font-primary">
            VAT ID Number:{" "}
            <span className="font-light text-black">{userData.vatNo}</span>
          </p>
          <p className="text-[16px] text-[#858494] font-light font-primary">
            Collective Bargaining Agreement:{" "}
            <span className="font-light  text-black">
              {userData.bargainingAgreement}
            </span>
          </p>
          <p className="text-[16px] text-[#858494] font-light font-primary">
            NAF Code:{" "}
            <span className="font-light text-black"> {userData.nafCode}</span>
          </p>
          <hr className="my-4   w-full" />
          <p className="text-[14px] font-light font-primary flex items-start gap-2 text-black">
            <img
              src={locationIcon}
              className="w-[16px] xl:w-[24px] h-[16px] xl:h-[24px]"
            />{" "}
            {userData.address}
          </p>
          <p className="text-[14px] font-light font-primary flex items-start gap-2 text-black">
            <img
              src={emailIcon}
              className="w-[16px] xl:w-[24px] h-[16px] xl:h-[24px]"
            />{" "}
            {userData.email}
          </p>
          <p className="text-[14px] font-light font-primary flex items-start gap-2 text-black">
            <img
              src={phoneIcon}
              className="w-[16px] xl:w-[24px] h-[16px] xl:h-[24px]"
            />{" "}
            {userData.phone}
          </p>
        </div>
     
      </div>
    </div>
  );
};

export default UserAccount;
