import { Input } from "@/components/ui/input";
import check1 from "@/assets/icons/check1.svg";
import check2 from "@/assets/icons/check2.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import infoSolidIcon from "@/assets/icons/info-fill.svg";
import { Plus, Minus } from "lucide-react";

import userIcon from "@/assets/icons/user.svg";
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
import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MultiSelect } from "@/components/ui/multi-select";
const currentSituationList = [
  "Working for a Company",
  "Unemployed",
  "Starting my Freelance Business",
  "Self Employed",
  "Around the world (digital nomad)",
  "Unemployed",
] as const;

const MAX_CHAR_COUNT = 3000;

const positionOptions = [
  { value: "HRBP", label: "HRBP" },
  { value: "Payroll Manager", label: "payroll Manager" },
];

const Step1 = ({
  setCurrentStep,
  setStepData,
  stepData,
  setIsCompare,
}: {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  setStepData: (data: any) => void;
  stepData: any;
  setIsCompare: (value: boolean) => void;
}) => {
  //   const { t, i18n } = useTranslation();

  //use memo to create the schema
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const Step1Schema = z.object({
    userPic: z.string().optional(),
    email: z.string().email({ message: "Email is required" }),
    firstName: z.string().min(2, { message: "Enter First Name" }),
    lastName: z.string().min(2, { message: "Enter Last Name" }),
    phoneNumber: z.string().min(10, { message: "Enter Phone Number" }),
    officePhoneNumber: z.string().min(10, { message: "Enter Phone Number" }),
    position: z.string().min(1, { message: "Select Position " }),
    currentSituationSelect: z
      .string()
      .min(1, { message: "Select Current Situation" }),
    resume: z.string().max(3000, { message: "Enter resume" }),
    numberOfEmployees: z
      .string()
      .min(1, { message: "Number of Employees is required" }),
    promoCode: z.string().min(1, { message: "Promo Code is required" }),

    currentSituation: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one situation.",
      }),
      skills:z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: "You have to select at least one situation.",
      }),
  });

  const form = useForm({
    resolver: zodResolver(Step1Schema),
    defaultValues: {
      userPic: "",
      resume:
        "I am a bilingual French English HR executive profile, nourished by over 30 years in operational HR functions & consulting (employment law, payroll, pensions, HR consulting) and operational general management. In complex, multi-sector environments, I bring process, innovation and enthusiasm to define and implement corporate strategy with a high level of technical expertise, getting the best out of individuals and teams daily.",
      firstName: "Arnault",
      lastName: "Charrière",
      email: "charrièrearnault22@gmail.com",
      phoneNumber: "4654864545",
      officePhoneNumber: "4654864545",
      currentSituation: stepData?.currentSituation || ["Working for a Company"],
      currentSituationSelect: "",
      plan: stepData?.plan || {
        isMonthly: true,
        planId: 3,
        price: "100",
        title: "Premium",
      },
      promoCode: stepData?.promoCode || "KHJGJKYHG78687865",
      contractDuration: stepData?.contractDuration || "yearly",
    },
  });

  const onSubmit = (values: any) => {
    console.log(`Form Submitted`, values);
    setCurrentStep("2");
    // setStepData({ step1: values });
    setStepData((prev: any) => ({
      ...prev,
      step1: values,
    }));
  };

  return (
    <div className="w-full my-[20px]">
      <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full">
        My Profile
      </p>
      <hr className="my-4" />
      <div className="w-full my-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="w-32 h-32">
              <Card
                className="flex items-center justify-center w-full h-full cursor-pointer bg-[#40404014] shadow-none p-0"
                onClick={() => fileInputRef.current?.click()}
              >
                {image ? (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                ) : (
                  <CardContent className="flex flex-col items-center justify-center text-center space-y-1 w-full p-0 ">
                    <img
                      src={userIcon}
                      className="w-[46px] h-[46px] text-muted-foreground"
                    />
                    <p className="text-[14px] font-primary text-muted-foreground w-full ">
                      Add Image
                    </p>
                  </CardContent>
                )}
              </Card>
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-[16px] w-full">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input className="w-full" placeholder={""} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input className="w-full" placeholder={""} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-[16px] w-full">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder={""} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="officePhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder={""} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder={""} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full">
              Your Position
            </p>
            <div className="w-full">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Function for which you wish to join as a freelancer
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Functions list (HRBP, payroll Manager e.g.)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {positionOptions.map((item) => (
                          <SelectItem value={item.value} className="h-[48px]">
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full">
              Your Current Situation
            </p>
            <div className="w-full">
              <FormField
                control={form.control}
                name="currentSituationSelect"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Situation List</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Functions list (HRBP, payroll Manager e.g.)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currentSituationList.map((item) => (
                          <SelectItem value={item} className="h-[48px]">
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="currentSituation"
              render={({ field }) => (
                <FormItem>
                  {/* <div className="mb-4"><FormLabel></FormLabel></div> */}
                  <div className="flex flex-wrap gap-[10px]">
                    {currentSituationList.map((item) => (
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
            <Button
              // onClick={() => navigate("/orders/create")}
              variant="ghost"
              className="group text-[12px] !w-[107px] hover:border-1 hover:text-white font-primary bg-primary text-white h-[41px] rounded-[10px]  border border-transparent transition-all duration-300"
            >
              <Plus
                // src={addIcon}
                className="w-[16px] h-[16px] transition-all duration-300 group-hover:filter-none"
              />
              <span className=" transition-all duration-300 group-hover:text-black">
                Add
              </span>
            </Button>

            <div className=" my-4">
              <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full">
                Resume
              </p>
              <p className="text-[13px] font-primary font-normal text-[#848199]">
                If the number of characters is insufficient, please attach your
                presentation into files section below.
              </p>
            </div>
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <>
                      <Textarea
                        maxLength={MAX_CHAR_COUNT}
                        {...field}
                        placeholder="Enter text here"
                        className="h-[150px] border-2 border-[#A3A3A3] border-dashed  leading-relaxed bg-[#00000008] text-[#848199] "
                      />

                      <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                        {field?.value?.length || 0}/{MAX_CHAR_COUNT}
                      </span>
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full">
              Skills
            </p>
            <p className="text-[13px] font-primary font-normal text-[#848199]">
              Let us know abour your skills
            </p>
            <div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Skill List</FormLabel>
                      <MultiSelect
                        options={currentSituationList?.map((v) => ({
                          value: v,
                          label: v,
                        }))}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Select frameworks"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                      />
                      {/* <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your skills" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currentSituationList.map((item) => (
                          <SelectItem value={item} className="h-[48px]">
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select> */}

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Languages</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currentSituationList.map((item) => (
                            <SelectItem value={item} className="h-[48px]">
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full">
              <FormField
                control={form.control}
                name="Seniority"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Seniority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="No of Years" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currentSituationList.map((item) => (
                          <SelectItem value={item} className="h-[48px]">
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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

export default Step1;
