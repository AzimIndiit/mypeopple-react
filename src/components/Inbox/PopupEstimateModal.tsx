import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
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
import { formatCurrency } from "@/utils/helper";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import PopupEstimateBillModal from "./PopupEstimateBillModal";

const PopupEstimateModal = ({
  isOpen,
  data,
  onOpenChange,
  estimateStatus,
  onContinue,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  estimateStatus: string;
  data: any;
  onContinue: (value: any) => void;
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFocused1, setIsFocused1] = useState<boolean>(false);
  // Define a Zod schema for validation
  const EstimateDetailsSchema = z.object({
    additionalTranslation: z.number().min(1, { message: "Value is required" }),
    hrbpDiscount: z.number().min(1, { message: "Value is required" }),
  });

  type EstimateDetails = z.infer<typeof EstimateDetailsSchema>;

  // Set up the form with default values
  const form = useForm<EstimateDetails>({
    resolver: zodResolver(EstimateDetailsSchema),
    defaultValues: {
      additionalTranslation: 0 ,
      hrbpDiscount: 0 ,
    },
  });

  // Destructure watch and handleSubmit from the form
  const { watch, handleSubmit } = form;
  // Watch the input fields for real-time changes
  const additionalTranslationValue = watch("additionalTranslation");
  const hrbpDiscountValue = watch("hrbpDiscount");

  // Compute the totals converting string values to numbers, defaulting to 0 if empty
  const totalBeforeDiscount = Number(additionalTranslationValue) || 0;
  const totalAfterDiscount =
    totalBeforeDiscount -
    (totalBeforeDiscount * (Number(hrbpDiscountValue) || 0)) / 100;

  const onSubmit = (values: EstimateDetails) => {
      onContinue({...data,...values})
      onOpenChange(false)

    
    // You can add further submit logic here
  };

  const isEdit = estimateStatus === "edit";


  useEffect(() => {
     if(data){
      form.setValue("additionalTranslation", data?.additionalTranslation);
      form.setValue("hrbpDiscount", data?.hrbpDiscount);
     }
  }, [data])
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange} >
      <AlertDialogContent className="p-4 rounded-[15px] text-center font-primary   md:w-[752px] ">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="font-semibold uppercase">
            {isEdit? "Edit Estimate" : "Validate Estimate"}
          </p>
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition"
            onClick={() => onOpenChange(false)}
          >
            <img src={closeIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        <AlertDialogDescription className="text-[14px] font-primary text-center">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-4"
            >
              <div className="">
                {data && (
                  <>
                   <p className="text-[14px] font-primary bg-[rgba(252,64,6,0.08)] rounded-[10px] p-[10px] mb-[10px]">
                    Are you sure you want to validate the estimate? Once validated, changes will no longer be possible.
                        </p>
                  <div className="rounded-[15px] bg-[#F8F8F8] border border-[#E3E5E8]">
                    {/* Header row for details */}
                   
                    <div className="flex gap-[10px] w-full bg-black text-white rounded-t-[15px]">
                      <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex items-center">
                        Internal Regulation
                      </p>
                      <p className="text-[14px] font-primary w-full text-left h-[48px] py-[14px] px-[16px] flex items-center">
                        Included in the package
                      </p>
                    </div>

                    {/* Additional Translation Input */}
                    <div className="flex gap-[10px] w-full">
                      <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex items-center text-[#454B54]">
                        Additional: Translation
                      </p>
                      <div className="w-full px-[10px]">
                        <FormField
                          control={form.control}
                          name="additionalTranslation"
                          render={({ field }) => {
                         
                            return (
                              <FormItem>
                                <FormControl>
                               
                                  <Input
                                    disabled={!isEdit}
                                    type={isFocused1 ? "number" : "text"}
                                    
                                    onFocus={() => {
                                      setIsFocused1(true);
                                    }}

                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    className="h-[40px] mt-[4px] w-full"
                                    {...field}

                                    onBlur={() => {
                                      setIsFocused1(false);
                                    }}
                                    value={isFocused1 ? field.value : formatCurrency(Number(field.value))}

                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            );
                          }}
                        />
                      </div>
                    </div>

                    {/* HRBP Discount Input */}
                    <div className="flex gap-[10px] w-full">
                      <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex items-center text-[#454B54]">
                        HRBP Discount
                      </p>
                      <div className="w-full px-[10px]">
                        <FormField
                          control={form.control}
                          name="hrbpDiscount"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  disabled={!isEdit}
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  className="h-[40px] mt-[4px] w-full"
                                  {...field}
                                  value={
                                    isFocused
                                      ? field.value
                                      : `${Number(field.value)} %`
                                        
                                  }
                                  onFocus={() => {
                                    setIsFocused(true);
                                  }}
                                  onBlur={() => {
                                    setIsFocused(false);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <hr className="w-full" />

                    {/* Totals Display */}
                    <div className="flex gap-[10px] w-full">
                      <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex items-center text-[#454B54]">
                        TOTAL BEFORE DISCOUNT
                      </p>
                      <p className="text-[16px] text-[#454B54] font-primary font-bold w-full text-left h-[48px] py-[14px] px-[16px] flex items-center">
                        {formatCurrency(Number(totalBeforeDiscount))}
                      </p>
                    </div>
                    <div className="flex gap-[10px] w-full">
                      <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex items-center text-[#454B54]">
                        TOTAL AFTER DISCOUNT
                      </p>
                      <p className="text-[16px] text-[#454B54] font-primary font-bold w-full text-left h-[48px] py-[14px] px-[16px] flex items-center">
                        {formatCurrency(Number(totalAfterDiscount))}
                      </p>
                    </div>
                  </div>
                  </>
                )}

                {/* Action Buttons */}
                {data && (
                  <div className="flex flex-col md:flex-row gap-[10px] w-full justify-center my-4 text-[14px]">
                    <Button
                      className="w-full md:w-[140px] bg-[#C7C7C7] text-black h-[41px] font-light"
                      type="button"
                      onClick={() => onOpenChange(false)}
                    >
                     {isEdit
                        ? "Cancel"
                        : "Go Back"}
                    </Button>
                    <Button
                      className={cn("w-full h-[41px] font-light", isEdit ?  "md:w-fit " : "md:w-[140px]")}
                      type="button"
                      onClick={() => {
                        const values = form.getValues()

                        onSubmit({additionalTranslation:Number(values.additionalTranslation), hrbpDiscount:Number(values.hrbpDiscount)})
                      }}
                     

                    >
                      {isEdit
                        ? "Submit New Estimate"
                        : "Confirm"}
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </Form>

         
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PopupEstimateModal;
