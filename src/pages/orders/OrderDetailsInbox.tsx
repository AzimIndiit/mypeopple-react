import { useNavigate, useParams } from "react-router-dom";
import backArrow from "@/assets/icons/backArrow.svg";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import checkSolidIcon from "@/assets/icons/check-solid.svg";
import attachmentIcon from "@/assets/icons/attachment-soild.svg";
import videoFillIcon from "@/assets/icons/video-filled.svg";
import docIcon from "@/assets/icons/doc-file.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import PopupModal from "@/components/Orders/PopupModal";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import avatar from "@/assets/images/avatar.png";
import { formatCurrency, getInitials } from "@/utils/helper";
import PopupEstimateModal from "@/components/Orders/PopupEstimateModal";
import PopupEstimateBillModal from "@/components/Orders/PopupEstimateBillModal";
const OrderDetailsInboxPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("id", id);
  const [isOpenBill, setIsOpenBill] = useState<any>({
    isOpen: false,
    data: null,
  });
  const [estimateStatus, setEstimateStatus] = useState<"edit" | "validated">(
    "edit"
  );
  console.log('isOpenBill.isOpen', isOpenBill.isOpen)
  const [content, setContent] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const currentUser = {
    id: 1,
    role: "client",
    name: "Tam Tran",
    email: "john.doe@example.com",
    avatar: avatar,
  };

  const otherUser = {
    id: 2,
    role: "HRBP",
    name: "Mélissa",
    email: "jane.smith@example.com",
    avatar: avatar,
  };

  const dummyMessages = [
    {
      id: 1,
      type: "text",
      message:
        "Hello, I would like an employment contract for an employee arriving next Tuesday. You will find all the necessary information in the attached documents.",
      date: "November 28, 2024 12:00 PM",
      sender: currentUser,
      attachment: [
        {
          id: 1,
          name: "Ludovic YOL CV",
          size: 1024,
        },
        {
          id: 2,
          name: "Ludovic YOL Bank Details",
          size: 1024,
        },
        {
          id: 3,
          name: "Recruitment Form YOL",
          size: 1024,
        },
      ],
    },
    {
      id: 2,
      type: "text",
      message:
        "Following our phone conversation, I reviewed the estimate to include the additional requests. Here is the estimate; please validate it!",
      date: "November 28, 2024 12:00 PM",
      sender: otherUser,
      attachment: [],
    },
    {
      id: 3,
      message: "New Estimate",
      date: "November 28, 2024 12:00 PM",
      sender: otherUser,
      attachment: [],
      estimateContent: {
        id: 1,
        additionalTranslation: 300,
        hrbpDiscount: 5,
      },

      type: "estimate",
    },
  ];

  const [messages, setMessages] = useState<typeof dummyMessages>(dummyMessages);

  const OrderInvoiceDetails = z.object({
    newMessage: z.string().min(1, { message: "Message is required" }),
    attachment: z
      .custom<File[]>(
        (val) =>
          val instanceof Array && val.every((file) => file instanceof File)
      )
      .optional(),
  });

  type OrderInvoiceDetails = z.infer<typeof OrderInvoiceDetails>;

  const form = useForm<OrderInvoiceDetails>({
    resolver: zodResolver(OrderInvoiceDetails),
    defaultValues: {
      newMessage: "",
      attachment: [],
    },
  });

  const onSubmit = (values: OrderInvoiceDetails) => {
    console.log(`Form Submitted`, values);
    let attachment: { id: number; name: string; size: number }[] = [];
    if (values.attachment) {
      attachment = values.attachment.map((file, index) => ({
        id: messages.length + index + 1,
        name: file.name,
        size: file.size,
      }));
    }

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        message: values.newMessage,
        date: new Date().toLocaleString(),
        sender: currentUser,
        attachment: attachment,
        type: "text",
      },
    ]);
    form.reset();
  };

  const files = form.watch("attachment") || [];
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

  console.log("files", files);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    console.log("messages", messages);
  }, [messages]);

  return (
    <div>
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
          <div className="w-full p-[20px] flex gap-4 rounded-[20px] bg-whiter border border-[#E4E4E4] my-4">
            <div className="w-full ">
              <div className="font-primary text-[16px] text-black p-[10px] rounded-[10px] bg-[#E3E3E3] w-fit">
                Order - {id}
              </div>
              <div className="text-[16px] font-primary my-4">
                <h1 className=" font-semibold">
                  Employment Contract Ludovic YOL
                </h1>
              </div>

              <div className="text-[14px] font-primary my-4 space-y-4 h-[60vh] overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2 " ref={messageRef}>
                    {message.type === "estimate" ? (
                      // Render estimate messages with a different style or extra info
                      <div className="">
                        {message.message && (
                          <p className=" font-semibold">{message.message}</p>
                        )}
                        {message?.estimateContent && (
                          <div className="rounded-[15px] bg-[#F8F8F8] border border-[#E3E5E8] mt-[20px]">
                            <div className="flex  gap-[10px]  w-full bg-black text-white rounded-t-[15px]">
                              <p
                                className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center `}
                              >
                                Internal Regulation
                              </p>
                              <p
                                className={`text-[14px]  font-primary  w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                              >
                                Included in the package
                              </p>
                            </div>

                            <div className="flex  gap-[10px]  w-full  ">
                              <p
                                className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]`}
                              >
                                Additional: Translation
                              </p>
                              <p
                                className={`text-[16px] text-[#454B54] font-primary font-bold w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                              >
                                {formatCurrency(
                                  message?.estimateContent
                                    ?.additionalTranslation
                                )}
                              </p>
                            </div>

                            <div className="flex  gap-[10px]  w-full  ">
                              <p
                                className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]`}
                              >
                                HRBP Discount
                              </p>
                              <p
                                className={`text-[16px] text-[#454B54] font-primary font-bold w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                              >
                                {message?.estimateContent?.hrbpDiscount} %
                              </p>
                            </div>
                            <hr className="w-full" />
                            <div className="flex  gap-[10px]  w-full  ">
                              <p
                                className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]`}
                              >
                                TOTAL BEFORE DISCOUNT
                              </p>
                              <p
                                className={`text-[16px] text-[#454B54] font-primary font-bold w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                              >
                                {formatCurrency(
                                  message?.estimateContent
                                    ?.additionalTranslation
                                )}{" "}
                              </p>
                            </div>
                            <div className="flex  gap-[10px]  w-full  ">
                              <p
                                className={`text-[14px] w-full text-left h-[48px] py-[14px] px-[16px] flex justify-start items-center text-[#454B54]`}
                              >
                                TOTAL AFTER DISCOUNT
                              </p>
                              <p
                                className={`text-[16px] text-[#454B54] font-primary font-bold w-full text-left  h-[48px]py-[14px] px-[16px] flex justify-start items-center`}
                              >
                                {formatCurrency(
                                  message?.estimateContent
                                    ?.additionalTranslation -
                                    (message?.estimateContent
                                      ?.additionalTranslation *
                                      message?.estimateContent?.hrbpDiscount) /
                                      100
                                )}{" "}
                              </p>
                            </div>
                          </div>
                        )}
                        {message?.estimateContent && (
                          <div className="flex  flex-col md:flex-row gap-[10px]  w-full justify-center my-4 text-[14px]  ">
                            <Button
                              type="button"
                              onClick={() => {
                                setIsOpen(true);
                                setEstimateStatus("edit");
                                setContent(message.estimateContent);
                              }}
                              className="w-full md:w-[140px] bg-[#C7C7C7] hover:bg-[#C7C7C7]/80 text-black h-[41px] font-light"
                            >
                              Edit Estimate
                            </Button>
                            <Button
                              type="button"
                              onClick={() => {
                                setIsOpen(true);
                                setEstimateStatus("validated");
                                setContent(message.estimateContent);
                              }}
                              className="w-full md:w-[140px] h-[41px] font-light "
                            >
                              Validate Estimate
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Default text message
                      <>
                        <div className="flex items-center gap-2">
                          <p className="text-[14px] font-primary text-primary">
                            {currentUser.id === message.sender.id ? (
                              "Me"
                            ) : (
                              <span>
                                {message.sender.name} |{" "}
                                <span className="font-semibold">
                                  {message.sender.role}
                                </span>{" "}
                              </span>
                            )}
                          </p>
                          <p className="text-[12px] font-primary text-gray-500">
                            {message.date}
                          </p>
                        </div>
                        <p className="text-[14px] font-primary bg-[rgba(252,64,6,0.08)] rounded-[10px] p-[10px]">
                          {message.message}
                        </p>
                      </>
                    )}
                    {message.attachment.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2">
                        {message.attachment.map((attachment, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-[10px] justify-between bg-gray-100 rounded-[7px] p-[15px] h-[54px]"
                          >
                            <span className="text-sm flex items-center gap-[10px] font-primary  capitalize">
                              <img
                                src={docIcon}
                                alt="doc"
                                className="w-[24px] h-[24px]"
                              />
                              {attachment.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <FormField
                control={form.control}
                name="newMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your message..."
                        className="bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mb-4 w-full">
                <FormField
                  control={form.control}
                  name="attachment"
                  render={({ field }) => (
                    <FormItem>
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
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  type="submit"
                  className="w-[140px] h-[41px] bg-black text-white"
                >
                  Send Message
                </Button>
              </div>
            </div>
            <div className="  border-l border-[#E4E4E4] px-4 w-[40%] relative ">
              <div className=" w-full  space-y-2">
                <div className="bg-gray-100 h-[60px] w-full flex  gap-2 rounded-[10px] p-[10px] items-center">
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage src={avatar} alt={currentUser.name} />
                    <AvatarFallback>
                      {getInitials(currentUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="!text-[14px] !font-primary capitalize font-light">
                      Created By
                    </p>
                    <p className="!text-[12px] !font-primary text-[#596569] capitalize  font-light">
                      {`${currentUser.name} | Me`}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-100 h-[60px] w-full flex  gap-2 rounded-[10px] p-[10px] items-center">
                  <Avatar className="w-[40px] h-[40px]">
                    <AvatarImage src={avatar} alt={otherUser.name} />
                    <AvatarFallback>
                      {getInitials(otherUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="!text-[14px] !font-primary capitalize font-light">
                      Handler/HRBP
                    </p>
                    <p className="!text-[12px] !font-primary text-[#596569] capitalize  font-light">
                      {otherUser.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 my-4">
                  <p className="text-[14px] font-primary text-primary">
                    Created On
                  </p>
                  <p className="text-[12px] font-primary text-gray-500">
                    November 28, 2024 12:00 PM
                  </p>
                </div>
                <Button
                  type="button"
                  className="bg-[#1DBF73] hover:bg-[#1DBF73]/80 h-[44px] w-full flex  gap-2 rounded-[15px] p-[10px] justify-start items-center font-light text-[12px]"
                >
                  <img
                    src={checkSolidIcon}
                    alt="attachment"
                    className="w-[24px] h-[24px]"
                  />{" "}
                  Mark as Complete
                </Button>
              </div>

              <div className="space-y-2 mt-4 absolute bottom-20  w-full left-0 px-4 ">
                <hr className="w-full my-4" />
                <div
                  className="w-full h-[44px] cursor-pointer bg-black text-white text-[14px] font-primary font-light flex items-center gap-[5px] rounded-[15px] p-[10px]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img
                    src={attachmentIcon}
                    alt="attachment"
                    className="w-[24px] h-[24px]"
                  />
                  Attach More
                </div>
                <div
                  className="w-full h-[44px] cursor-pointer bg-black text-white text-[14px] font-primary font-light flex items-center gap-[5px] rounded-[15px] p-[10px]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <img
                    src={videoFillIcon}
                    alt="attachment"
                    className="w-[24px] h-[24px]"
                  />
                  Start Video Call
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>

      {isOpen && (
        <PopupEstimateModal
          isOpen={isOpen}
          onOpenChange={() => {
            setIsOpen(false);
            // setIsOpenBill({ isOpen: false, data: null });
            setContent(null);
          }}
          onContinue={(value) => {
            console.log("values111111", value, estimateStatus);
            // const findMessage = messages.find(
            //   (message) => message.id === content.id
            // );
            // if (findMessage) {
            //   const newMessage = messages.map((message) =>
            //     message.id === content.id
            //       ? { ...message, estimateContent: value }
            //       : message
            //   );
            //   setMessages([...newMessage]);
            //   console.log("newMessage", newMessage);
            // }

            setIsOpenBill({ isOpen: true, data: value });
          }}
          estimateStatus={estimateStatus}
          data={content}
        />
      )}

      {isOpenBill.isOpen && (
        <PopupEstimateBillModal
          isOpen={isOpenBill.isOpen}
          onOpenChange={() => {
            setIsOpenBill({ isOpen: false, data: null });
          }}
          data={isOpenBill.data}
        />
      )}
    </div>
  );
};

export default OrderDetailsInboxPage;
