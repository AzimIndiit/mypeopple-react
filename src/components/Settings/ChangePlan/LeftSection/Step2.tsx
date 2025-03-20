import { useState } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import infoSolidIcon from "@/assets/icons/info-fill.svg";
import { Plus, Minus } from "lucide-react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import ExtraPlanPricing from "@/components/ExtraPlanPricing";
const items = [
  "Payroll Outsourcing",
  "Payroll Software implementation",
  "On site Management",
  "Retirement Review",
  "Bilingual Services",
  "Process Com Review",
  "Tailored HR communication",
  "HR / Legal Audit",
] as const;


const plans = [
  {
    id: "Payroll Services",
    label: "Payroll Services",
    description:
      "Efficient payroll processing, ensuring compliance with tax laws, accurate salary disbursement, and benefits administration.",
    amount: "€20",
    duration: ["pay slip"],
  },
  {
    id: "HIRS",
    label: "HIRS",
    description:
      "A centralized system for managing employee records, tracking performance, handling benefits, and streamlining HR operations.",
    amount: "€20",
    duration: ["month", "employee"],
  },
  {
    id: "Bilingual HRBP",
    label: "Bilingual HRBP",
    description:
      "HR support available in multiple languages to assist diverse and international teams, ensuring smooth communication and policy adherence.",
    amount: "€20",
    duration: ["month"],
  },
  {
    id: "Communication Pack",
    label: "Communication Pack",
    description:
      "A structured set of communication tools, including templates, newsletters, and HR guidelines, to ensure clear and effective messaging within the organization.",
    amount: "€1930",
    duration: ["pack"],
  },
  {
    id: "AI Short",
    label: "AI Short",
    description:
      "AI-generated video content for HR training, employee engagement, and policy explanations, making HR communication more interactive and accessible.",
    amount: "€480",
    duration: ["short"],
    selected: true,
  },
  {
    id: "Due Diligence",
    label: "Due Diligence",
    description:
      "Comprehensive HR audits to assess compliance, company policies, employee records, and risk factors in mergers, acquisitions, or internal evaluations.",
    amount: "€480",
    duration: ["short"],
    selected: true,
  },
  {
    id: "On Site Management",
    label: "On Site Management",
    description:
      "Dedicated HR professionals deployed on-site to oversee workforce management, conflict resolution, and daily HR operations, ensuring smooth business functioning.",
    amount: "€520",
    duration: ["day on site"],
    selected: true,
  },
  {
    id: "Retirement Review",
    label: "Retirement Review",
    description:
      "This process helps identify potential gaps, optimize benefits, and make necessary adjustments for a worry-free post-career life.",
    amount: "€2500",
    duration: ["review"],
    selected: true,
  },
];

