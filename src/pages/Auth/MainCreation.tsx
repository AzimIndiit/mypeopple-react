import logo from "../../assets/icons/logo.svg";

import { Button } from "@/components/ui/button";
import google from "../../assets/icons/google.svg";
import email from "../../assets/icons/email.svg";
import { useTranslation } from "react-i18next";

const MainCreationPage = ({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) => {
  const { t } = useTranslation();

  type MainCreationTextType = {
    title: string;
    google: string;
    email: string;
    login: string;
    "login-link": string;
  };

  const mainCreationText = t("auth.main-creation", { returnObjects: true }) as MainCreationTextType;

  const { title, google: googleText, email: emailText, login, "login-link": loginLink } = mainCreationText;

  return (
 <div className="w-full  ">
      <h1 className="text-[24px] lg:text-[26px] font-bold font-primary my-[24px]">
        {t(title)}
      </h1>
      <div className="flex flex-col gap-[16px]">
        <Button className="w-full bg-[rgba(252,64,6,0.08)] hover:bg-[rgba(252,64,6,0.08)] text-black font-primary font-semibold text-[16px]">
          <img src={google} alt="google" />
          {t(googleText)}
        </Button>
        <Button className="w-full font-primary font-semibold text-[16px]" onClick={() => setCurrentPage("register")}>
          <img src={email} alt="email" />
          {t(emailText)}
        </Button>
        <div className="text-center w-full font-primary font-regular text-[14px] lg:text-[16px]  ">
          <p className=" text-[#596569]  text-center w-full ">
            {t(login)} <span className="text-primary" onClick={() => setCurrentPage("login")}>{t(loginLink)}</span>
          </p>
        </div>
      </div>
    </div>
  
   
  );
};

export default MainCreationPage;
