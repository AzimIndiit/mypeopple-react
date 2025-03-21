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

const OrderDetailsView = ({ orderDetails }: { orderDetails: any }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const [orderStatus, setOrderStatus] = useState<
    "sent" | "accepted" | "rejected"
  >("sent");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const CreateOrderSchema = z.object({
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
      attachment: (orderDetails.attachments as any) || [],
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="w-full p-[20px] rounded-[20px] bg-whiter border border-[#E4E4E4] my-4">
            <div className="font-primary text-[16px] text-black p-[10px] rounded-[10px] bg-[#E3E3E3] w-fit">
              Order - {id}
            </div>
            <div className="text-[16px] font-primary my-4">
              <div className="flex gap-2 space-y-2">
                <p className="font-semibold">Order Details:</p>{" "}
                <p className=" font-light">{orderDetails.serviceType}</p>
              </div>
              <p className="font-semibold">Decription:</p>{" "}
              <p className=" font-light">{orderDetails.description}</p>
            </div>

            <div className="text-[14px] font-primary my-4">
              <p className="font-semibold">Final Pricing</p>
              <div className="rounded-[15px] bg-[#F8F8F8] border border-[#E3E5E8] mt-[20px]">
                {orderDetails.pricingDetails.map((detail:any, index:number) => (
                  <div key={index} className="flex gap-[10px] w-full">
                    <p className="text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]">
                      {detail.label}
                    </p>
                    <p className="text-[16px] text-[#454B54] font-primary font-bold w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-[15px] bg-[#F8F8F8] border border-[#E3E5E8] mt-4">
                {orderDetails.taxDetails.map((item:any, index:number) => (
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
          </div>
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

export default OrderDetailsView;
