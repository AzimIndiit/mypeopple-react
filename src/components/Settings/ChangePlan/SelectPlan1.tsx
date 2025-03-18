import { useState } from "react";
import { Input } from "@/components/ui/input";
import check1 from "@/assets/icons/check1.svg";
import check2 from "@/assets/icons/check2.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import infoSolidIcon from "@/assets/icons/info-fill.svg";
import { Plus, Minus } from "lucide-react";
import { z } from "zod";
import PlanPricing from "@/components/PlanPricing1";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const items = [
  "I have Work Council and/or In-House Unions",
  "My topics and needs are more about individual relations",
  "I have a short-term restructuring project",
  "Company in the process of being incorporated",
  "I want to delegate full HR and legal requirements",
  "HRBP should manage my team day-to-day",
  "Foreign investor about to implement in France",
] as const;

const plans = [
  {
    id: "yearly",
    label: "Yearly (52 Weeks)",
    description:
      "Get 10% off. Monthly auto-renewal applies after your annual subscription",
    benefits: [
      "The right duration to work over the long term",
      "Yearly invoicing and payment",
    ],
  },
  {
    id: "flex",
    label: "Flex",
    description: "Cancel anytime. Any month started is due",
    benefits: [
      "Switch to another plan anytime",
      "Monthly invoicing and payment",
    ],
  },
];

