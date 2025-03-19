// import { useTranslation } from "react-i18next";
// import i18n from "@/translations/i18n";
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
  FormMessage,
} from "@/components/ui/form";
import closeIcon from "@/assets/icons/close-fill.svg";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAuth } from "@/context/AuthContext";

const CurrencyModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  // const { t } = useTranslation();
  const { updateUser } = useAuth();
  const scheduledMeetingSchema = z.object({
    selectedCurrency: z.enum(["euro", "usd"], {
      message: "Please select a currency",
    }),
  });

  type ScheduleMeetingType = z.infer<typeof scheduledMeetingSchema>;

  const form = useForm<ScheduleMeetingType>({
    resolver: zodResolver(scheduledMeetingSchema),
    defaultValues: {
      selectedCurrency:
        (localStorage.getItem("currency") as "usd" | "euro" | null) === "usd"
          ? "usd"
          : "euro",
    },
  });
console.log('form.getValues(', form.getValues())
  const onSubmit = (values: ScheduleMeetingType) => {
    // console.log("Language Changed:", values);
    updateUser({ currency: values.selectedCurrency });
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-4 rounded-[15px] text-center font-primary w-full md:w-[752px] ">
        {/* Header */}
        <div className="flex justify-end">
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition"
            onClick={() => onOpenChange(false)}
          >
            <img src={closeIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        <AlertDialogDescription className="text-[14px] text-center">
          <h1 className="md:text-[28px] text-[20px] font-bold text-black my-2">
            Select Your Preferred Currency
          </h1>
          <p className="text-[14px] text-black my-2">
            Choose the currency that best suits your needs for accurate pricing
            and seamless transactions.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="selectedCurrency"
                render={({ field }) => (
                  <FormItem className="flex justify-center">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {[
                            { value: "euro", label: "Euro (€)" },
                            { value: "usd", label: "USD ($)" },
                          ].map((item) => (
                            <SelectItem value={item.value} className="h-[48px]">
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-center my-4">
                <Button
                  className="w-full md:w-[140px] h-[41px] font-light uppercase"
                  type="submit"
                >
                  save
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CurrencyModal;
