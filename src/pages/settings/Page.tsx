import userAvatar from "@/assets/images/user.png";
import emailIcon from "@/assets/icons/email-solid.svg";
import phoneIcon from "@/assets/icons/phone.svg";
import { Button } from "@/components/ui/button";
import newMessageIcon from "@/assets/icons/new-message.svg";
import pendingOrdersIcon from "@/assets/icons/pending-orders.svg";
import myListIcon from "@/assets/icons/my-plan.svg";
import CountCard from "@/components/Dashboard/CountCard";
import myPlanIcon from "@/assets/icons/stash_plan.svg";
import personSwapIcon from "@/assets/icons/person-swap.svg";
import cardOutlineIcon from "@/assets/icons/card-outline.svg";
import lockPasswordIcon from "@/assets/icons/lock-password.svg";
import laptopSecureIcon from "@/assets/icons/laptop-secure.svg";
import privacyPolicyIcon from "@/assets/icons/privacy-policy.svg";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import LanguageModal from "@/components/Settings/LanguageModal";
import CurrencyModal from "@/components/Settings/CurrencyModal";
import { useEffect, useState } from "react";
import ChangePassword from "@/components/Settings/ChangePassword";

const CountCardData = [
  {
    bg: "bg-primary",
    count: "4",
    title: "New Messages",
    icon: newMessageIcon,
  },
  {
    bg: "bg-[#1A3E81]",
    count: "25",
    title: "Pending Orders",
    icon: pendingOrdersIcon,
  },
  {
    bg: "bg-[#1DBF73]",
    count: "Essential",
    title: "My Plan",
    icon: myListIcon,
  },
];

const settingsData = [
  {
    icon: myPlanIcon,
    title: "My Plan",
    link: "/settings/my-plans",
  },

  {
    icon: cardOutlineIcon,
    title: "Saved Payment Methods",
    link: "/settings/saved-payment-methods",
  },
  {
    icon: lockPasswordIcon,
    title: "Change Password",
    link: "/settings/change-password",
  },
  {
    icon: personSwapIcon,
    title: "Switch to HRBP",
    link: "/settings/switch-to-hrbp",
  },
  {
    icon: laptopSecureIcon,
    title: "Terms of Use",
    link: "/settings/terms-of-use",
  },
  {
    icon: privacyPolicyIcon,
    title: "Privacy Policy",
    link: "/settings/privacy-policy",
  },
];
const SettingsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = {
    name: "Tam Tran",
    exp: "5 years",
    image: userAvatar,
    status: "available",
    email: "tam.tran@example.com",
    phone: "+1234567890",
    joined: "5 Oct 2022",
  };

  const [isModalOpen, setIsModalOpen] = useState("");
  useEffect(() => {
    if (id === "language") {
      setIsModalOpen("language");
    }
    if (id === "currency") {
      setIsModalOpen("currency");
    }
    if (id === "change-password") {
      setIsModalOpen("change-password");
    }
    return () => {
      setIsModalOpen("");
    };
  }, [id]);
  return (
    <div className="w-full space-y-4 mb-4">
      <div className="flex flex-col md:flex-row  items-center gap-4 w-full ">
        <div className="flex  xl:w-[278px]  items-center gap-2 h-[180px] md:h-[200px]  xl:h-[200px] w-full  rounded-[16px] bg-gray-100  relative">
          <img
            src={userData.image}
            alt="user"
            className="object-cover  w-full h-full rounded-[16px]"
          />
        </div>
        <div className="flex flex-col gap-2 text-left  w-full my-4">
          <p className="text-[20px] font-semibold font-primary">
            {userData.name}
          </p>
          <p className="text-[14px] font-light font-primary">
            Joined - {userData.joined}
          </p>
          <p className="text-[16px] font-light font-primary flex items-center gap-2">
            <img src={emailIcon} className="w-[24px] h-[24px]" />{" "}
            {userData.email}
          </p>
          <p className="text-[16px] font-light font-primary flex items-center gap-2">
            <img src={phoneIcon} className="w-[24px] h-[24px]" />{" "}
            {userData.phone}
          </p>
          <Button className="h-[36px] !text-[12px] !font-semibold   w-full md:w-[295px]">
            Edit Profile
          </Button>
        </div>
      </div>

      <div className="grid  grid-cols-1  md:grid-cols-3  xl:grid-cols-3 gap-[8px] md:gap-[25px]">
        {CountCardData.map((item, index) => (
          <CountCard key={index} {...item} />
        ))}
      </div>
      <div className="w-full flex flex-col gap-4 my-4 bg-[#FFF4F0] rounded-[16px] p-4">
        {settingsData.map((item, index) => (
          <Link to={item.link} key={index} className="flex items-center gap-4">
            <img
              src={item.icon}
              alt={item.title}
              className="w-[24px] h-[24px]"
            />
            <p className="text-[16px] font-light font-primary">{item.title}</p>
          </Link>
        ))}
      </div>
      {isModalOpen === "language" && (
        <LanguageModal
          isOpen={isModalOpen === "language"}
          onOpenChange={() => {
            navigate("/settings");
          }}
        />
      )}
        {isModalOpen === "currency" && (
          <CurrencyModal
            isOpen={isModalOpen === "currency"}
            onOpenChange={() => {
              navigate("/settings");
            }}
          />
        )}
      {isModalOpen === "change-password" && (
        <ChangePassword
          isOpen={isModalOpen === "change-password"}
          onOpenChange={() => {
            navigate("/settings");
          }}
        />
      )}
    </div>
  );
};

export default SettingsPage;
