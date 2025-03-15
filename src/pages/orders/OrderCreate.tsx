import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import attachmentIcon from "@/assets/icons/attachment-soild.svg";
import docIcon from "@/assets/icons/doc-file.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/helper";
import avatar from "@/assets/images/avatar.png";
import PopupModal from "@/components/Orders/PopupModal";
import GetModalContent from "@/components/Orders/GetModalContent";

const serviceType = [
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

const users = [
  { id: "1", avatar: avatar, name: "Michael" },
  { id: "2", avatar: avatar, name: "Alice" },
  { id: "3", avatar: avatar, name: "John" },
];

const OrderCreatePage = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState<
    "sent" | "accepted" | "rejected"
  >("sent");

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const CreateOrderSchema = z.object({
    serviceType: z.string().min(1, { message: "Service Type is required" }),
    orderType: z.string().min(1, { message: "Order Type is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    selectedHrbp: z.string().min(1, { message: "Selected HRBP is required" }),
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
      serviceType: "",
      orderType: "contact",
      description: "",
      selectedHrbp: "",
      attachment: [],
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
      files.filter((_, i) => i !== index) // Remove file at index
    );
    if (files.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  
  const { title, description , showFooter} = GetModalContent({orderStatus});

  return (
    <div className="w-full ">
      <p className=" text-[14px] lg:text-[14px] font-semibold font-primary w-full uppercase text-[#1C1C1C]  ">
        New Order
      </p>
      <div className="w-full my-[20px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4"
          >
            <div className="w-full">
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>What type of service do you want?</FormLabel>
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
                        {serviceType.map((item) => (
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
              name="orderType"
              render={({ field }) => (
                <FormItem className=" items-center space-x-2">
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    <div className="w-full flex gap-[10px]">
                      <RadioGroup
                        defaultValue="contact"
                        value={field.value}
                        onValueChange={field.onChange}
                        className="w-full flex"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="client" id="r1" />
                          <Label htmlFor="r1">Order to any HRBP </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="contact" id="r2" />
                          <Label htmlFor="r2">Select from your Contacts</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full">
              <FormField
                control={form.control}
                name="selectedHrbp"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Select HRBP</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select HRBP" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {users.map(({ id, avatar, name }) => (
                          <SelectItem key={id} value={id} className="h-[48px]">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={avatar} alt={name} />
                                <AvatarFallback>
                                  {getInitials(name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="!text-[12px] !font-primary capitalize">
                                {name}
                              </span>
                            </div>
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="w-full" placeholder={"Enter description here..."} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="attachment"
              render={({  }) => (
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

            <div className="w-full flex flex-col-reverse md:flex-row xl:justify-end gap-4 mb-4 lg:gap-[21px]">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                className="w-full md:w-[140px] xl:w-[190px] border border-[#C7C7C7] "
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

export default OrderCreatePage;
