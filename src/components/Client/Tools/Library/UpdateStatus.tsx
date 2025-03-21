import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from '@/components/ui/select';
import  { useState } from 'react'

const UpdateStatus =  ({status}:{status:string}) => {
        const [selectedStatus, setSelectedStatus] = useState(status);
      console.log('selectedStatus', selectedStatus)
const getColor = (status: string) => {
    var colors = {
      off: "#fc4006",
      on: "#1DBF73",
      // pending: "#FBBC05",
    };
  
    return colors[status as keyof typeof colors];
  };
        return (
          <div className="flex items-start gap-2 ">
         
            <Select onValueChange={setSelectedStatus} defaultValue={selectedStatus} >
              <SelectTrigger className=" flex justify-start items-center !p-0 bg-white border border-white">
                <p
                  className="text-[14px] font-light capitalize"
                  style={{ color: getColor(selectedStatus) }}
                >
                  {selectedStatus}
                </p>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="on">On</SelectItem>
                  <SelectItem value="off">Off</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      
}

export default UpdateStatus