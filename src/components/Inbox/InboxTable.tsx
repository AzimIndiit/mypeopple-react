import { cn } from "@/lib/utils";
import shareIcon from "@/assets/icons/share.svg";
import vieweyeIcon from "@/assets/icons/eye-bold.svg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/utils/helper";
import avatar from "@/assets/images/avatar.png";
type Inbox = {
  id: string;
  name: string;
  orderId: string;
  description: string;
  avatar: string;
  date: string;
};

const inboxData: Inbox[] = [
  {
    id: "IN 1256",
    name: "Iyana Keita",
    orderId: "#4563",
    description:
      "Following our phone conversation, I reviewed the estimate to include the additional requests I reviewed th...",
    avatar: avatar,
    date: "November 28, 2024  4:30 PM",
  },
  {
    id: "IN 1256",
    name: "Iyana Keita",
    orderId: "#4563",
    description:
      "Following our phone conversation, I reviewed the estimate to include the additional requests I reviewed th...",
    avatar: avatar,
     date: "November 28, 2024  4:30 PM",
  },
  {
    id: "IN 1256",
    name: "Iyana Keita",
    orderId: "#4563",
    description:
      "Following our phone conversation, I reviewed the estimate to include the additional requests I reviewed th...",
    avatar: avatar,
     date: "November 28, 2024  4:30 PM",
  },
  {
    id: "IN 1256",
    name: "Iyana Keita",
    orderId: "#4563",
    description:
      "Following our phone conversation, I reviewed the estimate to include the additional requests I reviewed th...",
    avatar: avatar,
     date: "November 28, 2024  4:30 PM",
  },
  {
    id: "IN 1256",
    name: "Iyana Keita",
    orderId: "#4563",
    description:
      "Following our phone conversation, I reviewed the estimate to include the additional requests I reviewed th...",
    avatar: avatar,
     date: "November 28, 2024  4:30 PM",
  },
  {
    id: "IN 1256",
    name: "Iyana Keita",
    orderId: "#4563",
    description:
      "Following our phone conversation, I reviewed the estimate to include the additional requests I reviewed th...",
    avatar: avatar,
     date: "November 28, 2024  4:30 PM",
  },
  {
    id: "IN 1256",
    name: "Iyana Keita",
    orderId: "#4563",
    description:
      "Following our phone conversation, I reviewed the estimate to include the additional requests I reviewed th...",
    avatar: avatar,
     date: "November 28, 2024  4:30 PM",
  },
  {
    id: "IN 1256",
    name: "Iyana Keita",
    orderId: "#4563",
    description:
      "Following our phone conversation, I reviewed the estimate to include the additional requests I reviewed th...",
    avatar: avatar,
     date: "November 28, 2024  4:30 PM",
  },
  {
    id: "IN 1256",
    name: "Iyana Keita",
    orderId: "#4563",
    description:
      "Following our phone conversation, I reviewed the estimate to include the additional requests I reviewed th...",
    avatar: avatar,
     date: "November 28, 2024  4:30 PM",
  },
  {
    id: "IN 1256",
    name: "Iyana Keita",
    orderId: "#4563",
    description:
      "Following our phone conversation, I reviewed the estimate to include the additional requests I reviewed th...",
    avatar: avatar,
     date: "November 28, 2024  4:30 PM",
  },
];

export default function InboxTable({
  isDashboard,
}: {
  isDashboard?: boolean;
}) {
  return (
    <div className={cn(" rounded-[20px] relative border-1 border-[#EFEEFC] p-[10px] md:p-[20px]  ")}>
      {inboxData.length > 0 ? (
        <div className="w-full space-y-2">
          {inboxData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 h-[79px] w-full flex  gap-2 rounded-[10px] p-[10px] items-center "
            >
              <Avatar className="w-[49px] h-[49px]">
                <AvatarImage src={item.avatar} alt={item.name} />
                <AvatarFallback>{getInitials(item.name)}</AvatarFallback>
              </Avatar>
              <div className="w-full ml-1">
               
                 <div className="flex justify-between items-center">
                 <p className="!text-[14px] !font-primary    font-semibold flex flex-col md:flex-row">
                  {item.name} <span className="text-[12px] font-light md:ml-2"> on Order {item.orderId}</span> 
                </p>
                <p className="!text-[12px] !font-primary  text-primary capitalize  font-light w-[100px] md:w-auto">
                  {item.date}
                </p>
                 </div>
                <p className="!text-[14px] !font-primary capitalize font-light text-[#596569] max-w-[100%] md:max-w-[80%]  line-clamp-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={cn(
            "flex justify-center items-center ",
            isDashboard ? "h-[100px]" : "min-h-[65vh]"
          )}
        >
          <p className="text-[14px] font-light text-black">No Invoice found</p>
        </div>
      )}
    </div>
  );
}
