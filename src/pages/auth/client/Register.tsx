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
import { useEffect, useMemo, useState } from "react";
import eyeFill from "@/assets/icons/eye-fill.svg";
import eyeHide from "@/assets/icons/eye-closed.svg";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { TFunction } from "i18next";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate =useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const RegisterSchema = useMemo(() => {
    return z.object({
      email: z.string().email({ message: t("auth.register.validation.email") }),
      firstName: z
        .string()
        .min(2, { message: t("auth.register.validation.firstName") }),
      lastName: z
        .string()
        .min(2, { message: t("auth.register.validation.lastName") }),
      accountType: z
        .string()
        .min(1, { message: t("auth.register.validation.accountType") }),
      password: z
        .string()
        .min(15, { message: t("auth.register.validation.password.min") })
        .regex(/[A-Z]/, {
          message: t("auth.register.validation.password.uppercase"),
        })
        .regex(/[a-z]/, {
          message: t("auth.register.validation.password.lowercase"),
        })
        .regex(/[0-9]/, {
          message: t("auth.register.validation.password.number"),
        })
        .regex(/[^A-Za-z0-9]/, {
          message: t("auth.register.validation.password.specialChar"),
        }),
    });
  }, [t]);

  type RegisterFormValues = z.infer<typeof RegisterSchema>;

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "Tam",
      lastName: "Tran",
      email: "tamtran98@gmail.com",
      password: "12345678@12345Ty",
      accountType: "client",
    },
    // mode: "onBlur", // Validate on blur
  });

  useEffect(() => {
    if (t as TFunction<"translation", undefined>) {
      form.clearErrors();
    }
  }, [t, form]);

  const onSubmit = (values: RegisterFormValues) => {
    console.log(`Form Submitted`, values);
    navigate("/auth/client/login")
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-[24px] lg:text-[26px] font-bold font-primary">
        {t("auth.register.create-account")}
      </h1>
      <p className="text-[#596569] w-full">{t("auth.register.description")}</p>

      <div className="w-full mt-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <div className="flex flex-col sm:flex-row gap-[16px] w-full">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.register.firstName")}</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder={t("auth.register.placeholder.firstName")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("auth.register.lastName")}</FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder={t("auth.register.placeholder.lastName")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem className=" items-center space-x-2">
                  <FormLabel>{t("auth.register.accountType")}</FormLabel>
                  <FormControl>
                    <div className="w-full flex gap-[10px]">
                      <RadioGroup
                        defaultValue="client"
                        value={field.value}
                        onValueChange={field.onChange}
                        className="w-full flex"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="client" id="r1" />
                          <Label htmlFor="r1">Client</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hrbp" id="r2" />
                          <Label htmlFor="r2">HRBP</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.register.email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("auth.register.placeholder.email")}
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
                  <FormLabel>{t("auth.register.password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("auth.register.placeholder.password")}
                        {...field}
                        className="pr-10"
                      />
                      <div
                        className="absolute right-0 px-[20px] top-1/2 -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        <img
                          src={showPassword ? eyeHide : eyeFill}
                          className="w-[25px] h-[24px]"
                          alt="toggle password visibility"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              {t("auth.register.continue")}
            </Button>

            <div className="text-center w-full text-[14px] lg:text-[16px]">
              <p className="text-[#596569]">
                {t("auth.register.haveAccount")}{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => navigate("/auth/client/login")}
                >
                  {t("auth.register.signIn")}
                </span>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
