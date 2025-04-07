import { Card } from "@/components/ui/card";
import check2 from "@/assets/icons/check3.svg";
const Step5Summary = () => {
  const features = [
    "We select your HRBP among the best Mypeople Team Members",
    "You can arrange your first meeting from your Dashboard",
    "In any case, your HRBP will contact you as soon as possible.",
    "You can change your main contact at any time after reviewing your needs.",
  ];
  return (
    <div className="space-y-4">
      <Card className="px-4 py-[10px] bg-[#FC40060F] shadow-none rounded-[10px] gap-2">
        <h3 className="font-semibold  font-primary text-[16px]">My HRBP</h3>
        <div className="flex-grow my-2">
          <ul className="space-y-4">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-[10px] text-[15px]"
              >
                <img src={check2} className="w-[20px] h-[20px] " />
                <span className={"text-gray-500"}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default Step5Summary;