const SelectPlanPage = ({
  setCurrentStep,
}: {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}) => {
  //   const { t, i18n } = useTranslation();

  //use memo to create the schema
  const SelectPlanSchema = z.object({
    numberOfEmployees: z
      .number()
      .min(1, { message: "Number of Employees is required" }),
    promoCode: z.string().min(1, { message: "Promo Code is required" }),

    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
    // plan: z.string().min(1, { message: "Plan is required" }),
    // contractDuration: z
    //   .string()
    //   .min(1, { message: "Contract Duration is required" }),
    isConfirm: z.boolean(),
  });

  const form = useForm({
    resolver: zodResolver(SelectPlanSchema),
    defaultValues: {
      isConfirm: false,
      numberOfEmployees: 0,
      items: [],
      plan: "2",
      promoCode: "",
      contractDuration: "yearly",
    },
  });

  const onSubmit = (values: any) => {
    console.log(`Form Submitted`, values);
    setCurrentStep("2");
  };

  return (
    <div className="w-full my-[20px]">
      <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full">
        Hi, John! Nice to meet you. Let’s choose the perfect plan for you
      </p>
      <hr className="my-4" />
      <div className="w-full my-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="flex  flex-col lg:flex-row gap-[10px]">
              <div className="w-full flex justify-between gap-[10px] items-end">
                <FormField
                  control={form.control}
                  name="numberOfEmployees"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Number of Employees</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            min={1}
                            className="w-full"
                            type="number"
                            placeholder={"Enter Number of Employees"}
                            {...field}
                          />

                          <div className="absolute right-[20px] flex gap-[12px] top-1/2 -translate-y-1/2">
                            <div
                              className=" p-[2px]  rounded-[7px] cursor-pointer bg-black  "
                              onClick={() =>
                                form.setValue(
                                  "numberOfEmployees",
                                  Number(field.value) + 1
                                )
                              }
                            >
                              <Plus className="w-[25px] h-[24px] text-white" />
                            </div>
                            <div
                              className=" p-[2px]  rounded-[7px] cursor-pointer bg-black  "
                              onClick={() =>
                                form.setValue(
                                  "numberOfEmployees",
                                  Math.max(0, Number(field.value) - 1)
                                )
                              }
                            >
                              <Minus className="w-[25px] h-[24px] text-white" />
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full flex justify-between gap-[10px] items-end">
                <FormField
                  control={form.control}
                  name="promoCode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Have a Promo Code?{" "}
                        <FormLabel className=" text-[14px] font-primary font-normal">
                          <img
                            src={infoSolidIcon}
                            className="w-[24px] h-[24px]"
                          />
                        </FormLabel>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="w-full"
                            type="string"
                            placeholder={"KHJGJKYHG78687865"}
                            {...field}
                          />

                          <div className="absolute right-[20px] flex gap-[12px] top-1/2 -translate-y-1/2">
                            <div
                              className=" p-[2px]  rounded-[7px] cursor-pointer bg-black  "
                              onClick={() =>
                                form.setValue("promoCode", field.value + "1")
                              }
                            >
                              <Plus className="w-[25px] h-[24px] text-white" />
                            </div>
                            <div
                              className=" p-[2px]  rounded-[7px] cursor-pointer bg-black  "
                              onClick={() =>
                                form.setValue(
                                  "promoCode",
                                  field.value.slice(0, -1)
                                )
                              }
                            >
                              <Minus className="w-[25px] h-[24px] text-white" />
                            </div>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>You can choose multiple options</FormLabel>
                  </div>
                  <div className="flex flex-wrap gap-[10px]">
                    {items.map((item) => (
                      <FormItem key={item}>
                        <FormControl>
                          <div
                            className={cn(
                              "flex h-[44px] lg:h-[46px] flex-row items-center space-x-3 border border-[white] bg-[#40404014] rounded-[120px] px-[15px] py-[10px] max-w-fit text-[#596569]",
                              field.value?.includes(item) &&
                                "bg-[#FC400614] border-primary text-primary"
                            )}
                            onClick={() => {
                              field.onChange(
                                field.value?.includes(item)
                                  ? field.value?.filter(
                                      (value) => value !== item
                                    )
                                  : [...(field.value || []), item]
                              );
                            }}
                          >
                            <FormLabel className=" text-[14px] font-primary font-normal w-full  ">
                              {item}
                            </FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PlanPricing
              onSubmit={(value) => {
                form.setValue("plan", value.planId);
                // onSubmit(form.getValues());
              }}
            />
            <div className="flex justify-center my-4">
              <p className="underline text-primary font-primary text-[14px] font-medium">
                Compare Services
              </p>
            </div>
            <div className=" my-4">
              <h2 className="text-[18px] font-semibold font-primary mb-4">
                Choose Contract Duration
              </h2>
              <p className="text-[13px] font-primary font-normal text-[#848199]">
                Let’s choose the right duration for you
              </p>
            </div>
            <div>
              <FormField
                control={form.control}
                name="contractDuration"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col md:flex-row gap-4"
                      >
                        {plans.map((plan) => {
                          const isActive = field.value === plan.id;

                          return (
                            <div
                              key={plan.id}
                              className={cn(
                                "relative rounded-lg overflow-hidden border w-full md:w-1/2 transition-all",
                                isActive
                                  ? "bg-black text-white "
                                  : "bg-gray-100 text-black border-transparent"
                              )}
                            >
                              <label
                                htmlFor={plan.id}
                                className="flex flex-col h-full p-6 cursor-pointer"
                              >
                                <div className="flex items-center mb-4">
                                  <RadioGroupItem
                                    value={plan.id}
                                    id={plan.id}
                                    className="border-gray-400 text-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
                                  />
                                  <span
                                    className={cn(
                                      "ml-3 text-xl font-medium",
                                      isActive ? "text-primary" : "text-black"
                                    )}
                                  >
                                    {plan.label}
                                  </span>
                                </div>

                                <div className="mt-2 border-t border-gray-300 pt-4">
                                  <p
                                    className={cn(
                                      "text-lg mb-6",
                                      isActive ? "text-white" : "text-gray-600"
                                    )}
                                  >
                                    {plan.description}
                                  </p>

                                  <div className="space-y-3">
                                    {plan.benefits.map((benefit, index) => (
                                      <div
                                        key={index}
                                        className="flex items-star gap-2"
                                      >
                                        <img
                                          src={isActive ? check2 : check1}
                                          className="w-[20px] h-[20px]"
                                        />
                                        <span
                                          className={cn(
                                            isActive
                                              ? "text-white"
                                              : "text-black"
                                          )}
                                        >
                                          {benefit}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className=" my-4">
              <h2 className="text-[18px] font-semibold font-primary mb-4">
                General Terms of Service Acknowledgement
              </h2>
              <p className="text-[13px] font-primary font-normal text-[#848199]">
                To complete your Membership, you need to accept our{" "}
                <span className="text-[#0280F9] italic underline">
                  {" "}
                  General Terms of Service
                </span>{" "}
                according your Membership Plan:
              </p>
            </div>
            <div>
              <div className="w-full max-w-4xl mx-auto my-4">
                <div className="border-2 border-[#A3A3A3] border-dashed rounded-md p-5 bg-[#00000008]">
                  <div className="text-gray-600 leading-relaxed text-sm">
                    <p className="font-medium text-base mb-2">GTS - Mypeople</p>
                    <p className="mb-2">Effective date: January 31, 2025</p>
                    <p className="mb-2">
                      Mypeople (hereinafter referred to as "Mypeople"),
                      domiciled at 72, rue Pierre Paul Riquet Toulouse (France)
                      and registered with the Toulouse Trade and Companies
                      Register under number 845 027 452, operates websites
                      accessible at https://mypeople.fr and
                      https://fr.mypeople.fr (indifferently referred to as the
                      "Site" or "The sites") which provides Companies and HRBP
                      with a professional networking services.
                    </p>
                    <p className="mb-2">
                      These general terms and conditions of sale and use
                      (hereinafter referred to as the "
                      <Link
                        to="/terms"
                        className="text-blue-500 font-medium italic"
                      >
                        General Terms of Service
                      </Link>
                      " or "GTS") govern the conditions of subscription and use
                      of the Platform by customers, i.e. Users and HBRPs. The
                      GTSU also include the Quality Charter accessible on the
                      Platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <FormField
              control={form.control}
              name="isConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-start gap-[10px]">
                      <Checkbox
                        id="isConfirm"
                        className="w-[20px] h-[20px] border border-[#596569] rounded-[4px]"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label
                        htmlFor="isConfirm"
                        className="text-[14px] font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I confirm that I have read, understood and accept the
                        General Terms and Conditions of Sale and Use, and that I
                        am authorized to represent my company if I am
                        registering as a legal entity.
                      </label>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <hr className="my-4" />
            <div className="flex justify-end">
            <Button className="w-full md:w-[376px]" type="submit">
              Confirm and go to Extras
            </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SelectPlanPage;
