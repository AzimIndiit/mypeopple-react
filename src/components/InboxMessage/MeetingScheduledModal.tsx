import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import closeIcon from "@/assets/icons/close-fill.svg";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import videoCall from "@/assets/icons/videoCall.svg";

const MeetingScheduledModal = ({
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
        <div className="flex items-center justify-between">
          <p className="font-semibold uppercase">MEETING</p>
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition"
            onClick={() => onOpenChange(false)}
          >
            <img src={closeIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>
        <AlertDialogDescription className="text-[14px] font-primary text-center">
          <div className="flex flex-col gap-[10px]">
            <div className=" flex flex-col items-center justify-center">
              <img
                src={videoCall}
                alt="avatar"
                className="w-[80px] h-[60px] "
              />
              <h1 className="text-[36px] text-black font-tertiary font-normal">
                Please Wait
              </h1>
            </div>
            <p className="text-[18px] font-primary font-light text-center">
              Hi Tran, your meeting is scheduled with your HRBP <br />
              <span className="font-semibold">
                {data.selectedDate} {data.selectedTimeSlot}
              </span>
              <br />
              The HRBP will contact you soon
              <br />
              Keep an eye on your Inbox
            </p>
            <div className="flex flex-col-reverse md:flex-row gap-[10px] w-full justify-center my-4 text-[14px]">
              <Button
                className={cn("w-full h-[41px] font-light", "md:w-[195px]")}
                type="button"
                onClick={() => onOpenChange(false)}
              >
                Ok
              </Button>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MeetingScheduledModal;
