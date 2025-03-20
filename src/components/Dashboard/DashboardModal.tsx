import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import closeIcon from "@/assets/icons/close-fill.svg";
import logo from "@/assets/icons/logo.svg";
import { Button } from "../ui/button";
import userLineIcon from "@/assets/icons/user-line.svg";
import micLineIcon from "@/assets/icons/mic-line.svg";
import chartLineIcon from "@/assets/icons/chart-line.svg";
import secureLineIcon from "@/assets/icons/secure-line.svg";

const list = [
  {
    title: "Get to know & Meet your personal HRBP",
    image: userLineIcon,
  },
  {
    title: "Ask a question to your Mypeople AI Companion",
    image: micLineIcon,
  },
  {
    title: "Update your billing or payment methods",
    image: secureLineIcon,
  },
  {
    title: "Place your first Order",
    image: chartLineIcon,
  },
];
const DashboardModal = ({
  isOpen,
  data,
  onOpenChange,
  onContinue,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
  onCancel?: () => void;
  onContinue?: () => void;
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
            Hello {data?.name} !
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-[14px] font-primary text-center text-light ">
          <p>Welcome to your new Mypeople experience</p>
        </AlertDialogDescription>
        <AlertDialogDescription className="text-[14px] font-primary text-light text-center">
          <p>What would you like to do first ?</p>
        </AlertDialogDescription>

        <div className="grid grid-cols-2 gap-[10px]" >
          {list.map((item) => (
            <div className="bg-[#F0F0F0] flex flex-col justify-center items-center  p-4 rounded-[10px] space-y-2">
              <img
                src={item.image}
                alt={item.title}
                className="h-[48px] w-[48px] "
              />
              <p className="text-[15px] font-primary text-center text-semibold ">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center w-full ">
          <Button
            className="h-[41px] rounded-[10px] font-primary text-[14px] font-semibold text-white text-center"
            onClick={onContinue}
          >
            Explore More
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DashboardModal;
