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
  const PopupModal = ({
    isOpen,
    onOpenChange,
    title,
    description,
    onContinue,
    showFooter = true,
  }: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: ReactNode;
    onCancel?: () => void;
    onContinue?: () => void;
    showFooter?: boolean;
  }) => {
    return (
      <AlertDialog open={isOpen} onOpenChange={onOpenChange} >
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
            <AlertDialogTitle className="text-[28px] font-bold font-primary text-center !p-0 mt-2 ">{title}</AlertDialogTitle>
          
          </AlertDialogHeader>
  
          <AlertDialogDescription className="text-[14px] font-primary text-center">{description}</AlertDialogDescription>
          {showFooter && (
            <div className="flex items-center justify-center w-full ">
              <Button  className="h-[41px] rounded-[10px] font-primary text-[14px] font-semibold text-white text-center" onClick={onContinue}>Place Order</Button>
            </div>
          )}
          <div className="flex items-center justify-center">
            <p className="text-[14px] font-primary text-center">The My-People Team</p>
          </div>
  
          
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default PopupModal;
  