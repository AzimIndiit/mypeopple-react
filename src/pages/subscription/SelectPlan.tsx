import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Plus, Minus } from "lucide-react";

import infoSolidIcon from "@/assets/icons/info-fill.svg";
import { z } from "zod";
import PlanPricing from "@/components/PlanPricing";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SelectPlanPage = ({
  setCurrentStep,
}: {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}) => {
  //   const { t, i18n } = useTranslation();
  const [durationType, setDurationType] = useState("days");
  const [workingDaysType, setWorkingDaysType] = useState("days");
  const [selectedService, setSelectedService] = useState("1");
  const compareRef = useRef<HTMLHRElement>(null);
  //use memo to create the schema
  const SelectPlanSchema = z.object({
    duration: z.number().min(1, { message: "Duration is required" }),
    workingDays: z.number().min(1, { message: "Working Days is required" }),
    assignmentDate: z.date({
      required_error: "Assignment Date is required",
    }),
    promoCode: z.string().min(1, { message: "Promo Code is required" }),
    assignmentType: z
      .string()
      .min(1, { message: "Assignment Type is required" }),
    items: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
      })
      .optional(),
    plan: z.string().min(1, { message: "Plan is required" }),
  });

  const form = useForm({
    resolver: zodResolver(SelectPlanSchema),
    defaultValues: {
      duration: 0,
      workingDays: 0,
      assignmentDate: undefined,
      assignmentType: "",
      items: [],
      plan: "",
      promoCode: "",
    },
  });

  const onSubmit = (values: any) => {
    console.log(`Form Submitted`, values);
    setCurrentStep("billing-details");
  };

  const compareServices = [
    {
      id: "1",
      title: "Invest In France",
      description: "Our HR package to settle right",
    },
    {
      id: "2",
      title: "Invest In France",
      description:
        "To manage a one time key strategic project or transition period",
    },
  ];

  return (
    <div className="w-full my-[20px]">
      <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full">
        Hi, John! Nice to meet you. Let's choose the perfect plan for you
      </p>

      <div className="w-full my-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="flex flex-col lg:flex-row gap-[10px]">
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
                                  "duration",
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
                                  "workingDays",
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

            <div className="flex flex-col lg:flex-row gap-[10px]">
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
            <FormField
              control={form.control}
              name="items"
              render={({}) => (
                <FormItem>
                  <FormLabel
                    className="text-primary underline !font-semibold text-[14px] mb-4 cursor-pointer"
                    onClick={() => {
                      if (compareRef.current) {
                        compareRef.current.scrollIntoView({ behavior: "smooth" });
                      } 
                    }}
                  >
                    Compare Services
                  </FormLabel>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-[18px] !font-semibold mb-4">
                      Our Interim Management Services
                    </p>
                    <div className="flex flex-col lg:flex-row gap-[20px] w-full  ">
                      {compareServices.map((type) => (
                        <div
                          key={type.title}
                          className={`h-[78px]  flex lg:justify-start text-left items-center w-full  text-white text-[15px] font-primary font-base rounded-[10px] p-[20px] transition-opacity cursor-pointer ${
                            selectedService === type.id
                              ? "bg-black"
                              : "bg-[rgba(64,64,64,0.08)]"
                          }`}
                          onClick={() => setSelectedService(type.id)}
                        >
                          <div className="flex flex-col lg:gap-[10px] ">
                            <p
                              className={`text-[14px] lg:text-[16px] !font-semibold ${
                                selectedService === type.id
                                  ? "text-primary"
                                  : "text-black"
                              }`}
                            >
                              {type.title}
                            </p>
                            <p
                              className={`text-[14px] lg:text-[16px] font-primary font-normal ${
                                selectedService === type.id
                                  ? "text-white"
                                  : "text-[#596569]"
                              }`}
                            >
                              {type.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-[15px] bg-[#F8F8F8] border border-[#E3E5E8] mt-[20px]">
                      <div className="flex  gap-[10px]  w-full  ">
                        <p
                          className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]`}
                        >
                          Price Estimate
                        </p>
                        <p
                          className={`text-[16px] text-[#454B54] font-primary font-bold w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                        >
                          10€
                        </p>
                      </div>
                      <div className="flex  gap-[10px]  w-full  ">
                        <p
                          className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]`}
                        >
                          On Site
                        </p>
                        <p
                          className={`text-[16px] text-[#454B54] font-primary font-bold w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                        >
                          10€
                        </p>
                      </div>
                      <hr className="w-full" />
                      <div className="flex  gap-[10px]  w-full  ">
                        <p
                          className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]`}
                        >
                          Special Discount
                        </p>
                        <p
                          className={`text-[16px] text-[#454B54] font-primary font-bold w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                        >
                          10€
                        </p>
                      </div>
                      <div className="flex  gap-[10px]  w-full  ">
                        <p
                          className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]`}
                        >
                          Total Before VAT
                        </p>
                        <p
                          className={`text-[16px] text-[#454B54] font-primary font-bold w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                        >
                          270€
                        </p>
                      </div>
                      <div className="flex  gap-[10px]  w-full  ">
                        <p
                          className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]`}
                        >
                          VAT
                        </p>
                        <p
                          className={`text-[16px] text-[#454B54] font-primary font-bold w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                        >
                          5%
                        </p>
                      </div>
                      <div className="flex  gap-[10px]  w-full  ">
                        <p
                          className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]`}
                        >
                          Total Including VAT
                        </p>
                        <p
                          className={`text-[16px] text-primary font-primary font-bold w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                        >
                          300€
                        </p>
                      </div>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col lg:flex-row  gap-[20px] justify-between items-center">
              <p className="text-[14px] w-full text-left">
                Compared to hiring an HR manager you save €2000
              </p>
              <Button className="w-full lg:w-[315px]" type="button">
                Buy
              </Button>
            </div>
            <hr className="w-full" ref={compareRef} />
            <h2 className="text-[16px] lg:text-[18px] font-semibold font-primary my-4">
              Our HRBP Outsourcing Plans to Switch to Anytime
            </h2>
           <PlanPricing
              screen="1"
              onSubmit={(value) => {
                form.setValue("plan", value.planId);
                onSubmit(form.getValues());
              }}
            />
            {/* <Button className="w-full" type="submit">
              {t("auth.login.loginButton")}
            </Button> */}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SelectPlanPage;
