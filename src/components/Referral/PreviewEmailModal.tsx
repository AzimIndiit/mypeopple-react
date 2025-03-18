import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import closeIcon from "@/assets/icons/close-fill.svg";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const PreviewEmailModal = ({
  isOpen,
  onOpenChange,
  onContinue,
  data,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (value: any) => void;
  data: any;
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-4 rounded-[15px] text-center font-primary w-full md:w-[752px] ">
        {/* Header */}
        <div className="flex items-center justify-end">
          {/* <p className="font-semibold uppercase">MEETING</p> */}
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition"
            onClick={() => onOpenChange(false)}
          >
            <img src={closeIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        <AlertDialogDescription className="text-[14px] font-primary text-center">
          <div className="flex flex-col gap-[20px] ">
            <div className=" flex flex-col items-center justify-center">
              <img
                src={data.profile}
                alt="avatar"
                className="w-[120px] h-[120px] rounded-md"
              />
              <p className="text-[18px] font-primary  text-center mt-[20px] font-semibold text-black ">
                {data.name} would like to share Mypeople with you
              </p>
            </div>
            <p className="text-[14px] font-primary font-light text-center text-black ">
              Discover the easiest way to outsource your HRBP and get 10% off
              your first order. From implementation to day-to-day HR Management,
              make the difference with Mypeople
            </p>
            <p className="text-[14px] font-primary font-light text-center text-black">
            Your personal promo Code : <span className="font-semibold">{data.promoCode}</span>
            </p>
            <p className="text-[14px] font-primary bg-[rgba(252,64,6,0.08)] p-[10px] mb-[10px] text-black">
              Promo Code is valid for one-time use only. (2 months validity)
            </p>
            <Link
                to="/terms-and-conditions"
                className={cn("w-full font-light text-primary")}
                type="button"
                onClick={() => onOpenChange(false)}
              >
              Find out more about our services
              </Link>
           <div className="flex justify-center">
           <Button
            className={cn("w-full h-[41px] font-light", "md:w-fit")}
            type="button"
            onClick={onContinue}

          >
           Arrange a free Call with our Experts
          </Button>
           </div>
          <h1 className="text-[36px] text-black font-tertiary font-normal">
            Thanks!
          </h1>
          <p className="text-[14px] font-primary font-light text-center text-black">
            The Mypeople Team
          </p>
          </div>
      
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PreviewEmailModal;
