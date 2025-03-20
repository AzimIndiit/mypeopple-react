import { Routes, Route, useLocation } from "react-router-dom";
import { Switch } from "@/components/ui/switch";
import logo from "@/assets/icons/logo.svg";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import apple from "@/assets/icons/apple.svg";
import android from "@/assets/icons/android.svg";
import { useTranslation } from "react-i18next";
import MainCreationPage from "@/pages/auth/MainCreation";
import RegisterPage from "@/pages/auth/Register";
import LoginPage from "@/pages/auth/Login";
import OtpPage from "@/pages/auth/Otp";
import ForgotPasswordPage from "@/pages/auth/ForgotPassword";
import ResetPasswordPage from "@/pages/auth/ResetPassword";

const AuthPage = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  console.log("location.pathname", location.pathname);
  return (
    <div className="w-full flex justify-center items-center py-4 sm:p-3">
      <div className="flex flex-col w-full max-w-[613px] ">
        <div className="flex-1 bg-white bg-opacity-95 p-[16px] sm:p-[32px] rounded-[30px] lg:rounded-[60px]">
          <div className="flex flex-col h-full">
            <div className="flex justify-center shrink-0 mb-[40px]">
              <img
                src={logo}
                alt="Logo"
                className="h-[48.68px] w-full sm:w-[294px] block"
              />
            </div>

            {/* Language Switch */}
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
                onCheckedChange={() =>
                  i18n.changeLanguage(i18n.language === "en" ? "fr" : "en")
                }
              />
            </div>

            {/* Render Authentication Routes */}
            <Routes>
              <Route path="/" element={<MainCreationPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="otp" element={<OtpPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route path="reset-password" element={<ResetPasswordPage />} />
            </Routes>

            {/* Terms and Conditions */}
            {["/auth", "/auth/register"].includes(location.pathname) && (
              <div className="text-center w-full font-primary font-light text-[14px] lg:text-[16px] mt-[16px] shrink-0">
                <p className="mb-[24px]">
                  {t("auth.bottom-line-1")}{" "}
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
            {["/auth", "/auth/login", "/auth/register"].includes(
              location.pathname
            ) && (
              <>
                <div className="flex items-center w-full font-primary shrink-0">
                  <div className="flex-1 h-[2px] bg-[#E2E2E2]" />
                  <p className="mx-4 text-[14px] text-[#596569] font-semibold">
                    {t("auth.download-app")}
                  </p>
                  <div className="flex-1 h-[2px] bg-[#E2E2E2]" />
                </div>
                <div className="flex items-center w-full font-primary justify-center gap-[12px] mt-[16px] shrink-0">
                  <Link
                    to="#"
                    className="w-[195px] h-[48px] bg-black flex justify-center items-center rounded-[7.5px]"
                  >
                    <img src={apple} alt="apple" className="block" />
                  </Link>
                  <Link
                    to="#"
                    className="w-[195px] h-[48px] bg-black flex justify-center items-center rounded-[7.5px]"
                  >
                    <img src={android} alt="android" className="block" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
