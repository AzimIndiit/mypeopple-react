import React, { FC } from "react";
import { Button } from "../ui/button";
import connectIcon from "@/assets/icons/connect.svg";
import viewInfoIcon from "@/assets/icons/info-pri.svg";
import { useNavigate } from "react-router-dom";

interface UserCardProps {
  id: number;
  image: string;
  name: string;
  exp: string;
  status: string;
}
const experienceFormatter = (exp: string) => {
  if (exp.includes("year")) {
    return exp.split(" ")[0] + " years";
  } else if (exp.includes("month")) {
    return exp.split(" ")[0] + " months";
  } else {
    return exp;
  }
};

const getColor = (status: string) => {
  var colors = {
    available: "#1DBF73",
    unavailable: "#FBBC05",
    offline: "#ACACAC",
  };

  return colors[status as keyof typeof colors];
};
const UserCard: FC<UserCardProps> = ({ id, image, name, exp, status }) => {
  const navigate = useNavigate()
  return (
    <div className="p-[15px]  flex flex-col justify-between rounded-[16px] bg-white shadow-md w-full  xl:w-[258px] gap-[16px] xl:h-[329px] border border-gray-200">
      <div className="flex items-center gap-2 h-[240px] xl:h-[200px] w-full xl:w-[228px] rounded-[16px] bg-gray-100  relative">
        <img src={image} alt="user" className="object-cover  w-full h-full rounded-[16px]" />
        <div className="flex items-center justify-center gap-[5px] h-[26px] bg-white rounded-[25px] px-[10px] py-[7px] absolute top-[10px] right-[10px]">
          <div
            className={`bg-[${getColor(
              status
            )}] rounded-full h-[10px] w-[10px]`}
          />

          <p
            className="text-[12px] font-semibold capitalize"
            style={{ color: getColor(status) }}
          >
            {status}
          </p>
        </div>
      </div>
      <div className="flex  justify-between items-center gap-2 font-primary">
        <div className="text-[16px] font-semibold capitalize">{name}</div>
        <div className=" w-[2px] h-full bg-[#404145]"></div>
        <div className="text-[14px] font-light">
          {experienceFormatter(exp)}
        </div>
      </div>
      <div className="flex flex-col xl:flex-row gap-2  text-[12px] font-semibold justify-center">
        <Button className="h-[40px] xl:w-[114px] ">
          {" "}
          <img
            src={connectIcon}
            alt="connect"
            className="w-[16px] h-[16px]"
          />{" "}
          Connect{" "}
        </Button>
        <Button variant="outline" className="h-[40px] xl:w-[114px] " 
        onClick={() => navigate(`/users/${id}`)} >
          {" "}
          <img
            src={viewInfoIcon}
            alt="viewInfo"
            className="w-[16px] h-[16px]"
          />{" "}
          View Info
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
