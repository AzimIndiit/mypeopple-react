import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import shareIcon from "@/assets/icons/share-solid-primary.svg";
import vieweyeIcon from "@/assets/icons/eye-solid-primary.svg";
import deleteIcon from "@/assets/icons/delete-solid-primary.svg";
import { formatDate, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import checkedIcon from "@/assets/icons/checked-green.svg";
import UpdateStatus from "./UpdateStatus";
type Order = {
  id: string;
  name: string;
  user: string;
  lastDate: string;
  author: string;
  label: string;
  status: string;
};

const orders: Order[] = [
  {
    id: "IN 1256",
    name: "Contact Template",
    user: "Tam Tran",
    author: "Lilly Smith(HRBP)",
    label: "checked",
    status: "on",
    lastDate: "2024-01-01",
  },
  {
    id: "IN 1257",
    name: "Layoff Letter US",
    user: "Tam Tran",

    author: "Admin",
    label: "checked",
    status: "off",
    lastDate: "2024-01-05",
  },
];

const columns: { key: keyof Order | "action"; label: string }[] = [
  // { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "user", label: "User" },
  { key: "author", label: "Author" },
  { key: "lastDate", label: "Last Date" },
  { key: "label", label: "Lables" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" }, // Special case: this is not in Order type
];

const getIcon = (status: string) => {
  var colors = {
    checked: checkedIcon,
    // on: "#1DBF73",
    // pending: "#FBBC05",
  };

  return colors[status as keyof typeof colors];
};

// Action Component
const getActionButton = ({ order }: { order: Order }) => {
  const navigate = useNavigate();
  return (
    <div className="text-[14px] font-primary text-[#858494] ">
      <div className="flex  gap-2  text-[12px] font-semibold justify-start items-center">
        <img
          onClick={() => {
            const formattedId = order.id.replace(/\s+/g, "-");
            if (formattedId) {
              navigate(`/orders/${formattedId}`);
            }
          }}
          src={vieweyeIcon}
          alt="View"
          className="w-[24px] h-[24px]"
        />{" "}
        <img
          onClick={() => {}}
          src={shareIcon}
          alt="share"
          className="w-[24px] h-[24px]"
        />{" "}
        <img
          onClick={() => {}}
          src={deleteIcon}
          alt="delete"
          className="w-[24px] h-[24px]"
        />{" "}
      </div>
    </div>
  );
};

export default function FilesTable() {
  return (
    <div className={cn(" rounded-[20px] relative border-1 border-[#EFEEFC]  ")}>
      {orders.length > 0 ? (
        <Table
          className={cn(
            "w-full overflow-x-auto relative overflow-auto",
            "h-full"
          )}
        >
          <TableHeader className="">
            <TableRow className=" text-[14px] font-primary text-[#858494]">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className={cn(
                    "p-[16px] sticky top-0 z-[49] min-w-[100px] ",
                    ["name", "user", "date"].includes(column.key) &&
                      "min-w-[100px]"
                  )}
                >
                  <p className="text-[#858494] font-light ">{column.label}</p>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              return (
                <TableRow key={order.id} className="!h-[61px] ">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className=" px-[16px] text-[#49465F] font-primary font-normal"
                    >
                      {column.key === "id" ? (
                        <p className="text-[14px] font-light text-primary">
                          {order.id}
                        </p>
                      ) : column.key === "name" ? (
                        <p className="text-[14px] font-light">{order.name}</p>
                      ) : column.key === "action" ? (
                        getActionButton({ order })
                      ) : column.key === "label" ? (
                        <img
                          src={getIcon(order.label)}
                          className="h-[32px] w-[32px]"
                        />
                      ) : column.key === "status" ? (
                        <UpdateStatus status={order.status} />
                      ) : column.key === "lastDate" ? (
                        formatDate(parseISO(order.lastDate), "d MMMM yyyy")
                      ) : (
                        (order as any)[column.key]
                      )}
                    </td>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div
          className={cn("flex justify-center items-center ", "min-h-[65vh]")}
        >
          <p className="text-[14px] font-light text-black">No Library Found</p>
        </div>
      )}
    </div>
  );
}
