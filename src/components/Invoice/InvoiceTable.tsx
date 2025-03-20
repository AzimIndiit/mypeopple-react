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
type Invoice = {
  id: string;
  type: string;
  date: string;
  amount: string;
  status: "paid" | "on-hold" | "rejected";
};

const invoices: Invoice[] = [
  {
    id: "IN 1256",
    type: "Employment Contract",
    status: "paid",
    amount: "€ 4563",
    date: "2024-01-01",
  },
  {
    id: "IN 1257",
    type: "Freelance Agreement",
    status: "on-hold",
    amount: "€ 3200",
    date: "2024-01-05",
  },
  {
    id: "IN 1258",
    type: "Consulting Contract",
    status: "rejected",
    amount: "€ 2750",
    date: "2024-01-10",
  },
  {
    id: "IN 1259",
    type: "Service Agreement",
    status: "paid",
    amount: "€ 5000",
    date: "2024-01-15",
  },
  {
    id: "IN 1260",
    type: "Sales Contract",
    status: "on-hold",
    amount: "€ 1500",
    date: "2024-01-20",
  },
  {
    id: "IN 1261",
    type: "Lease Agreement",
    status: "rejected",
    amount: "€ 1800",
    date: "2024-01-25",
  },
  {
    id: "IN 1262",
    type: "Service Agreement",
    status: "paid",
    amount: "€ 4500",
    date: "2024-02-01",
  },
  {
    id: "IN 1263",
    type: "Consulting Contract",
    status: "on-hold",
    amount: "€ 3500",
    date: "2024-02-05",
  },
  {
    id: "IN 1264",
    type: "Freelance Agreement",
    status: "rejected",
    amount: "€ 2200",
    date: "2024-02-10",
  },
  {
    id: "IN 1265",
    type: "Employment Contract",
    status: "paid",
    amount: "€ 6000",
    date: "2024-02-15",
  },
  {
    id: "IN 1266",
    type: "Sales Contract",
    status: "on-hold",
    amount: "€ 2900",
    date: "2024-02-20",
  },
];

const columns: { key: keyof Invoice | "action"; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "type", label: "Type" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" }, // Special case: this is not in Order type
];

// Action Component
const getActionButton = ({ invoice }: { invoice: Invoice }) => {
  return (
    <div className="text-[14px] font-primary text-[#858494] ">
      <div className="flex  gap-2  text-[12px] font-semibold justify-start items-center">
        <img
          onClick={() => {console.log('invoice', invoice)}}
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

export default function InvoiceTable({ isDashboard }: { isDashboard?: boolean }) {
  return (
    <div className={cn(" rounded-[20px] relative border-1 border-[#EFEEFC]  ")}>
      {invoices.length > 0 ? (
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
                  className={cn("p-[16px] sticky top-0 z-[49] min-w-[100px] min-w-[125px]",["type","date"].includes(column.key) && "min-w-[200px]")}
                >
                  <p className="text-[#858494] font-light ">{column.label}</p>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices
              .slice(0, isDashboard ? 4 : invoices.length)
              .map((invoice) => {
                return (
                  <TableRow key={invoice.id} className="!h-[61px] ">
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={" px-[16px] text-[#49465F] font-primary font-normal"}
                      >
                        {column.key === "id" ? (
                          <p className="text-[14px] font-light text-black">
                            {invoice.id}
                          </p>
                        ) :  column.key === "action" ? (
                          getActionButton({ invoice })
                        ) : column.key === "status" ? (
                          getStatus(invoice.status)
                        ) : column.key === "date" ? (
                          formatDate(parseISO(invoice.date), "d MMMM yyyy")
                        ) : (
                          (invoice as any)[column.key]
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
          <p className="text-[14px] font-light text-black">
            No Invoice found
          </p>
        </div>
      )}
    </div>
  );
}
