import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import closeIcon from "@/assets/icons/close-fill.svg";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const ThankyouModal = ({
  isOpen,
  data,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
}) => {
  const ReviewOrderSchema = z.object({
    rating: z.number().optional(),
    review: z.string().optional(),
  });

  type ReviewOrderDetails = z.infer<typeof ReviewOrderSchema>;

  const form = useForm<ReviewOrderDetails>({
    resolver: zodResolver(ReviewOrderSchema),
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const { watch } = form;

  console.log("watch", watch("rating"), watch("review"));

  // const onSubmit = (values: ReviewOrderDetails) => {
  //   console.log("Form Submitted", values);
  //   onOpenChange(false);
  // };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-4 rounded-[15px] text-center font-primary md:w-[752px]">
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
              <p className="text-[18px] font-primary  text-center mt-[20px] font-semibold text-black ">Hi {data.name}</p>
              <h1 className="text-[36px] text-black font-tertiary font-normal">
              Thanks so much!!
              </h1>
            </div>
            <p className="text-[14px] font-primary font-light text-center text-black ">
            You recently reffered one of your Friend to Mypeople
           
            </p>
            <p className="text-[14px] font-primary font-light text-center text-black">
            This encourages us in our efforts to provide you with the best possible service on a daily basis. The future is on the move with you, and much better with you.

            </p>
            <p className="text-[14px] font-primary font-light text-center text-black">
            The Mypeople Team
           
            </p>
            <div className="flex flex-col-reverse md:flex-row gap-[10px] w-full justify-center my-2 text-[14px]">
              <Link
                to="/terms-and-conditions"
                className={cn("w-full h-[41px] font-light text-primary", "md:w-[195px]")}
                type="button"
                onClick={() => onOpenChange(false)}
              >
               Terms and Conditions
              </Link>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ThankyouModal;
