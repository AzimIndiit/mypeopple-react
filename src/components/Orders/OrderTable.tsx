import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import shareIcon from "@/assets/icons/share.svg";
import vieweyeIcon from "@/assets/icons/eye-bold.svg";
import { formatDate, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
type Order = {
  id: string;
  name: string;
  type: string;
  date: string;
  amount: string;
  status: "paid" | "on-hold" | "rejected";
};

const orders: Order[] = [
  {
    id: "IN 1256",
    name: "John Doe",
    type: "Employment Contract",
    status: "paid",
    amount: "€ 4563",
    date: "2024-01-01",
  },
  {
    id: "IN 1257",
    name: "Jane Smith",
    type: "Freelance Agreement",
    status: "on-hold",
    amount: "€ 3200",
    date: "2024-01-05",
  },
  {
    id: "IN 1258",
    name: "Alice Johnson",
    type: "Consulting Contract",
    status: "rejected",
    amount: "€ 2750",
    date: "2024-01-10",
  },
  {
    id: "IN 1259",
    name: "Michael Brown",
    type: "Service Agreement",
    status: "paid",
    amount: "€ 5000",
    date: "2024-01-15",
  },
  {
    id: "IN 1260",
    name: "Emily Davis",
    type: "Sales Contract",
    status: "on-hold",
    amount: "€ 1500",
    date: "2024-01-20",
  },
  {
    id: "IN 1261",
    name: "Daniel Wilson",
    type: "Lease Agreement",
    status: "rejected",
    amount: "€ 1800",
    date: "2024-01-25",
  },
  {
    id: "IN 1262",
    name: "Sophia Martinez",
    type: "Service Agreement",
    status: "paid",
    amount: "€ 4500",
    date: "2024-02-01",
  },
  {
    id: "IN 1263",
    name: "James Anderson",
    type: "Consulting Contract",
    status: "on-hold",
    amount: "€ 3500",
    date: "2024-02-05",
  },
  {
    id: "IN 1264",
    name: "Olivia Thomas",
    type: "Freelance Agreement",
    status: "rejected",
    amount: "€ 2200",
    date: "2024-02-10",
  },
  {
    id: "IN 1265",
    name: "William Moore",
    type: "Employment Contract",
    status: "paid",
    amount: "€ 6000",
    date: "2024-02-15",
  },
  {
    id: "IN 1266",
    name: "Charlotte White",
    type: "Sales Contract",
    status: "on-hold",
    amount: "€ 2900",
    date: "2024-02-20",
  },
];

const columns: { key: keyof Order | "action"; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "type", label: "Type" },
  { key: "name", label: "Concerned HRBP" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" }, // Special case: this is not in Order type
];

// Action Component
const getActionButton = ({ order }: { order: Order }) => {
  const navigate = useNavigate();
  return (
    <div className="text-[14px] font-primary text-[#858494] ">
      <div className="flex  gap-2  text-[12px] font-semibold justify-start items-center">
        <img
          onClick={() => {
            const formattedId = order.id.replace(/\s+/g, "-");
              if(formattedId){
                navigate(`/orders/${formattedId}`)
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
      </div>
    </div>
  );
};

const getColor = (status: string) => {
  var colors = {
    rejected: "#fc4006",
    paid: "#1DBF73",
    "on-hold": "#FBBC05",
  };

  return colors[status as keyof typeof colors];
};
const getStatus = (status: string) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`flex justify-center items-center `} />
      <div
        style={{ backgroundColor: getColor(status) }}
        className={` rounded-full h-[5px] w-[5px]`}
      />
      <p className="text-[14px] font-light capitalize">
        {status === "on-hold" ? "On Hold" : status}
      </p>
    </div>
  );
};

export default function OrderTable({ isDashboard }: { isDashboard: boolean }) {
  return (
    <div className={cn(" rounded-[20px] relative border-1 border-[#EFEEFC]  ")}>
      {orders.length > 0 ? (
        <Table
          className={cn(
            "w-full overflow-x-auto relative overflow-auto",
            isDashboard ? "h-[400px]" : "h-full"
          )}
        >
          <TableHeader className="">
            <TableRow className=" text-[14px] font-primary text-[#858494]">
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  className="p-[16px] sticky top-0 z-[49]"
                >
                  <p className="text-[#858494] font-light ">{column.label}</p>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.slice(0, isDashboard ? 4 : orders.length).map((order) => {
              return (
                <TableRow key={order.id} className="!h-[61px] ">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className=" px-[16px] text-[#49465F] font-primary font-normal"
                    >
                      {column.key === "id" ? (
                        <p className="text-[14px] font-light text-black">
                          {order.id}
                        </p>
                      ) : column.key === "name" ? (
                        <p className="text-[14px] font-semibold text-black">
                          {order.name}
                        </p>
                      ) : column.key === "action" ? (
                        getActionButton({ order })
                      ) : column.key === "status" ? (
                        getStatus(order.status)
                      ) : column.key === "date" ? (
                        formatDate(parseISO(order.date), "d MMMM yyyy")
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
          className={cn(
            "flex justify-center items-center ",
            isDashboard ? "h-[100px]" : "min-h-[65vh]"
          )}
        >
          <p className="text-[14px] font-light text-black">No orders found</p>
        </div>
      )}
    </div>
  );
}
