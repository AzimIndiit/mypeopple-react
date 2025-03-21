import Header from "@/components/Client/Tools/Library/Header";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import infoSolidIcon from "@/assets/icons/info-solid.svg";
import LibraryTable from "@/components/Client/Tools/Library/LibraryTable";
import AppsTable from "@/components/Client/Tools/Apps/AppsTable";

export default function ClientTools() {
  return (
    <div className="w-full ">
      <div>
        <div className="text-[16px] font-primary font-medium text-black  my-4">
          Apps
        </div>
        <AppsTable />
        <div className="my-4 flex gap-4 ">
          <Button className="h-[40px] w-fit">
            <Plus /> Add Free Plan App Link
          </Button>

          <div className="h-[40px] w-fit flex items-center">
            <img src={infoSolidIcon} alt="filter" />
          </div>
        </div>
      </div>
      <div className="my-4">
        <div className="flex justify-between items-center w-full mb-4">
          <Header />
        </div>
        <LibraryTable />
        <div className="my-4 flex gap-4 ">
          <Button className="h-[40px] w-fit">
            <Plus /> Add Document
          </Button>
        </div>
      </div>
    </div>
  );
}
