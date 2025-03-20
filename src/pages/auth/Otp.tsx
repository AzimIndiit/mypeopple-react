import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { TFunction } from "i18next";
import { useAuth } from "@/context/AuthContext";

const OtpPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const OtpSchema = z.object({
    otp: z
      .string()
      .length(6, { message: t("auth.otp.validation.otp.required") }) // Ensure exactly 6 characters
      .regex(/^\d+$/, { message: t("auth.otp.validation.otp.numeric") }), // Prevent non-numeric input
  });

  const form = useForm({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "123456", // Ensures controlled component
    },
  });

  useEffect(() => {
    if (t as TFunction<"translation", undefined>) {
      form.clearErrors(); // Clear validation errors on language change
    }
  }, [t, form]);

  const onSubmit = (values: any) => {
    console.log(`Form Submitted`, values);
    login({ name: "Tam Tarn", email: "tamtan09@gmail.com" ,role:"lead"});
    // navigate("/dashboard");
  };

  return (
    <div className="w-full">
      <h1 className="text-[24px] lg:text-[26px] font-bold font-primary">
        {t("auth.otp.title")}
      </h1>
      <p className="text-[#596569] text-[14px] lg:text-[16px] w-full">
        {t("auth.otp.description")}
      </p>

      <div className="w-full my-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[15px]  !font-primary  !font-normal">
                    {t("auth.otp.enterOtp")}
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      pattern={REGEXP_ONLY_DIGITS}
                      name="otp"
                      className="text-lg w-full"
                      maxLength={6}
                      value={field.value || ""}
                      onChange={(value) => field.onChange(value)}
                    >
                      {[...Array(6)].map((_, index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-center w-full text-[14px] lg:text-[16px] mb-[24px]">
              <p className=" text-[#596569]  text-center w-full ">
                {t("auth.otp.noOtp")}{" "}
                <span
                  className="text-primary"
                  // onClick={() => setCurrentPage("register")}
                >
                  {t("auth.otp.resend")}
                </span>
              </p>
            </div>

            <Button className="w-full" type="submit">
              {t("auth.otp.login")}
            </Button>

            <div className="text-center w-full text-[14px] lg:text-[16px] mb-[24px]">
              <p className="text-[#596569]">
                {t("auth.otp.backTo")}{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => navigate("/auth/login")}
                >
                  {t("auth.otp.login")}
                </span>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default OtpPage;
