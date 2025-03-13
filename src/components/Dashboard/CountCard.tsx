import { cn } from "@/lib/utils";

const CountCard = ({
  bg,
  count,
  title,
  icon,
}: {
  bg: string;
  count: string;
  title: string;
  icon: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full lg:w-[336px] xl:w-[346px] h-[127px]  rounded-[20px] py-[30px] px-[22px]",
        bg
      )}
    >
      <div className="flex flex-col  font-primary">
        <div className="text-[38px] font-bold text-white ">{count}</div>
        <div className="text-[18px] font-light text-white">{title}</div>
      </div>
      <div className="flex items-center gap-2">
        <img src={icon} alt={title} className="w-[136px] h-[136px]" />
      </div>
    </div>
  );
};

export default CountCard;
