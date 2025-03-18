import { Button } from "@/components/ui/button";
import backArrow from "@/assets/icons/backArrow.svg";
import addIcon from "@/assets/icons/add-solid.svg";
import switchIcon from "@/assets/icons/outline_switch.svg";
import { useNavigate } from "react-router-dom";
export const PageHeader = ({
  title,
  onAdd,
  buttonText,
  icon = addIcon,
}: {
  title: string;
  onAdd?: () => void;
  buttonText?: string;
  icon?: any;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <div className="cursor-pointer w-[30px]" onClick={() => navigate(-1)}>
          <img src={backArrow} className="w-[30px] h-[30px]" alt="Back" />
        </div>
        <p className="md:text-[20px] text-[16px] font-light font-primary">
          {title}
        </p>
      </div>

      {buttonText && (
        <Button
          onClick={onAdd}
          variant="ghost"
          className="group text-[12px] font-light hover:border-1 hover:border-black hover:text-white font-primary bg-black text-white h-[41px] rounded-[15px] w-fit border border-transparent transition-all duration-300"
        >
          <img
            src={icon}
            className="w-[16px] h-[16px] filter invert transition-all duration-300 group-hover:filter-none"
            alt={buttonText}
          />
          <span className="ml-2 transition-all duration-300 group-hover:text-black">
            {buttonText}
          </span>
        </Button>
      )}
    </div>
  );
};
