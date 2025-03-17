import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import downloadIcon from "@/assets/icons/download.svg";
import { formatDate, parseISO } from "date-fns";
type BillingHistory = {
  id: string;
  date: string;
  status: "paid" | "pending" | "failed";
  currency: string;
  total: string;
  service: string;
  document: string;
};

const billingHistory: BillingHistory[] = [
  {
    id: "IN 1256",
    status: "paid",
    currency: "€",
    total: "4563",
    service: "basic",
    document: "invoice",
    date: "2024-01-01",
  },
  {
    id: "IN 1257",
    status: "pending",
    currency: "€",
    total: "3890",
    service: "invest",
    document: "receipt",
    date: "2024-01-05",
  },
  {
    id: "IN 1258",
    status: "paid",
    currency: "€",
    total: "5120",
    service: "basic",
    document: "invoice",
    date: "2024-02-10",
  },
  {
    id: "IN 1259",
    status: "failed",
    currency: "€",
    total: "2750",
    service: "invest",
    document: "invoice",
    date: "2024-02-15",
  },
  {
    id: "IN 1260",
    status: "paid",
    currency: "€",
    total: "1999",
    service: "basic",
    document: "receipt",
    date: "2024-03-01",
  },
  {
    id: "IN 1261",
    status: "pending",
    currency: "€",
    total: "6200",
    service: "invest",
    document: "invoice",
    date: "2024-03-12",
  },
  {
    id: "IN 1262",
    status: "paid",
    currency: "€",
    total: "3400",
    service: "basic",
    document: "receipt",
    date: "2024-04-05",
  },
  {
    id: "IN 1263",
    status: "failed",
    currency: "€",
    total: "4800",
    service: "invest",
    document: "invoice",
    date: "2024-04-20",
  },
  {
    id: "IN 1264",
    status: "paid",
    currency: "€",
    total: "2755",
    service: "basic",
    document: "invoice",
    date: "2024-05-01",
  },
  {
    id: "IN 1265",
    status: "pending",
    currency: "€",
    total: "7200",
    service: "invest",
    document: "receipt",
    date: "2024-05-15",
  },
];



const columns: { key: keyof BillingHistory | "action"; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "date", label: "Date" },

  { key: "document", label: "Document" },
  { key: "service", label: "Service" },

  { key: "currency", label: "Currency" },
  { key: "total", label: "Total" },
  { key: "status", label: "Status" },

  { key: "action", label: "Action" }, // Special case: this is not in Order type
];

// Action Component
const getActionButton = ({ billing }: { billing: BillingHistory }) => {
  return (
    <div className="text-[14px] font-primary text-[#858494] ">
      <div className="flex  gap-2  text-[12px] font-semibold justify-start items-center">
        <img
          onClick={() => {
            console.log("billing", billing);
          }}
          src={downloadIcon}
          alt="download"
          className="w-[24px] h-[24px]"
        />
       
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

export default function BillingHistoryTable({}) {
  return (
    <div className={cn(" rounded-[20px] relative border-1 border-[#EFEEFC]  ")}>
      {billingHistory.length > 0 ? (
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
            {billingHistory.map((billing) => {
              return (
                <TableRow key={billing.id} className="!h-[61px] ">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className=" px-[16px] text-[#49465F] font-primary font-normal"
                    >
                      {column.key === "id" ? (
                        <p className="text-[14px] font-light text-primary">
                          {billing.id}
                        </p>
                      ) : column.key === "action" ? (
                        getActionButton({ billing })
                      ) : column.key === "status" ? (
                        getStatus(billing.status)
                      ) : column.key === "date" ? (
                        formatDate(parseISO(billing.date), "d MMMM yyyy")
                      ) : (
                        (billing as any)[column.key]
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
          <p className="text-[14px] font-light text-black">
            No Billing History found
          </p>
        </div>
      )}
    </div>
  );
}
