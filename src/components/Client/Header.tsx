import SearchInput from "../SeachInput";
import { Button } from "../ui/button";
import filterIcon from "@/assets/icons/sort.svg";
import documentIcon from "@/assets/icons/document-solid.svg";
import { useNavigate } from "react-router-dom";
const Header = ({
  switchValue,
}: // setSwitchValue,
{
  switchValue: string;
  // setSwitchValue: (data:string) => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col xl:flex-row  justify-between w-full gap-4 md:gap-2">
      <div className="flex flex-col md:flex-row w-full gap-4">
        <div className="inline-flex items-center  bg-[#40404014] rounded-[22px] w-full md:w-[30%]">
          {["companies", "users"].map((value) => {
            console.log(value, "value");
            return (
              <button
                key={value}
                type="button"
                className={`cursor-pointer  flex justify-center items-center h-[64px] w-full rounded-[22px] text-[16px] font-primary font-bold transition-all capitalize
                ${
                  switchValue === value
                    ? "bg-primary text-white"
                    : "text-[#848199]"
                }`}
                onClick={() => navigate(`/clients/${value}`)}
              >
                {value}
              </button>
            );
          })}
        </div>
        <SearchInput
          placeholder="Search Here"
          className="md:!w-[80%]  xl:!w-[64%]"
          onSearch={(value) => {
            console.log("searchValue", value);
          }}
        />
      </div>
      <div className="flex  gap-4 items-center  justify-end">
        <Button variant="outline" className="border-black">
          <img src={filterIcon} alt="filter" /> Sort
        </Button>
        <Button variant="outline" className="border-black uppercase">
          <img src={documentIcon} alt="filter" /> Client Requests
        </Button>
      </div>
    </div>
  );
};

export default Header;
