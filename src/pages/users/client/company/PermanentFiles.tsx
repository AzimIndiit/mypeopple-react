import Header from "@/components/Client/PermanentFiles/Header";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FilesTable from "@/components/Client/PermanentFiles/FilesTable";
import deleteIcon from "@/assets/icons/delete-solid-primary.svg";
import editIcon from "@/assets/icons/edit-solid-primary.svg";
import refreshIcon from "@/assets/icons/rotate-solid-primary.svg";
export default function ClientFiles() {
  return (
    <div className="w-full font-primary">
      
      <div className="my-4">
        <div className="flex justify-between items-center w-full mb-4">
          <Header />
        </div>
        <FilesTable />
        <div className="my-4 flex gap-4 ">
          <Button className="h-[40px] w-fit">
            <Plus /> Add Document
          </Button>
        </div>
      </div>
      <div className="mt-6 ">
      <div className="text-[16px] font-primary font-medium text-black  mb-2 ">
      HRBP Working Notes
        </div>
        <div className="flex justify-between items-center mb-4 ">
        <p className="text-[#848199] text-[13px] font-light ">Lilly Smith, 10 February 2025, 04:50 pm</p> 
    
        <div className="flex  gap-2  text-[12px] font-semibold justify-start items-center">
        <img
          onClick={() => {
          
          }}
          src={editIcon}
          alt="edit"
          className="w-[24px] h-[24px]"
        />{" "}
        <img
          onClick={() => {}}
          src={refreshIcon}
          alt="refresh"
          className="w-[24px] h-[24px]"
        />{" "}
        <img
          onClick={() => {}}
          src={deleteIcon}
          alt="delete"
          className="w-[24px] h-[24px]"
        />{" "}
      </div>
       

       
        </div>
       <div className="leading-relaxed border-2 border-[#A3A3A3] border-dashed rounded-md p-5 bg-[#00000008]">
        <p className="text-[#848199] text-[16px] font-light">
        This company is part of the Ecoflex International Ltd group of companies. The CEO requires that every order be placed through him and not through other users
        </p>
       </div>
        <div className="my-4 flex gap-4 ">
          <Button className="h-[40px] w-fit">
            <Plus /> Add Note
          </Button>
        </div>
      </div>
    </div>
  );
}
