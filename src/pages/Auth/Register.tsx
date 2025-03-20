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
import { TFunction } from "i18next";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
      phoneNumber: z
        .string()
        .min(10, { message: t("auth.register.validation.phoneNumber") }),
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
      phoneNumber: "8934489344",
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
    navigate("/auth/login");
  };

  return (
    <div className="w-full">
      <h1 className="text-[24px] lg:text-[26px] font-bold font-primary">
        {t("auth.register.title")}
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.register.phoneNumber")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("auth.register.placeholder.phoneNumber")}
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
              {t("auth.register.submit")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
