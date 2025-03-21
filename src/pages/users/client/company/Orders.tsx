import ClientOrderTable from "@/components/Client/Order/ClientOrderTable";
import Header from "@/components/Client/Order/Header";


export default function ClientOrders({showFilters}:{showFilters:boolean}) {
  return (
   <div className="w-full ">
    {showFilters && <div className='flex justify-between items-center w-full mb-4'>
      
        <Header/>
       </div>}
       <ClientOrderTable />
   </div>
  );
}
