import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import primaryCard from "@/assets/icons/primary-card.svg";
import paypalIcon from "@/assets/icons/paypal.svg";
import sepaIcon from "@/assets/icons/sepa.svg";
import { format } from "date-fns";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
const paymentSchema1 = z.object({
  paymentMethod: z.enum(["credit_debit", "paypal", "sepa"], {
    required_error: "Please select a payment method",
  }),
  cardNumber: z
    .string()
    .min(19, "Card number must be 16 digits")
    .max(19, "Card number must be 19 digits")
    .optional(),
  cardHolderName: z.string().min(1, "Card Holder Name is required").optional(),
  expiryDate: z.date({ required_error: "Expiry date is required" }),
  cvv: z
    .string()
    .min(3, "CVV must be 3 digits")
    .max(4, "CVV must be 4 digits")
    .optional(),
  isSecure: z.boolean().optional(),
});

const paymentSchema2 = z.object({
  paymentMethod: z.enum(["credit_debit", "paypal", "sepa"], {
    required_error: "Please select a payment method",
  }),
  paypalEmail: z.string().email("Invalid email").optional(),
});

const paymentSchema3 = z.object({
  paymentMethod: z.enum(["credit_debit", "paypal", "sepa"], {
    required_error: "Please select a payment method",
  }),
  iban: z.string().min(15, "IBAN must be at least 15 characters").optional(),
});

// Function to get the schema dynamically
const getCurrentSchema = (
  paymentMethod: "credit_debit" | "paypal" | "sepa"
) => {
  if (paymentMethod === "credit_debit") return paymentSchema1;
  if (paymentMethod === "paypal") return paymentSchema2;
  if (paymentMethod === "sepa") return paymentSchema3;
  return paymentSchema1;
};

// Function to dynamically set default values
const getDefaultValues = (
  paymentMethod: "credit_debit" | "paypal" | "sepa"
) => {
  const defaults: Record<string, any> = { paymentMethod };

  if (paymentMethod === "credit_debit") {
    Object.assign(defaults, {
      cardNumber: "",
      cardHolderName: "",
      expiryDate: undefined,
      cvv: "",
      isSecure: false,
    });
  } else if (paymentMethod === "paypal") {
    Object.assign(defaults, { paypalEmail: "" });
  } else if (paymentMethod === "sepa") {
    Object.assign(defaults, { iban: "" });
  }

  return defaults;
};

