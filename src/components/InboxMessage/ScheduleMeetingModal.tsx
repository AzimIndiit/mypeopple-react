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
import {
  generateTimeSlots,
  getCurrentWeekTimestamps,
} from "@/utils/helper";
import { cn } from "@/lib/utils";



const ScheduleMeetingModal = ({
  isOpen,
  onOpenChange,
  onContinue,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onContinue: (value: any) => void;
}) => {
  const dates = getCurrentWeekTimestamps() || [];
const timeSlots = generateTimeSlots(12, 16) || []
  // Define a Zod schema for validation
  const scheduledMeetingSchema = z.object({
    selectedDate: z.string().min(1, { message: "Date is required" }),
    selectedTimeSlot: z.string().min(1, { message: "Time Slot is required" }),
  });

  type ScheduleMeetingType = z.infer<typeof scheduledMeetingSchema>;

  // Set up the form with default values
  const form = useForm<ScheduleMeetingType>({
    resolver: zodResolver(scheduledMeetingSchema),
    defaultValues: {
      selectedDate: "",
      selectedTimeSlot: "",
    },
  });

  // Destructure watch and handleSubmit from the form
  const {  handleSubmit } = form;

  const onSubmit = (values: ScheduleMeetingType) => {
    console.log("Form Submitted", values);
    onContinue(values);
    // You can add further submit logic here
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange} >
      <AlertDialogContent className="p-4 rounded-[15px] text-center font-primary w-full md:!max-w-[752px]">
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

        <AlertDialogDescription className="text-[14px] font-primary text-start">
          <p className="text-[14px] font-primary bg-[rgba(252,64,6,0.08)] rounded-[10px] p-[10px] mb-[10px] text-black">
            Let’s Arrange a meeting with your HRBP
          </p>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              {dates.length > 0 && (
                <FormField
                  control={form.control}
                  name="selectedDate"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Select a date</FormLabel>
                        <FormControl>
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
                         {dates.map((date: any) => (
                            <div
                              key={date}
                              className={cn("flex items-center justify-center cursor-pointer w-full md:w-[170px] h-[40px] rounded-[10px] p-[10px]",date===field.value?"bg-black text-white":" text-[#596569] bg-gray-100 ")}
                              onClick={() => {
                                form.setValue("selectedDate", date);
                              }}
                            >
                              <p>{date}</p>
                            </div>
                          ))}
                         </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}

              {timeSlots.length > 0 && (
                <FormField
                  control={form.control}
                  name="selectedTimeSlot"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Select a time slot</FormLabel>
                        <FormControl>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 w-full">
                          {timeSlots.map((slot: any) => (
                            <div
                              key={slot}
                              className={cn("flex items-center justify-center cursor-pointer w-full md:w-[170px] h-[40px] rounded-[10px] p-[10px]",slot===field.value?"bg-black text-white":" text-[#596569] bg-gray-100 ")}
                              onClick={() => {
                                form.setValue("selectedTimeSlot", slot);
                              }}
                            >
                              <p>{slot}</p>
                            </div>
                          ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
              <div className="flex flex-col-reverse md:flex-row gap-[10px] w-full justify-center my-4 text-[14px]">
                <Button
                  className="w-full md:w-[140px] bg-[#C7C7C7] text-black h-[41px] font-light"
                  type="button"
                  onClick={() => onOpenChange(false)}
                >
                  Cancel
                </Button>
                <Button
                  className={cn("w-full h-[41px] font-light", "md:w-[140px]")}
                  type="submit"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ScheduleMeetingModal;
