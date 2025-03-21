import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import vieweyeIcon from "@/assets/icons/eye-bold.svg";
import { formatDate, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
type Company = {
  id: string;
  name: string;
  type: string;
  date: string;
  activity: string;
  status: "active" | "unactive" | "deleted";
};

const companies: Company[] = [
  {
    id: "IN 1256",
    name: "EcoFlex",
    type: "Interim Mngt",
    status: "active",
    activity: "4563",
    date: "2024-01-01",
  },
  {
    id: "IN 1257",
    name: "Jane Smith",
    type: "Advanced Plan",
    status: "unactive",
    activity: "3200",
    date: "2024-01-05",
  },
  {
    id: "IN 1258",
    name: "Knightwing",
    type: "Consulting Contract",
    status: "deleted",
    activity: "2750",
    date: "2024-01-10",
  },
  {
    id: "IN 1259",
    name: "LockAngle",
    type: "Service Agreement",
    status: "active",
    activity: "5000",
    date: "2024-01-15",
  },
  {
    id: "IN 1260",
    name: "NationWide",
    type: "Basic Pla",
    status: "unactive",
    activity: "1500",
    date: "2024-01-20",
  },
  {
    id: "IN 1261",
    name: "Sample",
    type: "Lease Agreement",
    status: "deleted",
    activity: "1800",
    date: "2024-01-25",
  },
  {
    id: "IN 1262",
    name: "Sophia Martinez",
    type: "Service Agreement",
    status: "active",
    activity: "4500",
    date: "2024-02-01",
  },
  {
    id: "IN 1263",
    name: "Rubbostaff",
    type: "Consulting Contract",
    status: "unactive",
    activity: "3500",
    date: "2024-02-05",
  },
  {
    id: "IN 1264",
    name: "Olivia Thomas",
    type: "Advanced Plan",
    status: "deleted",
    activity: "2200",
    date: "2024-02-10",
  },
  {
    id: "IN 1265",
    name: "William Moore",
    type: "Interim Mngt",
    status: "active",
    activity: "6000",
    date: "2024-02-15",
  },
  {
    id: "IN 1266",
    name: "Charlotte White",
    type: "Basic Pla",
    status: "unactive",
    activity: "2900",
    date: "2024-02-20",
  },
];

const columns: { key: keyof Company | "action"; label: string }[] = [
  // { key: "id", label: "ID" },
  { key: "name", label: "Company" },
  { key: "type", label: "Services" },

  { key: "date", label: "Date" },
  { key: "status", label: "Status" },
  { key: "activity", label: "Activity" },
  { key: "action", label: "Action" }, // Special case: this is not in Order type
];

// Action Component
const getActionButton = ({ item }: { item: Company }) => {
  const navigate = useNavigate();
  return (
    <div className="text-[14px] font-primary text-[#858494] ">
      <div className="flex  gap-2  text-[12px] font-semibold justify-start items-center">
        <img
          onClick={() => {
            const formattedId = item.id.replace(/\s+/g, "-");
              if(formattedId){
                navigate(`/clients/companies/${formattedId}`)
              }
          }}
          src={vieweyeIcon}
          alt="View"
          className="w-[24px] h-[24px]"
        />{" "}
        {/* <img
          onClick={() => {}}
          src={shareIcon}
          alt="share"
          className="w-[24px] h-[24px]"
        />{" "} */}
      </div>
    </div>
  );
};

const getColor = (status: string) => {
  var colors = {
    deleted: "#fc4006",
    active: "#1DBF73",
    "unactive": "#FBBC05",
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
        { status}
      </p>
    </div>
  );
};

export default function CompaniesTable({ isDashboard }: { isDashboard?: boolean }) {
  return (
    <div className={cn(" rounded-[20px] relative border-1 border-[#EFEEFC]  ")}>
      {companies.length > 0 ? (
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
                  className={cn("p-[16px] sticky top-0 z-[49] min-w-[100px] ",["type","date"].includes(column.key) && "min-w-[200px]")}
                >
                  <p className="text-[#858494] font-light ">{column.label}</p>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.slice(0, isDashboard ? 4 : companies.length).map((item) => {
              return (
                <TableRow key={item.id} className="!h-[61px] ">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className=" px-[16px] text-[#49465F] font-primary font-normal"
                    >
                      {column.key === "id" ? (
                        <p className="text-[14px] font-light text-black">
                          {item.id}
                        </p>
                      ) : column.key === "type" ? (
                        <p className="text-[14px] font-semibold text-black">
                          {item.type}
                        </p>
                      ) : column.key === "action" ? (
                        getActionButton({ item })
                      ) : column.key === "status" ? (
                        getStatus(item.status)
                      ) : column.key === "date" ? (
                        formatDate(parseISO(item.date), "d MMMM yyyy")
                      ) : (
                        (item as any)[column.key]
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
          <p className="">No Companies Found</p>
        </div>
      )}
    </div>
  );
}
