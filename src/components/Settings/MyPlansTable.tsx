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
// import { useNavigate } from "react-router-dom";
type MyPlans = {
  id: string;
  date: string;
  amount: string;
  title: string;
};

const myPlans: MyPlans[] = [
  {
    id: "IN 1256",
    amount: "€ 4563",
    title: "Essential-Monthly",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    title: "Essential-Monthly",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    title: "Essential-Monthly",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    title: "Essential-Monthly",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    title: "Essential-Monthly",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    title: "Essential-Monthly",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    title: "Essential-Monthly",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    title: "Essential-Monthly",
    date: "2024-01-01",
  },
  {
    id: "IN 1256",
    amount: "€ 4563",
    title: "Essential-Monthly",
    date: "2024-01-01",
  },
];

const columns: { key: keyof MyPlans | "action"; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "date", label: "Date" },
  { key: "amount", label: "Amount" },
  { key: "action", label: "Action" }, // Special case: this is not in Order type
];

// Action Component
const getActionButton = (
  { 
    // myPlan 

  }: { myPlan?: MyPlans }
) => {
  // const navigate = useNavigate();
  return (
    <div className="text-[14px] font-primary text-[#858494] ">
      <div className="flex  gap-2  text-[12px] font-semibold justify-start items-center">
        <img
          onClick={() => {
            // navigate(`/settings/my-plans/${myPlan.id}`);
          }}
          src={vieweyeIcon}
          alt="View"
         
          className="w-[24px] h-[24px] "
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



export default function MyPlansTable({}) {
  return (
    <div className={cn(" rounded-[20px] relative border-1 border-[#EFEEFC]  ")}>
      {myPlans.length > 0 ? (
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
                  className="p-[16px] sticky top-0 z-[49] min-w-[100px]"
                >
                  <p className="text-[#858494] font-light ">{column.label}</p>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {myPlans.map((myPlan) => {
              return (
                <TableRow key={myPlan.id} className="!h-[61px] ">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className=" px-[16px] text-[#49465F] font-primary font-normal"
                    >
                      {column.key === "id" ? (
                        <p className="text-[14px] font-light text-primary">
                          {myPlan.id}
                        </p>
                      ) : column.key === "action" ? (
                        getActionButton({ myPlan })
                      ) : column.key === "date" ? (
                        formatDate(parseISO(myPlan.date), "d MMMM yyyy")
                      ) : (
                        (myPlan as any)[column.key]
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
          <p className="text-[14px] font-light text-black">No My Plans found</p>
        </div>
      )}
    </div>
  );
}
