import ClientOrderTable from "@/components/Client/Sourcing/SourcingTable";
import Header from "@/components/Client/Sourcing/Header";
import { useState } from "react";
import CreateSourcingModal from "@/components/Client/Sourcing/CreateSourcingModal";

export default function ClientSourcing() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full ">
      <div className="flex justify-between items-center w-full mb-4">
        <Header
          title="Pending Sourcing Requests
"
          onAdd={() => {setShowModal(true)}}
          buttonText="Sourcing Request"
        />
      </div>
      <ClientOrderTable />

      {showModal && (
        <CreateSourcingModal isOpen={showModal} onOpenChange={()=>setShowModal(false)} />
      )}
    </div>
  );
}