const Step4 = ({
  setCurrentStep,
  setStepData,
}: // stepData,
{
  currentStep: string;
  setCurrentStep: (step: string) => void;
  setStepData: (data: any) => void;
  stepData: any;
}) => {
  const [currentSchema, setCurrentSchema] = useState<any>(paymentSchema1);

  // Initialize form
  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: getDefaultValues("credit_debit"),
    mode: "onChange",
  });

  const selectedPaymentMethod = form.watch("paymentMethod");

  useEffect(() => {
    if (selectedPaymentMethod) {
      const newSchema = getCurrentSchema(selectedPaymentMethod);
      setCurrentSchema(newSchema);

      // Reset form with new default values & update resolver
      form.reset(getDefaultValues(selectedPaymentMethod), {
        keepErrors: false,
        keepDirty: false,
      });
    }
  }, [selectedPaymentMethod]);

  const onSubmit = (values: any) => {
    console.log(`Form Submitted`, values);
    setCurrentStep("5");
    setStepData((prev: any) => ({
      ...prev,
      S: values,
    }));
  };

  return (
    <div className="w-full my-5">
      <p className="text-lg lg:text-xl font-semibold mb-4">
        Select a payment method
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    {[
                      {
                        label: "Credit/Debit Card",
                        value: "credit_debit",
                        icon: primaryCard,
                      },
                      { label: "PayPal", value: "paypal", icon: paypalIcon },
                      { label: "SEPA", value: "sepa", icon: sepaIcon },
                    ].map((option) => {
                      return (
                        <div key={option.value} className="mb-2 ">
                          <label className="flex items-center text-sm font-light space-x-2 cursor-pointer h-14 p-4 rounded-md bg-black text-white">
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                            />
                            <span className="flex items-center gap-2">
                              <img
                                src={option.icon}
                                className="w-5 h-5"
                                alt={option.label}
                              />
                              {option.label}
                            </span>
                          </label>

                          {option.value === "credit_debit" && (
                            <div
                              className="space-y-6 mt-4"
                              style={{
                                display:
                                  selectedPaymentMethod === "credit_debit"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <FormField
                                control={form.control}
                                name="cardNumber"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Card Number</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="text"
                                        placeholder="1111 1111 1111 1111"
                                        maxLength={19}
                                        inputMode="numeric"
                                        {...field}
                                        value={field.value
                                          ?.replace(/\D/g, "")
                                          .replace(/(\d{4})/g, "$1 ")
                                          .trim()}
                                        onChange={(e) => {
                                          let value = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 16);
                                          field.onChange(
                                            value
                                              .replace(/(\d{4})/g, "$1 ")
                                              .trim()
                                          );
                                        }}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="cardHolderName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Card Holder Name</FormLabel>
                                    <FormControl>
                                      <Input
                                        placeholder="John Doe"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <div className="flex flex-col lg:flex-row gap-4 w-full">
                                <div className="w-full">
                                  <FormField
                                    control={form.control}
                                    name="expiryDate"
                                    render={({ field }) => (
                                      <FormItem className="w-full">
                                        <FormLabel>Valid Until</FormLabel>
                                        <Popover>
                                          <PopoverTrigger asChild>
                                            <FormControl className="w-full text-left">
                                              <Button
                                                variant="outline"
                                                className="h-16 bg-[rgb(64,64,64,0.08)] text-left  justify-start w-full"
                                              >
                                                {field.value
                                                  ? format(field.value, "MM/yy")
                                                  : "MM/YY"}
                                              </Button>
                                            </FormControl>
                                          </PopoverTrigger>
                                          <PopoverContent
                                            align="start"
                                            className="w-auto"
                                          >
                                            <Calendar
                                              onSelect={(date) => {
                                                if (date) {
                                                  // Ensure the selected date is always the first of the month
                                                  const firstOfMonth = new Date(
                                                    date.getFullYear(),
                                                    date.getMonth(),
                                                    1
                                                  );
                                                  field.onChange(firstOfMonth);
                                                }
                                              }}
                                              disabled={(date) => {
                                                const today = new Date();
                                                return (
                                                  date <
                                                  new Date(
                                                    today.getFullYear(),
                                                    today.getMonth(),
                                                    1
                                                  ) // Disable past months
                                                );
                                              }}
                                              mode="single"
                                              selected={field.value}
                                              // onSelect={field.onChange}
                                              // disabled={(date) => date < new Date()}
                                              initialFocus
                                            />
                                          </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>

                                <div className="w-full">
                                  <FormField
                                    control={form.control}
                                    name="cvv"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>CVV</FormLabel>
                                        <FormControl>
                                          <Input
                                            type="password"
                                            placeholder="***"
                                            {...field}
                                          />
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              </div>

                              <FormField
                                control={form.control}
                                name="isSecure"
                                render={({ field }) => (
                                  <FormItem className="flex items-center gap-2">
                                    <Checkbox
                                      id="isSecure"
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                    <label
                                      htmlFor="isSecure"
                                      className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                      Secure card for future payments
                                    </label>
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}
                          {option.value === "paypal" && (
                            <div
                              className="mt-4"
                              style={{
                                display:
                                  selectedPaymentMethod === "paypal"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <div className="w-full">
                                <FormField
                                  control={form.control}
                                  name="paypalEmail"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Paypal Account</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="w-full"
                                          placeholder={""}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          )}
                          {option.value === "sepa" && (
                            <div
                              className="mt-4"
                              style={{
                                display:
                                  selectedPaymentMethod === "sepa"
                                    ? "block"
                                    : "none",
                              }}
                            >
                              <div className="w-full">
                                <FormField
                                  control={form.control}
                                  name="iban"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>IBAN Account Number</FormLabel>
                                      <FormControl>
                                        <Input
                                          className="w-full"
                                          placeholder={""}
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4">
            <Button
              variant={"outline"}
              className="w-full md:w-[222px] text-primary hover:bg-white border-primary"
              type="button"
              onClick={() => {
                const formValues = form.getValues();
                setStepData((prev: any) => ({
                  ...prev,
                  step4: formValues,
                }));
              }}
            >
              Save as Draft
            </Button>
            <Button className="w-full md:w-[222px] " type="submit">
              Pay Now
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Step4;
