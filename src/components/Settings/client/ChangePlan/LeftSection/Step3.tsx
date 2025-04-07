import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import infoIcon from "@/assets/icons/info-fill.svg";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const postionType = [
  {
    label: "Manager",
    value: "Manager",
  },
  {
    label: "Talent Acquisition & Recruitment",
    value: "Talent Acquisition & Recruitment",
  },
  {
    label: "Performance Management",
    value: "Performance Management",
  },
  {
    label: "Learning & Development",
    value: "Learning & Development",
  },
  {
    label: "Compensation & Benefits",
    value: "Compensation & Benefits",
  },
  {
    label: "HR Compliance & Policies",
    value: "HR Compliance & Policies",
  },
]

const Step3 = ({
  setCurrentStep,
  setStepData,
}: // stepData,
{
  currentStep: string;
  setCurrentStep: (step: string) => void;
  setStepData: (data: any) => void;
  stepData: any;
}) => {
  //   const { t, i18n } = useTranslation();
  //use memo to create the schema
  const Step3Schema = z.object({
    companyInfos: z.object({
      enterpriseRegisteredNumber: z
        .number()
        .min(1, { message: "Enterprise Registered Number is required" }),
      name: z.string().min(1, { message: "Company Name is required" }),
      address: z.object({
        street: z.string().min(1, { message: "Street is required" }),
        zipCode: z.string().min(1, { message: "Zip Code is required" }),
        city: z.string().min(1, { message: "City is required" }),
      }),
      vatNo: z.string().min(1, { message: "VAT No is required" }),
      nafCode: z.string().min(1, { message: "NAF Code is required" }),
      phone: z.string().min(1, { message: "Phone is required" }),
      email: z.string().email({ message: "Valid Email is required" }),
      bargainingAggrement: z
        .string()
        .min(1, { message: "Bargaining Agreement is required" }),
    }),
    userInfos: z.object({
      position: z.string().min(1, { message: "Position is required" }),
      enterpriseRegisteredNumber: z
        .number()
        .min(1, { message: "Enterprise Registered Number is required" }),
      companyName: z.string().min(1, { message: "Company Name is required" }),
      firstName: z.string().min(1, { message: "First Name is required" }),
      lastName: z.string().min(1, { message: "Last Name is required" }),
      address: z.object({
        street: z.string().min(1, { message: "Street is required" }),
        zipCode: z.string().min(1, { message: "Zip Code is required" }),
        city: z.string().min(1, { message: "City is required" }),
        country: z.string().min(1, { message: "Country is required" }),
      }),
      vatNo: z.string().min(1, { message: "VAT No is required" }),
      nafCode: z.string().min(1, { message: "NAF Code is required" }),
      phone: z.string().min(1, { message: "Phone is required" }),
      email: z.string().email({ message: "Valid Email is required" }),
      bargainingAggrement: z
        .string()
        .min(1, { message: "Bargaining Agreement is required" }),
      isAddressDiff: z.boolean().optional(),
      shippingAddress: z.object({
        firstName: z.string().min(1, { message: "First Name is required" }),
        lastName: z.string().min(1, { message: "Last Name is required" }),
        registerNo: z.number().min(1, { message: "Register No is required" }),
        companyName: z.string().min(1, { message: "Company Name is required" }),

        address: z.object({
          street: z.string().min(1, { message: "Street is required" }),
          area: z.string().min(1, { message: "Area is required" }),
          state: z.string().min(1, { message: "State is required" }),
          country: z.string().min(1, { message: "Country is required" }),
          zipCode: z.string().min(1, { message: "Zip Code is required" }),
        }),
        vatNo: z.string().min(1, { message: "VAT No is required" }),
        nafCode: z.string().min(1, { message: "NAF Code is required" }),
        isCompanyInProcess: z.boolean().optional(),
        email: z.string().email({ message: "Valid Email is required" }),
        invoiceEmail: z.boolean().optional(),
      }),
      isBillingChecked: z.boolean().optional(),
    }),
  });

  const form = useForm({
    resolver: zodResolver(Step3Schema),
    defaultValues: {
      companyInfos: {
        enterpriseRegisteredNumber: 123333,
        name: "ASAP Codes",
        address: {
          street: "965 Saint Joesph St",
          zipCode: "190055",
          city: "California",
        },
        vatNo: "UYGHUIG7587IUYGF",
        nafCode: "YHGYU76",
        phone: "4654864545",
        email: "companyname55@gmail.com",
        bargainingAggrement: "UYGHUIG7587IUYGF",
      },
      userInfos: {
        position: "Manager",
        enterpriseRegisteredNumber: 123333,
        companyName: "ASAP Codes",
        firstName: "Tam",
        lastName: "Tran",
        address: {
          street: "965 Saint Joesph St",
          zipCode: "190055",
          city: "California",
          country: "USA",
        },
        vatNo: "UYGHUIG7587IUYGF",
        nafCode: "YHGYU76",
        phone: "4654864545",
        email: "companyname55@gmail.com",
        bargainingAggrement: "UYGHUIG7587IUYGF",
        isAddressDiff: true,
        shippingAddress: {
          firstName: "Tam",
          lastName: "Tran",
          registerNo: 88765,
          companyName: "ASAP codes",
          address: {
            street: "965 Saint Joeshp st",
            area: "Times square",
            state: "California",
            country: "United States of America",
            zipCode: "10001",
          },
          vatNo: "UYGHUIG7587IUYGF",
          nafCode: "YHGYU76",
          isCompanyInProcess: true,
          email: "tamtran667@gmail.com",
          invoiceEmail: true,
        },
        isBillingChecked: true,
      },
    },
  });



  const onSubmit = (values: any) => {
    console.log(`Form Submitted`, values);
    setCurrentStep("4");
    // setStepData({ step3: values });
    setStepData((prev:any) => ({
      ...prev,
      step3: values,
    }));
  };
  return (
    <div className="w-full my-[20px] ">
      <p className=" text-[16px] lg:text-[18px] font-semibold font-primary w-full">
        My User Account Details
      </p>
      <hr className="my-4" />

      <div className="w-full my-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="w-full space-y-6">
              <p className=" text-[16px] xl:text-[18px]  font-semibold text-primary w-full mb-2">
                My Company Infos
              </p>

              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="companyInfos.enterpriseRegisteredNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enterprise Registered Number</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="companyInfos.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Company Name ,Surname or Fist Name
                        </FormLabel>
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

              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="companyInfos.address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address/Street</FormLabel>
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="companyInfos.address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
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

                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="companyInfos.address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
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
              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="companyInfos.vatNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VAT Identification Number</FormLabel>
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="companyInfos.nafCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NAF Code</FormLabel>
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
              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="companyInfos.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Phone Number</FormLabel>
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="companyInfos.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
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
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="companyInfos.bargainingAggrement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collective Bargaining Agreement</FormLabel>
                      <FormControl>
                        <Input className="w-full" placeholder={""} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="w-full  space-y-6">
              <p className=" text-[16px] xl:text-[18px]  font-semibold text-primary w-full mb-2">
                My User Infos
              </p>

              <div className="w-full">
              <FormField
                control={form.control}
                name="userInfos.position"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Position in the Company</FormLabel>
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
                        {postionType.map((item) => (
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
              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
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
              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number to Call You</FormLabel>
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
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
              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.enterpriseRegisteredNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enterprise Registered Number</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
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

              <FormField
                control={form.control}
                name="userInfos.isAddressDiff"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-[10px]">
                        <Checkbox
                          id="isAddressDiff"
                          className="w-[20px] h-[20px] border border-[#596569] rounded-[4px]"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="isAddressDiff"
                          className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-primary"
                        >
                          if Postal Address Diffrent from Company Address
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> <div className="w-full">
              <FormField
                control={form.control}
                name="userInfos.address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address/Street</FormLabel>
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

              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
               
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
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
              
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
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

              <p className=" text-[14px]  font-semibold text-black w-full mb-2">
                Billing Information
              </p>

              <FormField
                control={form.control}
                name="userInfos.isBillingChecked"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-[10px]">
                        <Checkbox
                          id="isBillingChecked"
                          className="w-[20px] h-[20px] border border-[#596569] rounded-[4px]"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="isBillingChecked"
                          className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-primary"
                        >
                          Same as Company Infos
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
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
              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.registerNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enterprise Registered Number</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
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
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="userInfos.shippingAddress.address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input className="w-full" placeholder={""} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.address.area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area/Street</FormLabel>
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
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
              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Code</FormLabel>
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

              <div className="flex flex-col sm:flex-row gap-[16px] w-full">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.vatNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VAT Identification Number</FormLabel>
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
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.nafCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NAF Code</FormLabel>
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
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="userInfos.shippingAddress.isCompanyInProcess"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center gap-[10px]">
                          <Checkbox
                            id="isCompanyInProcess"
                            className="w-[20px] h-[20px] border border-[#596569] rounded-[4px]"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <label
                            htmlFor="isCompanyInProcess"
                            className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-primary"
                          >
                            Company in the process of being incorporated{" "}
                          </label>
                          <img src={infoIcon} className="w-[20px] h-[20px] " />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full rounded-[15px] bg-[#FFF4F0] p-[10px]">
                <FormLabel className=" !font-semibold text-[14px] mb-4">
                  Invoices
                </FormLabel>
                <FormLabel className=" !font-semibold text-[14px] mb-4">
                  You willl find your invoices s the my plan section
                </FormLabel>
                <div className="mb-4">
                  <FormField
                    control={form.control}
                    name="userInfos.shippingAddress.invoiceEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center gap-[10px]">
                            <Checkbox
                              id="invoiceEmail"
                              className="w-[20px] h-[20px] border border-[#596569] rounded-[4px]"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <label
                              htmlFor="invoiceEmail"
                              className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-primary"
                            >
                              I want to get invoices via email as well
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="userInfos.shippingAddress.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder={""} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* <hr className="my-4" /> */}
            <div className="flex justify-end">
              <Button className="w-full md:w-[376px]" type="submit">
                Continue to Payment Methods
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Step3;
