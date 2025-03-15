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
        "flex items-center justify-between w-full  xl:h-[127px]  rounded-[20px] px-4  xl:py-[30px] xl:px-[22px]",
        bg
      )}
    >
      <div className="flex flex-col  font-primary py-2 w-full">
        <div className=" text-[26px] xl:text-[38px] font-bold text-white ">
          {count}
        </div>
        <div className="text-[16px] xl:text-[18px] font-light text-white">
          {title}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img
          src={icon}
          alt={title}
          className=" h-[100px] xl:w-[136px] xl:h-[136px]"
        />
      </div>
    </div>
  );
};

export default CountCard;