const Step2 = ({
  setCurrentStep,
  setStepData,
  stepData,
}: {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  setStepData: (data: any) => void;
  stepData: any;
}) => {
  //   const { t, i18n } = useTranslation();
  const [durationType, setDurationType] = useState("days");
  const [workingDaysType, setWorkingDaysType] = useState("days");
  //use memo to create the schema
  const Step2Schema = z.object({
    duration: z.string().min(1, { message: "Duration is required" }),
    workingDays: z.string().min(1, { message: "Working Days is required" }),
    assignmentDate: z.date({
      required_error: "Assignment Date is required",
    }),
    promoCode: z.string().min(1, { message: "Promo Code is required" }),
    assignmentType: z
      .string()
      .min(1, { message: "Assignment Type is required" }),

    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }).optional(),
    plan: z
      .object({
        planId: z.number().min(1, { message: "Plan is required" }),
        price: z.string().min(1, { message: "Price is required" }),
        title: z.string().min(1, { message: "Title is required" }),
        duration: z.string().min(1, { message: "Duration is required" }),
      })
      .optional(),
    contractDuration: z
      .array(
        z.object({
          id: z.string(),
          quantity: z.number(),
          label: z.string(),
          description: z.string(),
          amount: z.string(),
          duration: z.array(z.string()),
          selected: z.boolean().optional(),
        })
      )
      .default([]),
  });

  const form = useForm({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      duration: stepData?.duration || "23",
      workingDays: stepData?.workingDays || "12",
      assignmentDate: stepData?.assignmentDate || new Date(),
      promoCode: stepData?.promoCode || "KHJGJKYHG78687865",
      assignmentType: stepData?.assignmentType || "Settle in France",
      items: stepData?.items || [
        "Payroll Outsourcing",
        "Bilingual Services",
        "Tailored HR communication"
    ],
      plan: stepData?.plan || {
        "planId": 1,
        "price": "3620",
        "title": "Invest in France",
        "duration": "month"
    },
      contractDuration: stepData?.contractDuration || [
        {
            "id": "Payroll Services",
            "quantity": 1,
            "label": "Payroll Services",
            "description": "Efficient payroll processing, ensuring compliance with tax laws, accurate salary disbursement, and benefits administration.",
            "amount": "€20",
            "duration": [
                "pay slip"
            ]
        },
        {
            "id": "HIRS",
            "quantity": 1,
            "label": "HIRS",
            "description": "A centralized system for managing employee records, tracking performance, handling benefits, and streamlining HR operations.",
            "amount": "€20",
            "duration": [
                "month",
                "employee"
            ]
        },
        {
            "id": "AI Short",
            "quantity": 1,
            "label": "AI Short",
            "description": "AI-generated video content for HR training, employee engagement, and policy explanations, making HR communication more interactive and accessible.",
            "amount": "€480",
            "duration": [
                "short"
            ],
            "selected": true
        }
    ],
    },
  });

  const onSubmit = (values: any) => {
    console.log(`Form Submitted`, values);
    setCurrentStep("3");
    // setStepData({ step2: values });
    setStepData((prev:any) => ({
      ...prev,
      step2: values,
    }));
  };
  const watchPlan = form.watch("contractDuration");
  console.log("contractDuration", watchPlan);
  return (
    <div className="w-full my-[20px]">
      <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full">
        Don't know yet ? You can always order extra's after subscription is
        completed
      </p>
      <hr className="my-4" />
      <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full">
        Tell us a little bit more about your additional needs
      </p>
      <div className="w-full my-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem>
                  {/* <div className="mb-4">
                    <FormLabel>You can choose multiple options</FormLabel>
                  </div> */}
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
            <div>
              <FormField
                control={form.control}
                name="contractDuration"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormControl>
                      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {plans.map((plan) => {
                          const isActive = field.value.some(
                            (item) => item.id === plan.id
                          );

                          return (
                            <div
                              key={plan.id}
                              className={cn(
                                "relative bg-[#F0F0F0] rounded-[10px] overflow-hidden border w-full  transition-all h-fit",
                                isActive
                                  ? "bg-white"
                                  : "text-black border-transparent"
                              )}
                            >
                              <label
                                htmlFor={plan.id}
                                className="flex flex-col h-full p-6 cursor-pointer"
                              >
                                <div className="flex items-center mb-4">
                                  <div className="relative">
                                    <input
                                      type="checkbox"
                                      id={plan.id}
                                      checked={isActive}
                                      onChange={() => {
                                        if (isActive) {
                                          // Remove item
                                          field.onChange(
                                            field.value.filter(
                                              (item) => item.id !== plan.id
                                            )
                                          );
                                        } else {
                                          // Add item
                                          field.onChange([
                                            ...field.value,
                                            { ...plan, quantity: 1 },
                                          ]);
                                        }
                                      }}
                                      className="hidden"
                                    />
                                    <div
                                      className={cn(
                                        "w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center",
                                        isActive
                                          ? "bg-primary border-primar  "
                                          : "bg-white"
                                      )}
                                    >
                                      {isActive && (
                                        <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center  ">
                                          <div className="w-3 h-3 rounded-full bg-primary " />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <span
                                    className={cn(
                                      "ml-3 text-[16px] font-medium",
                                      isActive ? "text-primary" : "text-black"
                                    )}
                                  >
                                    {plan.label}
                                  </span>
                                </div>

                                <div className=" border-t border-gray-300 pt-4">
                                  <p
                                    className={cn(
                                      "text-[14px] ",
                                      "text-[#596569]"
                                    )}
                                  >
                                    {plan.description}
                                  </p>
                                  <p
                                    className={cn(
                                      " mb-6 text-[26px] text-black font-bold my-2"
                                    )}
                                  >
                                    {plan.amount}{" "}
                                    <span className="text-[#596569] text-[17px] font-light">
                                      {`/${plan.duration.join("/")}`}
                                    </span>
                                  </p>
                                  {isActive && (
                                    <div className="relative">
                                      <Input
                                        min={1}
                                        className="w-full"
                                        type="number"
                                        placeholder={
                                          "Enter Number of Employees"
                                        }
                                        value={
                                          field.value.find(
                                            (item) => item.id === plan.id
                                          )?.quantity || 1
                                        }
                                        onChange={(e) => {
                                          form.setValue(
                                            "contractDuration",
                                            field.value.map((item) =>
                                              item.id === plan.id
                                                ? {
                                                    ...item,
                                                    quantity: Number(
                                                      e.target.value
                                                    ),
                                                  }
                                                : item
                                            )
                                          );
                                        }}
                                      />

                                      <div className="absolute right-[20px] flex gap-[12px] top-1/2 -translate-y-1/2">
                                        <div
                                          className=" p-[2px]  rounded-[7px] cursor-pointer bg-black  "
                                          onClick={(e) => {
                                            e.preventDefault();
                                            form.setValue(
                                              "contractDuration",
                                              field.value.map((item) =>
                                                item.id === plan.id
                                                  ? {
                                                      ...item,
                                                      quantity:
                                                        Number(item.quantity) +
                                                        1,
                                                    }
                                                  : item
                                              )
                                            );
                                          }}
                                        >
                                          <Plus className="w-[25px] h-[24px] text-white" />
                                        </div>
                                        <div
                                          className=" p-[2px]  rounded-[7px] cursor-pointer bg-black  "
                                          onClick={(e) => {
                                            e.preventDefault();
                                            form.setValue(
                                              "contractDuration",
                                              field.value.map((item) =>
                                                item.id === plan.id
                                                  ? {
                                                      ...item,
                                                      quantity: Math.max(
                                                        1,
                                                        Number(item.quantity) -
                                                          1
                                                      ),
                                                    }
                                                  : item
                                              )
                                            );
                                          }}
                                        >
                                          <Minus className="w-[25px] h-[24px] text-white" />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

           <div> <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full text-primary">
              Our Interim Management Services
            </p>
            <p className="text-[14px] font-light font-primary w-full text-[#596569] my-2">
              Let’s choose the right interim management for you
            </p>

            <div className="flex flex-col lg:flex-row gap-[10px] my-4">
              <div className="w-full flex  justify-between gap-[10px] items-end">
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Duration of Assignment</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            min={1}
                            className="w-full"
                            type="number"
                            placeholder={"Enter Duration"}
                            {...field}
                          />

                          <div className="absolute right-[20px] flex gap-[12px] top-1/2 -translate-y-1/2">
                            <div
                              className=" p-[2px]  rounded-[7px] cursor-pointer bg-black  "
                              onClick={() =>
                                form.setValue(
                                  "duration",
                                 String( Number(field.value) + 1)
                                )
                              }
                            >
                              <Plus className="w-[25px] h-[24px] text-white" />
                            </div>
                            <div
                              className=" p-[2px]  rounded-[7px] cursor-pointer bg-black  "
                              onClick={() =>
                                form.setValue(
                                  "duration",
                                    String(Math.max(0, Number(field.value) - 1))
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
                <div className="flex flex-col gap-[6px] w-20  ">
                  {["days", "months"].map((type) => (
                    <div
                      key={type}
                      className={`h-[29px] flex justify-center items-center w-[71px] bg-black text-white text-[15px] font-primary font-base rounded-[7px] transition-opacity cursor-pointer ${
                        durationType === type ? "opacity-100" : "opacity-30"
                      }`}
                      onClick={() => setDurationType(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full flex justify-between gap-[10px] items-end">
                <FormField
                  control={form.control}
                  name="workingDays"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Include Working Days On-Site</FormLabel>

                      <FormControl>
                        <div className="relative">
                          <Input
                            min={1}
                            className="w-full"
                            type="number"
                            placeholder={"Enter Working Days"}
                            {...field}
                          />

                          <div className="absolute right-[20px] flex gap-[12px] top-1/2 -translate-y-1/2">
                            <div
                              className=" p-[2px]  rounded-[7px] cursor-pointer bg-black  "
                              onClick={() =>
                                form.setValue(
                                  "workingDays",
                                    String(Number(field.value) + 1)
                                )
                              }
                            >
                              <Plus className="w-[25px] h-[24px] text-white" />
                            </div>
                            <div
                              className=" p-[2px]  rounded-[7px] cursor-pointer bg-black  "
                              onClick={() =>
                                form.setValue(
                                  "workingDays",
                                    String(Math.max(0, Number(field.value) - 1))
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

                <div className="flex flex-col gap-[6px] w-20  ">
                  {["days", "months"].map((type) => (
                    <div
                      key={type}
                      className={`h-[29px] flex justify-center items-center w-[71px] bg-black text-white text-[15px] font-primary font-base rounded-[7px] transition-opacity cursor-pointer ${
                        workingDaysType === type ? "opacity-100" : "opacity-30"
                      }`}
                      onClick={() => setWorkingDaysType(type)}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-[10px] my-4">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="assignmentDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Requested Start Date of Assignment</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "h-[64px] text-[16px] font-secondary min-w-[114px] bg-[rgb(64,64,64,0.08)] !font-normal placeholder:text-[#596569] text-left justify-start", // Added text-left and justify-start
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span>DD/MM/YYYY</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            className="w-full text-start"
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
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
                  name="assignmentType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Assignment</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              className="w-full"
                              placeholder="Select a assignment type"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          <SelectItem
                            className="w-full"
                            value="Settle in France"
                          >
                            Settle in France
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="items"
              render={({}) => (
                <FormItem>
                  {/* <div className="mb-4"> */}
                  <FormLabel>You can choose multiple options</FormLabel>
                  {/* </div> */}
                  {/* <div className="flex flex-wrap gap-[10px]">
                    {items.map((item) => (
                      <FormItem
                        key={item}
                        className="flex h-[44px] flex-row items-center space-x-3 bg-[#FFF4F0] rounded-[10px] p-[10px] max-w-fit"
                      >
                        <FormControl>
                          <Checkbox
                            className="w-[20px] h-[20px] border border-[#596569] rounded-[4px]"
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              field.onChange(
                                checked
                                  ? [...(field.value || []), item]
                                  : field.value?.filter(
                                      (value) => value !== item
                                    )
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="ml-[-10px] text-[14px] font-primary font-normal">
                          {item}
                        </FormLabel>
                        <FormLabel className="ml-[-10px] text-[14px] font-primary font-normal">
                          <img src={infoIcon} className="w-[20px] h-[20px]" />
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-between gap-[10px] items-end my-4">
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
            <ExtraPlanPricing
              onSubmit={(value) => {
                console.log('value', value)
                form.setValue("plan", value);
              }}
            />
            </div>
           
        
           
            {/* <hr className="my-4" /> */}
            <div className="flex justify-end">
              <Button className="w-full md:w-[376px]" type="submit">
              Continue to Your Details
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Step2;
