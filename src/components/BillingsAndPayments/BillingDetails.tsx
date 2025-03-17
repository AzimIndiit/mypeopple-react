import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import infoIcon from "@/assets/icons/info-fill.svg";
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

const BillingDetailsPage = ({
//   setCurrentStep,
}: {
//   currentStep: string;
//   setCurrentStep: (step: string) => void;
}) => {
  //   const { t, i18n } = useTranslation();

  //use memo to create the schema
  const BillingDetailsSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    registerNo: z.number().min(1, { message: "Register No is required" }),
    companyName: z.string().min(1, { message: "Company Name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
    area: z.string().min(1, { message: "Area is required" }),
    state: z.string().min(1, { message: "State is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    zipCode: z.string().min(1, { message: "Zip Code is required" }),
    vatNo: z.string().min(1, { message: "VAT No is required" }),
    nafCode: z.string().min(1, { message: "NAF Code is required" }),
    isCompanyInProcess: z.boolean().optional(),
    email: z.string().min(1, { message: "Email is required" }),
    invoiceEmail: z.boolean().optional(),
  });

  const form = useForm({
    resolver: zodResolver(BillingDetailsSchema),
    defaultValues: {
      firstName: "Tam",
      lastName: "Tran",
      registerNo: 88765,
      companyName: "ASAP codes",
      address: "965 Saint Joeshp st",
      area: "Times square",
      state: "California",
      country: "United States of America",
      zipCode: "10001",
      vatNo: "UYGHUIG7587IUYGF",
      nafCode: "YHGYU76",
      isCompanyInProcess: false,
      email: "tamtran667@gmail.com",
      invoiceEmail:true
    },
  });

  const onSubmit = (values: any) => {
    console.log(`Form Submitted`, values);
    // setCurrentStep("payement-method");
  };

  return (
    <div className="w-full my-[20px]">
     
      <div className="w-full my-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
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
                  name="registerNo"
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
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input className="w-full" placeholder={""} {...field} />
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
                name="address"
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
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area/Street</FormLabel>
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
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
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
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
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
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code</FormLabel>
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
                  name="vatNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VAT Identification Number</FormLabel>
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
                  name="nafCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NAF Code</FormLabel>
                      <FormControl>
                        <Input className="w-full" placeholder={""} {...field} />
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
                name="isCompanyInProcess"
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
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                name="invoiceEmail"
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
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                name="email"
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
            <div className="flex justify-end">
              <Button className="w-full lg:w-[315px]" type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BillingDetailsPage;
