import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import avatar from "@/assets/images/avatar.png";
import PopupEstimateModal from "@/components/Orders/PopupEstimateModal";
import PopupEstimateBillModal from "@/components/Orders/PopupEstimateBillModal";
import PopupOrderReview from "@/components/Orders/PopupOrderReview";
import { MessageList } from "@/components/InboxMessage/MessageList";
import { MessageInput } from "@/components/InboxMessage/MessageInput";
import { SidePanel } from "@/components/InboxMessage/SidePanel";
import { PageHeader } from "@/components/PageHeader";
import { useNavigate } from "react-router-dom";
import PopupScheduleMeetingModal from "@/components/InboxMessage/ScheduleMeetingModal";
import PopupMeetingScheduled from "@/components/InboxMessage/MeetingScheduledModal";

const createDummyMessages = () => {
  const currentUser = {
    id: 1,
    role: "client",
    name: "Tam Tran",
    email: "john.doe@example.com",
    avatar: avatar,
  };

  const otherUser = {
    id: 2,
    role: "Client",
    name: "Mélissa",
    email: "jane.smith@example.com",
    avatar: avatar,
  };

  return [
    {
      id: 1,
      type: "text",
      message:
        "Hello, I would like an employment contract for an employee arriving next Tuesday. You will find all the necessary information in the attached documents.",
      date: "November 28, 2024 12:00 PM",
      sender: currentUser,
      estimateContent: null,
      attachment: [],
    },
    {
      id: 2,
      type: "text",
      message:
        "Following our phone conversation, I reviewed the estimate to include the additional requests. Here is the estimate; please validate it!",
      date: "November 28, 2024 12:00 PM",
      sender: otherUser,
      attachment: [],
      estimateContent: null,
    },
    {
      id: 3,
      type: "text",
      message:
        "Following our phone conversation, I reviewed the estimate to include the additional requests. Here is the estimate; please validate it!",
      date: "November 28, 2024 12:00 PM",
      sender: currentUser,
      attachment: [],
      estimateContent: null,
    },
    {
      id: 4,
      type: "text",
      message:
        " I've reviewed your order n°412562. , please accept it! Best regards.",
      date: "November 28, 2024 12:00 PM",
      sender: currentUser,
      attachment: [],
      estimateContent: null,
    },
    {
      id: 5,
      type: "text",
      message:
        "Following our phone conversation, I reviewed the estimate to include the additional requests. Here is the estimate; please validate it!",
      date: "November 28, 2024 12:00 PM",
      sender: otherUser,
      attachment: [],
      estimateContent: null,
    },
    {
      id: 6,
      type: "text",
      message: "Please Call me back",
      date: "November 28, 2024 12:00 PM",
      sender: currentUser,
      attachment: [],
      estimateContent: null,
    },
    {
      id: 7,
      type: "meeting",
      message:
        "The meeting will be recorded, then made available for download to all participants.",
      date: "November 28, 2024 12:00 PM",
      sender: currentUser,
      attachment: [],
      meetingStatus: "upcoming",
      estimateContent: null,
    },
    {
      id: 8,
      type: "meeting",
      message: "The recording is ready! You can watch it for 30 days.",
      date: "November 28, 2024 12:00 PM",
      sender: currentUser,
      attachment: [],
      meetingStatus: "ended",
      estimateContent: null,
      tags: [],
    },
    {
      id: 9,
      type: "text",
      message: `For mentioned order OD20250125, please send us or place on the drive the
following documents required for processing. This concerns the employee John
Kelly. Please do not hesitate to contact me if you need any assistance`,
      date: "November 28, 2024 12:00 PM",
      sender: otherUser,
      attachment: [],
      tags: ["Employment contract", "Employee Phone number","Employee ID","Health Care Company Agreement"],
      estimateContent: null,
    },
  ];
};

