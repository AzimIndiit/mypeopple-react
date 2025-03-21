import { useNavigate, useParams } from "react-router-dom";
import backArrow from "@/assets/icons/backArrow.svg";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Trash2 } from "lucide-react";
import attachmentIcon from "@/assets/icons/attachment-soild.svg";
import docIcon from "@/assets/icons/doc-file.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PopupModal from "@/components/Orders/PopupModal";
import GetModalContent from "@/components/Orders/GetModalContent";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CurrencyInput from "@/components/CurrencyInput";

const serviceOptions = [
  {
    label: "Employment Contract",
    value: "Employment Contract",
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
];

const additionalList = [
  {
    label: "Additional Contract",
    value: "Additional Contract",
  },
  
];
const pricingList = [
  {
    label: "€120",
    value: "120",
  },
  
];
const discountList = [
  {
    label: "10%",
    value: "10",
  },
  
];
const OrderDetailsEdit = ({ orderDetails }: { orderDetails: any }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const [orderStatus, setOrderStatus] = useState<
    "sent" | "accepted" | "rejected"
  >("sent");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const CreateOrderSchema = z.object({
    orderNo: z.string().nonempty("Order number is required"),
    client: z.string().nonempty("Client is required"),
    currentPlan: z.string().nonempty("Current plan is required"),
    serviceType: z.string().nonempty("Service type is required"),
    description: z.string().nonempty("Description is required"),
    pricingList: z.string().nonempty("Pricing list is required"),
    priceBeforeVAT: z.string().nonempty("Price before VAT is required"),
    additionalList: z.string().nonempty("Additional list is required"),
    additionalAmount: z.string().nonempty("Additional amount is required"),
    discountList: z.string().nonempty("Discount list is required"),
    discountAmount: z.string().nonempty("Discount amount is required"),
    commissionRatelist: z.string().nonempty("Commission rate list is required"),
    commissionAmount: z.string().nonempty("Commission amount is required"),
    attachment: z.custom<File[]>(
      (val) =>
        val instanceof Array && val.every((file) => file instanceof File),
      {
        message: "Invalid file format",
      }
    ),
  });

  type CreateOrderFormValues = z.infer<typeof CreateOrderSchema>;

  const form = useForm<CreateOrderFormValues>({
    resolver: zodResolver(CreateOrderSchema),
    defaultValues: {
      orderNo: id || "",
      client: orderDetails.client || "Mélissa B",
      currentPlan: orderDetails.currentPlan || "Premium",
      serviceType: orderDetails.serviceType || "Employment Contract",
      description:
        orderDetails.description ||
        "Hello, I would need an employment contract for an employee who is scheduled to start work next Tuesday. The contract should include all standard terms and conditions, and the necessary details are provided in the attached files. Please ensure that the contract is prepared and ready before the mentioned date to avoid any delays in onboarding. Feel free to reach out if additional information or clarification is required.",
      pricingList: "120",
      priceBeforeVAT: "134",
      additionalList: "Additional Contract",
      additionalAmount: "90",
      discountList: "10",
      discountAmount: "20",
      commissionRatelist: "10",
      commissionAmount: "20",
      attachment:  (orderDetails.attachments as any) || [],
    },
  });

  const onSubmit = (values: CreateOrderFormValues) => {
    console.log(`Form Submitted`, values);
  };

  const files = form.watch("attachment");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length + files.length > 5) {
      alert("You can upload a maximum of 5 files.");
      return;
    }
    form.setValue("attachment", [...files, ...selectedFiles]); // Append files
  };

  const removeFile = (index: number) => {
    form.setValue(
      "attachment",
      files.filter((_, i) => i !== index)
    );
    if (files.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const { title, description, showFooter } = GetModalContent({ orderStatus });
  return (
    <div className="">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <div
            className="cursor-pointer w-[30px]"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src={backArrow} className="w-[30px] h-[30px]" />
          </div>
          <p className="text-[20px] font-light font-primary">Order Details</p>
        </div>
      </div>
      <div className="my-4 w-full space-y-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <div className="flex space-x-6 w-full">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="orderNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
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
                {" "}
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
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
                  name="currentPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Plan</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
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
                name="serviceType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Service Type</FormLabel>
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
                        {serviceOptions.map((item) => (
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter text here"
                      className="h-[150px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex space-x-6">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="pricingList"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Pricing List</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Pricing" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {pricingList.map((item) => (
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
              <div className="w-full">
                <CurrencyInput
                  control={form.control}
                  name="priceBeforeVAT"
                  label="Price before VAT"
                />
              </div>
            </div>
            <div className="w-full flex space-x-6">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="additionalList"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Additional List</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Additional" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {additionalList.map((item) => (
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
              <div className="w-full">
                <CurrencyInput
                  control={form.control}
                  name="additionalAmount"
                  label="Additional Amount"
                />
              </div>
            </div>
            <div className="w-full flex space-x-6">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="discountList"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Discount List</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Discount" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {discountList.map((item) => (
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
              <div className="w-full">
                <CurrencyInput
                  control={form.control}
                  name="discountAmount"
                  label="Discount Amount"
                />
              </div>
            </div>

            <div className="w-full flex space-x-6">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="commissionRatelist"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Commission Rate List</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Commission Rate" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {discountList.map((item) => (
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
              <div className="w-full">
                <CurrencyInput
                  control={form.control}
                  name="commissionAmount"
                  label="Commission Amount"
                />
              </div>
            </div>


            <div className="text-[14px] font-primary my-4">
              <div className="rounded-[15px] bg-[#F8F8F8] border border-[#E3E5E8] mt-4">
                {orderDetails.taxDetails.map((item: any, index: number) => (
                  <div key={index} className="flex gap-[10px] w-full">
                    <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]">
                      {item.label}
                    </p>
                    <p className="text-[16px] text-[#454B54] font-primary font-bold w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <FormField
              control={form.control}
              name="attachment"
              render={({}) => (
                <FormItem>
                  <FormLabel>Attach Documents</FormLabel>
                  <FormControl>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileChange}
                    />
                  </FormControl>
                  <FormMessage />
                  {/* Display uploaded files */}

                  <div className=" flex flex-wrap gap-x-[20px] mt-2 space-y-2">
                    {files.length > 0 &&
                      files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-[10px] justify-between bg-gray-100 rounded-[7px] p-[15px] h-[54px]"
                        >
                          <span className="text-sm flex items-center gap-[10px] font-primary ">
                            <img
                              src={docIcon}
                              alt="doc"
                              className="w-[24px] h-[24px]"
                            />
                            {file.name}
                          </span>
                          <div
                            onClick={() => removeFile(index)}
                            className="cursor-pointer  flex items-center justify-center rounded-full "
                          >
                            <Trash2 className="w-[24px] h-[24px] text-red-500" />
                          </div>
                        </div>
                      ))}
                    <div
                      className="w-[148px] h-[54px] bg-black text-white text-[14px] font-primary flex items-center gap-[5px] justify-between rounded-[7px] p-[15px]"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <img
                        src={attachmentIcon}
                        alt="attachment"
                        className="w-[24px] h-[24px]"
                      />
                      Attach More
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <div className="w-full flex flex-col-reverse md:flex-row justify-end  gap-2 xl:gap-[21px] mb-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full md:w-[140px] xl:w-[190px] border border-[#C7C7C7] text-[#F7F7F7]]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="w-full md:w-[140px] xl:w-[190px] border text-black bg-[#C7C7C7] hover:bg-[#C7C7C7]/80"
                onClick={form.handleSubmit((values) => {
                  // console.log("send", values);
                  onSubmit(values);
                  setOrderStatus("rejected");
                  setIsOpen(true);
                })}
              >
                Reject
              </Button>
              <Button
                type="button"
                className="w-full md:w-[140px] xl:w-[190px] border border-primary text-primary bg-[rgba(252,64,6,0.08)] hover:bg-[rgba(252,64,6,0.08)]"
                onClick={form.handleSubmit((values) => {
                  // console.log("send", values);
                  onSubmit(values);
                  setOrderStatus("accepted");
                  setIsOpen(true);
                })}
              >
                Save as Draft
              </Button>
              <Button
                type="submit"
                className="w-full md:w-[140px] xl:w-[190px]"
                onClick={form.handleSubmit((values) => {
                  // console.log("send", values);
                  onSubmit(values);
                  setOrderStatus("sent");
                  setIsOpen(true);
                })}
              >
                Send
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <PopupModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={title}
        description={description}
        onCancel={() => setIsOpen(false)}
        showFooter={showFooter}
        onContinue={() => {
          console.log("send", form.getValues());
          onSubmit(form.getValues());
        }}
      />
    </div>
  );
};

export default OrderDetailsEdit;
