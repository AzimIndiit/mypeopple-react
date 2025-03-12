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

const PopupEstimateBillModal = ({
  isOpen,
  data,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  data: any;
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFocused1, setIsFocused1] = useState<boolean>(false);
  // Define a Zod schema for validation
  const EstimateBillDetailsSchema = z.object({
    additionalTranslation: z.number().min(1, { message: "Value is required" }),
    hrbpDiscount: z.number().min(1, { message: "Value is required" }),
    handlingCharges: z.number().min(1, { message: "Value is required" }),
  });

  type EstimateBillDetails = z.infer<typeof EstimateBillDetailsSchema>;

  // Set up the form with default values
  const form = useForm<EstimateBillDetails>({
    resolver: zodResolver(EstimateBillDetailsSchema),
    defaultValues: {
      additionalTranslation: 0 ,
      hrbpDiscount: 0 ,
      handlingCharges: 5 ,
    },
  });

  // Destructure watch and handleSubmit from the form
  const { watch, handleSubmit } = form;
  // Watch the input fields for real-time changes
  const additionalTranslationValue = watch("additionalTranslation");
  const hrbpDiscountValue = watch("hrbpDiscount");
  const handlingChargesValue = watch("handlingCharges");

  // Compute the totals converting string values to numbers, defaulting to 0 if empty
  const totalBeforeDiscount = Number(additionalTranslationValue) || 0;
  const totalAfterDiscount =
    totalBeforeDiscount -
    (totalBeforeDiscount * (Number(hrbpDiscountValue) || 0)) / 100;

    const totalAfterHandlingCharges = totalAfterDiscount + (totalAfterDiscount * (Number(handlingChargesValue) || 0)) / 100;

      const onSubmit = (values: EstimateBillDetails) => {
    console.log("Form Submitted", values);
    // You can add further submit logic here
  };



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
          PAYMENT INVOICE
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
                                    disabled={true}
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
                      Subscription Discount (Professional)
                      </p>
                      <div className="w-full px-[10px]">
                        <FormField
                          control={form.control}
                          name="hrbpDiscount"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  disabled={true}
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
                    <div className="flex gap-[10px] w-full">
                      <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex items-center text-[#454B54]">
                      Handling Charges
                      </p>
                      <div className="w-full px-[10px]">
                        <FormField
                          control={form.control}
                          name="handlingCharges"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  disabled={true}
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  className="h-[40px] mt-[4px] w-full"
                                  {...field}
                                  value={
                                    
                                      `${Number(field.value)} %`
                                        
                                  }
                                 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <hr className="w-full my-4" />

                    {/* Totals Display */}
                    <div className="flex gap-[10px] w-full">
                      <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex items-center text-[#454B54]">
                      Subtotal
                      </p>
                      <p className="text-[16px] text-[#454B54] font-primary font-bold w-full text-left h-[48px] py-[14px] px-[16px] flex items-center">
                        {formatCurrency(Number(totalAfterHandlingCharges))}
                      </p>
                    </div>
                    
                  </div>
                  </>
                )}


   <div className="my-4  w-full">
    <p className="text-[14px] text-[#454B54] text-left font-primary font-semibold">
    Billing Address
    </p>
  
   </div>


                {/* Action Buttons */}
                {data && (
                  <div className="flex flex-col md:flex-row gap-[10px] w-full justify-center my-4 text-[14px]">
                    <Button
                      className="w-full md:w-[140px] bg-[#C7C7C7] text-black h-[41px] font-light"
                      type="button"
                      onClick={() => onOpenChange(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className={cn("w-full h-[41px] font-light",  "md:w-[140px]")}
                     type="submit"

                    >
                      Proceed
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

export default PopupEstimateBillModal;
