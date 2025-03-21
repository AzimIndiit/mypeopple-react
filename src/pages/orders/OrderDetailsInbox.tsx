import { useNavigate, useParams } from "react-router-dom";
import backArrow from "@/assets/icons/backArrow.svg";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import PopupScheduleMeetingModal from "@/components/InboxMessage/ScheduleMeetingModal";
import PopupMeetingScheduled from "@/components/InboxMessage/MeetingScheduledModal";
import {
  Form,

} from "@/components/ui/form";

import avatar from "@/assets/images/avatar.png";
import PopupEstimateModal from "@/components/Orders/PopupEstimateModal";
import PopupEstimateBillModal from "@/components/Orders/PopupEstimateBillModal";
import PopupOrderReview from "@/components/Orders/PopupOrderReview";
import { MessageInput } from "@/components/InboxMessage/MessageInput";
import { MessageList } from "@/components/InboxMessage/MessageList";
import { SidePanel1 } from "@/components/InboxMessage/SidePanel1";
const OrderDetailsInboxPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpenBill, setIsOpenBill] = useState<any>({
    isOpen: false,
    data: null,
  });
  const [isOpenMeeting, setIsOpenMeeting] = useState(false);
  const [isOpenMeetingScheduled, setIsOpenMeetingScheduled] = useState(false);
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const [estimateStatus, setEstimateStatus] = useState<"edit" | "validated">(
    "edit"
  );

  const [content, setContent] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;
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


  const removeFile = (index: number) => {
    form.setValue(
      "attachment",
      files.filter((_, i) => i !== index) // Remove file at index
    );
    if (files.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleEstimateAction = (status: any, estimateData: any) => {
    setIsOpen(true);
    setEstimateStatus(status);
    setContent(estimateData);
  };

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
          <div className="w-full p-[20px] flex md:flex-row flex-col-reverse gap-4 rounded-[20px] bg-whiter border border-[#E4E4E4] my-4">
            <div className="w-full ">
              <div className="font-primary text-[16px] text-black p-[10px] rounded-[10px] bg-[#E3E3E3] w-fit">
                Order - {id}
              </div>
              <div className="text-[16px] font-primary my-4">
                <h1 className=" font-semibold">
                  Employment Contract Ludovic YOL
                </h1>
              </div>

        
              <MessageList
                messages={messages}
                messageRef={messageRef}
                onEstimateAction={handleEstimateAction}
                currentUserId={1}
              />
              <hr className="my-4" />
              <MessageInput
                form={form}
                files={files}
                fileInputRef={fileInputRef}
                removeFile={removeFile}
              />

              <div className="flex justify-end mt-4">
                <Button
                  type="submit"
                  className="w-[140px] h-[41px] bg-black text-white"
                >
                  Send Message
                </Button>
              </div>
            </div>
            <SidePanel1
              fileInputRef={fileInputRef}
              scheduledMeeting={() => setIsOpenMeeting(true)}
              otherUser={{
                id: 2,
                role: "Client",
                name: "Mélissa",
                email: "jane.smith@example.com",
                avatar,
              }}
              currentUser={currentUser}
            />
           
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
          onContinue={() => {
            // console.log("values111111", value, estimateStatus);
            setIsOpenBill({ isOpen: false, data: null });
            setReviewModal(true);
          }}
          data={isOpenBill.data}
        />
      )}

      {reviewModal && (
        <PopupOrderReview
          isOpen={reviewModal}
          onOpenChange={() => {
            setReviewModal(!reviewModal);
          }}
          data={{ orderNumber: "#788947678" }}
        />
      )}

{isOpenMeeting && (
        <PopupScheduleMeetingModal
          isOpen={isOpenMeeting}
          onOpenChange={() => {
            setIsOpenMeeting(false);
          }}
          onContinue={(values) => {
            console.log(values);
            setIsOpenMeeting(false);
            setContent(values);
            setIsOpenMeetingScheduled(true);
          }}
        />
      )}
      {isOpenMeetingScheduled && (
        <PopupMeetingScheduled
          isOpen={isOpenMeetingScheduled}
          data={content}
          onOpenChange={() => {
            setIsOpenMeetingScheduled(false);
          }}
        />
      )}
    </div>
  );
};

export default OrderDetailsInboxPage;
