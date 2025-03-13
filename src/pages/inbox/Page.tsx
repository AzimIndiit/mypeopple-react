import InboxTable from "@/components/Inbox/InboxTable";
import Header from "@/components/Inbox/Header";


export default function InboxPage({showFilters=true}:{showFilters?:boolean}) {
  return (
   <div className="w-full ">
    {showFilters && <div className='flex justify-between items-center w-full mb-4'>
        <Header/>
       </div>}
       <InboxTable isDashboard={!showFilters}/>
   </div>
  );
}
