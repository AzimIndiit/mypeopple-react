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
import { Link, useNavigate } from "react-router-dom";
type TransactionHistory = {
  id: string;
  date: string;
  amount: string;
  orderId:string;
  paymentMode:string;
  title: string;
};

const transactionHistory: TransactionHistory[] = [
  {
    id: "IN 1256",
    amount: "€ 4563",
    orderId:"ODR97898",
    paymentMode:"Card",
    title: "Employment Contract",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    orderId:"ODR97898",
    paymentMode:"Card",
    title: "Employment Contract",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    orderId:"ODR97898",
    paymentMode:"Card",
    title: "Employment Contract",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    orderId:"ODR97898",
    paymentMode:"Card",
    title: "Employment Contract",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    orderId:"ODR97898",
    paymentMode:"Card",
    title: "Employment Contract",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    orderId:"ODR97898",
    paymentMode:"Card",
    title: "Employment Contract",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    orderId:"ODR97898",
    paymentMode:"Card",
    title: "Employment Contract",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    orderId:"ODR97898",
    paymentMode:"Card",
    title: "Employment Contract",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    orderId:"ODR97898",
    paymentMode:"Card",
    title: "Employment Contract",
    date: "2024-01-01",
  },
];

const columns: { key: keyof TransactionHistory | "action"; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "title", label: "Related Order" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "paymentMode", label: "Payment" },

  { key: "action", label: "Invoice" }, // Special case: this is not in Order type
];

// Action Component
const getActionButton = ({  trans }: {  trans: TransactionHistory }) => {
  const navigate = useNavigate();
  return (
    <div className="text-[14px] font-primary text-[#858494] ">
     <Link to={`/settings/transaction-history/${trans.id}`} className="text-[14px] font-primary text-[#858494] underline">
     Details</Link>
    </div>
  );
};



export default function TransactionHistoryPage({}) {
  return (
    <div className={cn(" rounded-[20px] relative border-1 border-[#EFEEFC]  ")}>
      {transactionHistory.length > 0 ? (
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
                  className="p-[16px] sticky top-0 z-[100]"
                >
                  <p className="text-[#858494] font-light ">{column.label}</p>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionHistory.map((trans) => {
              return (
                <TableRow key={trans.id} className="!h-[61px] ">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className=" px-[16px] text-[#49465F] font-primary font-normal"
                    >
                      {column.key === "id" ? (
                        <p className="text-[14px] font-light text-primary">
                          {trans.id}
                        </p>
                      ) : column.key === "title" ? (
                        <p className="text-[14px] font-light ">
                          {trans.orderId} | {trans.title}
                        </p>
                      ) : column.key === "action" ? (
                        getActionButton({ trans })
                      ) : column.key === "date" ? (
                        formatDate(parseISO(trans.date), "d MMMM yyyy")
                      ) : (
                        (trans as any)[column.key]
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
          <p className="text-[14px] font-light text-black">No Transaction found</p>
        </div>
      )}
    </div>
  );
}
