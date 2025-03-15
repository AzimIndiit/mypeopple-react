
import {  useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import fileXlsx from "@/assets/icons/xlsx.svg";
import filePdf from "@/assets/icons/pdf.svg";
import fileDoc from "@/assets/icons/doc.svg";

import addIcon from "@/assets/icons/add-solid.svg";
const MyLibrary = () => {
  const navigate = useNavigate();

  const toolList = [
    {
      name: "Assessment template",
      fileType: "xlsx",
    },
    {
      name: "Employment contract",
      fileType: "pdf",
    },
    {
      name: "Collective",
      fileType: "doc",
    },
    {
      name: "Employment contract",
      fileType: "doc",
    },
    {
      name: "Collective",
      fileType: "pdf",
    },

    {
      name: "Assessment template",
      fileType: "xlsx",
    },
  ];

  const getFileTypeIcon = (fileType: string) => {
    switch (fileType) {
      case "xlsx":
        return fileXlsx;
      case "pdf":
        return filePdf;
      default:
        return fileDoc;
    }
  };

  return (
    <div className="w-full my-4 md:y-0">
      <div className="flex justify-between items-center ">
        <p className=" text-[16px] lg:text-[20px] font-medium font-primary w-full ">
          My Library
        </p>
        <Button
          onClick={() => navigate("/orders/create")}
          variant="ghost"
          className="group text-[12px]  hover:border-1 hover:border-black hover:text-white font-primary bg-black text-white h-[41px] rounded-[10px] w-fit border border-transparent transition-all duration-300"
        >
          <img
            src={addIcon}
            className="w-[16px] h-[16px] filter invert transition-all duration-300 group-hover:filter-none"
          />
          <span className="ml-2 transition-all duration-300 group-hover:text-black">
            ADD
          </span>
        </Button>
      </div>
      <div className="my-4 space-y-4">
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {toolList.map((tool) => (
            <div
              key={tool.name}
              className="flex   items-center gap-4 w-full  text-center border border-gray-200 rounded-[16px] p-[15px]  "
            >
              <div className="w-full h-full flex flex-col items-center gap-2 ">

              <img
                src={getFileTypeIcon(tool.fileType)}
                alt={tool.name}
                className="w-[82px] h-[82px]"
              />
                <p className="text-[14px] font-semibold font-primary">
                  {tool.name}
                </p>
               
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLibrary;
