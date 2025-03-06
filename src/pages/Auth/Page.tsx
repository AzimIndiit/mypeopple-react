import { Switch } from "@/components/ui/switch";
import logo from "../../assets/icons/logo.svg";
import { Label } from "@/components/ui/label";

import { Link } from "react-router-dom";
import apple from "../../assets/icons/apple.svg";
import android from "../../assets/icons/android.svg";
import { useState } from "react";
import LoginPage from "./Login";
import MainCreationPage from "./MainCreation";
import RegisterPage from "./Register";
import OtpPage from "./Otp";
import ForgotPasswordPage from "./ForgotPassword";
import ResetPasswordPage from "./ResetPassword";

const Page = () => {
  const [currentPage, setCurrentPage] = useState("resetPassword");

  console.log("logo", logo);

  const pageComponents = {
    main: MainCreationPage,
    register: RegisterPage,
    login: LoginPage,
    otp: OtpPage,
    forgotPassword: ForgotPasswordPage,
    resetPassword: ResetPasswordPage,
  };

  const renderPage = () => {
    const Component =
      pageComponents[currentPage as keyof typeof pageComponents];
    return Component ? (
      <Component currentPage={currentPage} setCurrentPage={setCurrentPage} />
    ) : null;
  };
  return (
    <div
      className={`w-full flex justify-center items-center py-[32px] ${
        ["register", "login"].includes(currentPage)
          ? "lg:overflow-y-scroll lg:max-h-screen lg:pb-[32px]"
          : ""
      } ${
        currentPage === "login"
          ? "lg:pt-[12rem]"
          : currentPage === "register"
          ? "lg:pt-[14rem]"
          : ""
      }`}
    >
      <div className=" bg-white bg-opacity-95 p-[32px] flex flex-col justify-center rounded-[60px] w-full md:w-[613px] ">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Logo"
            style={{ height: "48.68px", width: "294px" }}
          />
        </div>
        {["main", "register", "login"].includes(currentPage) && (
          <div className="flex items-center justify-between space-x-2 mt-[40px]">
            <Label
              htmlFor="language-mode"
              className="font-primary font-semibold  text-[18px]"
            >
              Would you like to switch the language to French?
            </Label>

            <Switch id="language-mode" className="h-[22px] w-[36.67px]" />
          </div>
        )}
        <div className="w-full mt-[24px]">{renderPage()}</div>
        {["main", "register"].includes(currentPage) && (
          <div className="text-center w-full font-primary font-regular text-[16px]">
            <p className=" mb-[24px]">
              By joining, you agree to the Mypeople{" "}
              <Link to="#" className="text-[#0280F9]">
                Terms of Service
              </Link>{" "}
              and to occasionally receive emails from us. Please read our{" "}
              <Link to="#" className="text-[#0280F9]">
                Privacy Policy
              </Link>{" "}
              to learn how we use your personal data.
            </p>
          </div>
        )}

        {["main", "register", "login"].includes(currentPage) && (
          <>
            <div className="flex items-center w-full font-primary ">
              <div className="flex-1 h-[2px] bg-[#E2E2E2]" /> {/* Left Line */}
              <p className="mx-4 text-[14px] text-[#596569] font-semibold">
                Download the application?
              </p>
              <div className="flex-1 h-[2px] bg-[#E2E2E2]" /> {/* Right Line */}
            </div>
            <div className="flex items-center w-full font-primary justify-center gap-[12px] mt-[24px]">
              <Link
                to="#"
                className="w-[195px] h-[48px] bg-black flex justify-center items-center rounded-[7.5px]"
              >
                <img src={apple} alt="apple" />
              </Link>
              <Link
                to="#"
                className="w-[195px] h-[48px] bg-black flex justify-center items-center rounded-[7.5px]"
              >
                <img src={android} alt="apple" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
