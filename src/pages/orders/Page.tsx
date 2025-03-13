import Header from "@/components/Orders/Header";
import OrderTable from "@/components/Orders/OrderTable";


export default function OrdersPage({showFilters}:{showFilters:boolean}) {
  return (
   <div className="w-full ">
    {showFilters && <div className='flex justify-between items-center w-full mb-4'>
        <Header/>
       </div>}
       <OrderTable isDashboard={!showFilters}/>
   </div>
  );
}