const InboxMessagePage = () => {
  const navigate = useNavigate();
  const messageRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(
    null
  ) as React.MutableRefObject<HTMLInputElement>;

  // State management
  const [messages, setMessages] = useState(createDummyMessages());
  const [content, setContent] = useState(null);
  const [estimateStatus, setEstimateStatus] = useState("edit");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMeeting, setIsOpenMeeting] = useState(false);
  const [isOpenMeetingScheduled, setIsOpenMeetingScheduled] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [isOpenBill, setIsOpenBill] = useState({ isOpen: false, data: null });

  const OrderInvoiceSchema = z.object({
    newMessage: z.string().min(1, { message: "Message is required" }),
    attachment: z
      .custom(
        (val) =>
          val instanceof Array && val.every((file) => file instanceof File)
      )
      .optional(),
  });
  const form = useForm({
    resolver: zodResolver(OrderInvoiceSchema),
    defaultValues: {
      newMessage: "",
      attachment: [],
    },
  });

  // Submit handler for new messages
  const onSubmit = (values: any) => {
    const attachment = values.attachment
      ? values.attachment.map((file: any, index: any) => ({
          id: messages.length + index + 1,
          name: file.name,
          size: file.size,
        }))
      : [];

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        message: values.newMessage,
        date: new Date().toLocaleString(),
        sender: {
          id: 1,
          role: "client",
          name: "Tam Tran",
          email: "john.doe@example.com",
          avatar,
        },
        attachment,
        type: "text",
        estimateContent: null,
      },
    ]);
    form.reset();
  };

  // File handling
  const files: any = form.watch("attachment") || [];

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFiles = Array.from(event.target.files || []);
  //   if (selectedFiles.length + files.length > 5) {
  //     alert("You can upload a maximum of 5 files.");
  //     return;
  //   }
  //   form.setValue("attachment", [...files, ...selectedFiles]);
  // };

  const removeFile = (index: any) => {
    form.setValue(
      "attachment",
      files.filter((_: any, i: any) => i !== index)
    );
    if (files.length === 1 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Auto-scroll to new messages
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Estimate flow handlers
  const handleEstimateAction = (status: any, estimateData: any) => {
    setIsOpen(true);
    setEstimateStatus(status);
    setContent(estimateData);
  };

  const handleEstimateContinue = (value: any) => {
    setIsOpenBill({ isOpen: true, data: value });
  };

  return (
    <div className="">
      <PageHeader
        title="Client Inbox"
        onAdd={() => navigate("/orders/create")}
        buttonText="Create Order with HRBP"
        onBack={() => navigate(-1)}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <div className="w-full p-[20px] flex md:flex-row flex-col-reverse gap-4 rounded-[20px] bg-whiter border border-[#E4E4E4] my-4">
            <div className="w-full">
              <MessageList
                messages={messages}
                messageRef={messageRef}
                onEstimateAction={handleEstimateAction}
                currentUserId={1}
              />

              <MessageInput
                form={form}
                files={files}
                fileInputRef={fileInputRef}
                removeFile={removeFile}
              />

              <div className="flex md:flex-row flex-col-reverse  justify-end mt-4 gap-2">
                <Button
                  type="button"
                  onClick={() => {}}
                  className=" md:w-[140px] w-full h-[41px] bg-black text-white"
                >
                  Place an Order
                </Button>
                <Button
                  onClick={() => {}}
                  type="button"
                  className="md:w-[140px] w-full h-[41px] bg-black text-white"
                >
                  Call me back
                </Button>
                <Button
                  type="submit"
                  className="md:w-[140px] w-full h-[41px] bg-black text-white"
                >
                  Send Message
                </Button>
              </div>
            </div>

            <SidePanel
              fileInputRef={fileInputRef}
              scheduledMeeting={()=>setIsOpenMeeting(true)}
              otherUser={{
                id: 2,
                role: "Client",
                name: "Mélissa",
                email: "jane.smith@example.com",
                avatar,
              }}
            />
          </div>
        </form>
      </Form>

      {isOpen && (
        <PopupEstimateModal
          isOpen={isOpen}
          onOpenChange={() => {
            setIsOpen(false);
            setContent(null);
          }}
          onContinue={handleEstimateContinue}
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
          onContinue={(values)=>{
            console.log(values)
            setIsOpenMeeting(false)
            setContent(values)
            setIsOpenMeetingScheduled(true)
          }}
        />
      )}
    { isOpenMeetingScheduled && (
        <PopupMeetingScheduled
          isOpen={ isOpenMeetingScheduled }
          data={content}
          onOpenChange={() => {
            setIsOpenMeetingScheduled(false);
          }}
        
        />
      )}
    </div>
  );
};

export default InboxMessagePage;
