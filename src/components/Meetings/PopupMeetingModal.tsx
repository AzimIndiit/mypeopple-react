import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
//   import { Button } from "@/components/ui/button";

import closeIcon from "@/assets/icons/close-fill.svg";
import logo from "@/assets/icons/logo.svg";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const PopupMeetingModal = ({
  isOpen,
  data,
  onOpenChange,
  onCancel,
  onContinue,
  type,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
  onCancel?: () => void;
  onContinue?: () => void;
  type: string;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-4 rounded-[15px] text-center ">
        <div className="flex items-center justify-end">
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition"
            onClick={() => onOpenChange(false)}
          >
            <img src={closeIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>
        <AlertDialogHeader className="">
          <div className="flex items-center justify-center">
            <img src={logo} alt="logo" className="h-[30px] w-[181px] " />
          </div>
          <AlertDialogTitle className="text-[18px] font-bold font-primary text-center !p-0 mt-2 ">
            {data?.title}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-[14px] font-primary text-light text-center">
          <p>{data?.description}</p>
        </AlertDialogDescription>
        <div className="flex items-center justify-center w-full ">
          <Link
            className=" cursor-pointer underline text-primary   rounded-[10px] font-primary text-[14px] font-semibold text-center"
            to={data?.button?.url}
          >
            {data?.button?.text}
          </Link>
        </div>

        {data?.description1 && (
          <AlertDialogDescription className="text-[14px] font-primary text-center text-light ">
            <p>{data?.description1}</p>
          </AlertDialogDescription>
        )}
        {type === "confirm" && (
          <div className="flex items-center justify-center w-full ">
            <Button
              className="h-[41px] rounded-[10px] font-primary text-[14px] font-semibold text-white text-center"
              onClick={onContinue}
            >
             Plan meeting
            </Button>
          </div>
        )}

        
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopupMeetingModal;
