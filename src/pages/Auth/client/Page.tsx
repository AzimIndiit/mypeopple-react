import { Switch } from "@/components/ui/switch";
import logo from "../../../assets/icons/logo.svg";
import { Label } from "@/components/ui/label";

import { Link, useLocation } from "react-router-dom";
import google from "@/assets/icons/google.svg";
import outlook from "@/assets/icons/outlook.svg";
import { useState } from "react";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import OtpPage from "../Otp";
import ForgotPasswordPage from "../ForgotPassword";
import ResetPasswordPage from "../ResetPassword";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

const Page = () => {
  const location = useLocation();
  const initialPage = location.pathname.split("/auth/client").pop();
  const [currentPage, setCurrentPage] = useState(initialPage || "login");
  const { t, i18n } = useTranslation();
  console.log("currentPage", currentPage, i18n.language);
  const pageComponents = {
    register: RegisterPage,
    login: LoginPage,
    otp: OtpPage,
    "forgot-password": ForgotPasswordPage,
    "reset-password": ResetPasswordPage,
  };

  const renderPage = () => {
    const Component =
      pageComponents[currentPage as keyof typeof pageComponents];
    return Component ? (
      <Component currentPage={currentPage} setCurrentPage={setCurrentPage} />
    ) : null;
  };

  const getHeight = () => {
    switch (currentPage) {
      case "login":
        return "h-full";
      case "register":
        return "h-full"; // Adjust as needed
      case "reset-password":
        return "h-full"; // Adjust height for longer content
      default:
        return "";
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center overflow-y-auto py-4 sm:p-3">
      {/* Outer White Card Container (Fully Scrollable) */}
      <div className={`flex flex-col  w-full max-w-[613px] ${getHeight()}`}>
        {/* Main Dynamic Content (Scrollable) */}
        <div className="flex-1 bg-white bg-opacity-95 p-[16px] sm:p-[32px] rounded-[30px] lg:rounded-[60px] ">
          {/* Scrollable Content */}
          <div className="flex flex-col h-full ">
            {/* Logo (Fixed, Always Visible) */}
            <div className="flex justify-center shrink-0 mb-[40px]">
              <img
                src={logo}
                alt="Logo"
                className="h-[48.68px] w-full sm:w-[294px] block"
              />
            </div>
            {/* Language Switch */}
            {["register", "login"].includes(currentPage) && (
              <div className="flex items-center justify-between space-x-2 mb-[24px] shrink-0">
                <Label
                  htmlFor="language-mode"
                  className="font-primary font-semibold text-[16px] lg:text-[18px]"
                >
                  {t("auth.language")}
                </Label>
                <Switch
                  id="language-mode"
                  className="h-[22px] w-[36.67px]"
                  checked={i18n.language === "fr"}
                  onCheckedChange={() => {
                    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
                  }}
                />
              </div>
            )}
            {renderPage()}

            {/* Terms and Conditions */}
            {["register"].includes(currentPage) && (
              <div className="text-center w-full font-primary font-regular text-[14px] lg:text-[16px]  mt-[16px] shrink-0">
                <p className="mb-[24px]">
                  {t("auth.bottom-line-1")} {""}
                  <Link to="#" className="text-[#0280F9]">
                    {t("auth.terms-of-service")}
                  </Link>{" "}
                  {t("auth.bottom-line-2")}{" "}
                  <Link to="#" className="text-[#0280F9]">
                    {t("auth.privacy-policy")}
                  </Link>{" "}
                  {t("auth.bottom-line-3")}
                </p>
              </div>
            )}

            {/* Download App Section */}
            {["register", "login"].includes(currentPage) && (
              <>
                <div className="flex items-center w-full font-primary shrink-0">
                  <div className="flex-1 h-[2px] bg-[#E2E2E2]" />
                  <p className="mx-4 text-[14px] text-[#596569] font-semibold">
                    {t("auth.login.continue-with")}
                  </p>
                  <div className="flex-1 h-[2px] bg-[#E2E2E2]" />
                </div>
                <div className="flex flex-col gap-[12px] sm:flex-row items-center w-full font-primary justify-center mt-[16px] shrink-0">
                  <Button className="w-full sm:w-[258px] bg-[rgba(252,64,6,0.08)] hover:bg-[rgba(252,64,6,0.08)] text-black font-primary font-semibold text-[16px]">
                    <img src={google} alt="google" />
                    {t("auth.login.google")}
                  </Button>
                  <Button className="w-full sm:w-[258px] bg-[rgba(252,64,6,0.08)] hover:bg-[rgba(252,64,6,0.08)] text-black font-primary font-semibold text-[16px]">
                    <img src={outlook} alt="google" />
                    {t("auth.login.outlook")}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
