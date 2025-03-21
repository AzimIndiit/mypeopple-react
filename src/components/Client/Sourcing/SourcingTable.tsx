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
import { formatDate, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
type Order = {
  id: string;
  client:string;
  name: string;
  user: string;
  date: string;
  amount: string;
  status: "completed" | "pending" | "failed";
};

const orders: Order[] = [
  {
    id: "IN 1256",
    client:"Shreya Mandal",
    name: "Ecoflex",
    user: "Amir Mahmud",
    status: "pending",
    amount: "€ 4563",
    date: "2024-01-01",
  },
  {
    id: "IN 1257",
    client:"Shreya Mandal",
    name: "Ecoflex",
    user: "Rohit Mehta",
    status: "pending",
    amount: "€ 3200",
    date: "2024-01-05",
  },
  {
    id: "IN 1258",
    client:"Felipe Suárez",
    name: "Ecoflex",
    user: "Rohit Mehta",
    status: "pending",
    amount: "€ 2750",
    date: "2024-01-10",
  },
  {
    id: "IN 1256",
    client:"Shreya Mandal",
    name: "Ecoflex",
    user: "Amir Mahmud",
    status: "pending",
    amount: "€ 4563",
    date: "2024-01-01",
  },
  {
    id: "IN 1257",
    client:"Shreya Mandal",
    name: "Ecoflex",
    user: "Rohit Mehta",
    status: "pending",
    amount: "€ 3200",
    date: "2024-01-05",
  },
  {
    id: "IN 1258",
    client:"Felipe Suárez",
    name: "Ecoflex",
    user: "Rohit Mehta",
    status: "pending",
    amount: "€ 2750",
    date: "2024-01-10",
  },
];

const columns: { key: keyof Order | "action"; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "client", label: "User" },
  { key: "name", label: "Company" },
  { key: "user", label: "HRBP" },
  { key: "date", label: "Order Date" },
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
    failed: "#fc4006",
    completed: "#1DBF73",
    pending: "#FBBC05",
  };

  return colors[status as keyof typeof colors];
};
const getStatus = (status: string) => {
  return (
    <div className="flex items-center gap-2">
      <div className={`flex justify-center items-center `} />
   
      <p className="text-[14px] font-light capitalize"  style={{ color: getColor(status) }}>
        { status}
      </p>
    </div>
  );
};

export default function SourcingTable() {
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
                  className={cn("p-[16px] sticky top-0 z-[49] min-w-[100px] ",["name","user","date"].includes(column.key) && "min-w-[100px]")}
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
                        <p className="text-[14px] font-light">
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
            "min-h-[65vh]"
          )}
        >
          <p className="text-[14px] font-light text-black">No Orders Found</p>
        </div>
      )}
    </div>
  );
}
