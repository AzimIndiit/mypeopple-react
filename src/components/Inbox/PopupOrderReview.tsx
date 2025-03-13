import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import closeIcon from "@/assets/icons/close-fill.svg";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import StarRating from "../StarRating";
import { Textarea } from "../ui/textarea";

const PopupOrderReview = ({
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

  const { watch, handleSubmit } = form;

  console.log("watch", watch("rating"), watch("review"));

  const onSubmit = (values: ReviewOrderDetails) => {
    console.log("Form Submitted", values);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-4 rounded-[15px] text-center font-primary md:w-[752px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="font-semibold">Rate the service</p>
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition"
            onClick={() => onOpenChange(false)}
          >
            <img src={closeIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        <AlertDialogDescription className="text-[14px] font-primary text-center">
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-[36px] text-black font-tertiary font-normal">
              How was it?
            </h1>
            <p className="text-[18px] font-primary font-light">
              Hi Tran, thanks for your order{" "}
              <span className="font-semibold">{data.orderNumber}</span>
              Your request was fulfilled by the HRBP. Please share your feedback.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4 text-left">
              <div className="flex justify-center my-4">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                  <FormItem>
                      <StarRating field={field} />
                      <FormMessage />
                  </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Justify your rating</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="Enter text here" className="h-[150px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col-reverse md:flex-row gap-[10px] w-full justify-center my-4 text-[14px]">
                <Button className={cn("w-full h-[41px] font-light", "md:w-[195px]")} type="submit">
                  SUBMIT FEEDBACK
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopupOrderReview;
