import { BarChartComponent } from "./BarChart";
import BillingHistoryTable from "./BillingHistoryTable";
import { PieChartComponent } from "./PieChart";

const BillingHistory = ({}: //   currentTab,
//   setCurrentTab,
{
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start w-full gap-4 my-4 ">
        <PieChartComponent />
        <BarChartComponent />
      </div>
      <BillingHistoryTable />
    </div>
  );
};

export default BillingHistory;
