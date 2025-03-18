import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState, useEffect } from "react";
import eyeFill from "@/assets/icons/eye-fill.svg";
import eyeHide from "@/assets/icons/eye-closed.svg";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TFunction } from "i18next";

const LoginPage = ({
  setCurrentPage,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //use memo to create the schema
  const LoginSchema = z.object({
    email: z.string().email({ message: t("auth.login.validation.email") }),
    rememberMe: z.boolean().optional(),
    password: z
      .string()
      .min(15, { message: t("auth.login.validation.password.min") })
      .regex(/[A-Z]/, {
        message: t("auth.login.validation.password.uppercase"),
      })
      .regex(/[a-z]/, {
        message: t("auth.login.validation.password.lowercase"),
      })
      .regex(/[0-9]/, { message: t("auth.login.validation.password.number") })
      .regex(/[^A-Za-z0-9]/, {
        message: t("auth.login.validation.password.special"),
      }),
    // captcha: z.string().min(1, { message: t("auth.login.validation.captcha") }),
  });

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      // captcha: "",
    },
  });

  useEffect(() => {
    if (t as TFunction<"translation", undefined>) {
      form.clearErrors(); // Clear validation errors on language change
    }
  }, [t, form]);

  const onSubmit = (values: any) => {
    console.log(`Form Submitted`, values);
    setCurrentPage("otp");
  };

  return (
    <div className="w-full">
      <h1 className="text-[24px] lg:text-[26px] font-bold font-primary">
        {t("auth.login.welcome-back")}
      </h1>
      <p className="text-[#596569] text-[14px] lg:text-[16px] w-full">
        {t("auth.login.description")}
      </p>

      <div className="w-full my-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.login.email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("auth.login.placeholder.email")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.login.password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("auth.login.placeholder.password")}
                        {...field}
                        className="pr-10"
                      />
                      <div
                        className="absolute right-0 px-[20px] top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <img src={showPassword ? eyeHide : eyeFill} className="w-[25px] h-[24px]" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <div className="w-full flex gap-[10px]">
                    <FormControl>
                      <Checkbox
                        id="rememberMe"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label
                      htmlFor="rememberMe"
                      className="text-[#596569] !text-[14px] lg:!text-[16px]"
                    >
                      {t("auth.login.rememberMe")}
                    </Label>
                  </div>
                  <p className="w-full text-right text-[14px] lg:text-[16px]">
                    <Link
                      to="#"
                      onClick={() => setCurrentPage("forgot-password")}
                      className="text-[#0280F9]"
                    >
                      {t("auth.login.forgotPassword")}
                    </Link>
                  </p>
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              {t("auth.login.loginButton")}
            </Button>

            <div className="text-center w-full text-[14px] lg:text-[16px]">
              <p className="text-[#596569]">
                {t("auth.login.noAccount")}{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setCurrentPage("register")}
                >
                  {t("auth.login.joinHere")}
                </span>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
