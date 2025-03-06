import logo from "../../assets/icons/logo.svg";

import { Button } from "@/components/ui/button";
import google from "../../assets/icons/google.svg";
import email from "../../assets/icons/email.svg";

const MainCreationPage = ({ currentPage, setCurrentPage }: { currentPage: string; setCurrentPage: (page: string) => void }) => {
  console.log("logo", logo);
  return (
 <div className="w-full  ">
      <h1 className="text-[24px] lg:text-[26px] font-bold font-primary my-[24px]">
        Create an Account to start collaborate
      </h1>
      <div className="flex flex-col gap-[16px]">
        <Button className="w-full bg-[rgba(252,64,6,0.08)] hover:bg-[rgba(252,64,6,0.08)] text-black font-primary font-semibold text-[16px]">
          <img src={google} alt="google" />
          Continue with Google
        </Button>
        <Button className="w-full font-primary font-semibold text-[16px]" onClick={() => setCurrentPage("register")}>
          <img src={email} alt="google" />
          Continue with Email
        </Button>
        <div className="text-center w-full font-primary font-regular text-[14px] lg:text-[16px]  mb-[24px] ">
          <p className=" text-[#596569]  text-center w-full ">
            Already have an account? <span className="text-primary" onClick={() => setCurrentPage("login")}>Login</span>
          </p>
        </div>
      </div>
    </div>
  
   
  );
};

export default MainCreationPage;
