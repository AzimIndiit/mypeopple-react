import logo from "../../assets/icons/logo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import eyeFill from "@/assets/icons/eye-fill.svg";
import infoIcon from "@/assets/icons/info.svg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useState } from "react";
const ResetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(15, { message: "Password must be at least 15 characters long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),

  confirmPassword: z
    .string()
    .min(15, { message: "Password must be at least 15 characters long." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});





type ResetPasswordFormValues = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordPage = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "", // Ensures controlled component,
      confirmPassword: "",
    },
  });
  

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    console.log(`Form Submitted`, values);
  };
  console.log("logo", logo);

  const passwordCriteria = [
    "Must be at least 15 characters long.",
    "Must contain an uppercase and a lowercase letter (A, z).",
    "Must contain a number.",
    "Must contain a special character (1,1%, etc.).",
  ];
  return (
    <div className="w-full  ">
      <h1 className="text-[26px] font-bold font-primary ">
      Reset Your Password
      </h1>
      <p className=" text-[#596569]  w-full ">
      Enter a new password to reset the password on your account. We’ll ask for this password whenever you log in.
      </p>
      <div className="w-full my-[24px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
               <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[15px]  !font-primary  !font-normal">
                    New Password <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password "
                        {...field}
                        className="pr-10"
                      />
                      <div
                        className="absolute   right-0 px-[20px] top-1/2 -translate-y-1/2 "
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <img src={eyeFill} className="w-[25px] h-[24px]" />
                        ) : (
                          <img src={eyeFill} className="w-[25px] h-[24px]" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-[12px]">
              {passwordCriteria.map((criteria, index) => (
                <div key={index} className="flex items-center gap-[12px]">
                  <img src={infoIcon} className="w-[20px] h-[20px]" />
                  <p className="text-[14px] text-[#596569]">{criteria}</p>
                </div>
              ))}
            </div>
               <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[15px]  !font-primary  !font-normal">
                    Confirm New Password <span className="text-red-500">*</span>
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password "
                        {...field}
                        className="pr-10"
                      />
                      <div
                        className="absolute   right-0 px-[20px] top-1/2 -translate-y-1/2 "
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <img src={eyeFill} className="w-[25px] h-[24px]" />
                        ) : (
                          <img src={eyeFill} className="w-[25px] h-[24px]" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Reset Password
            </Button>
            <div className="text-center w-full font-primary font-regular text-[16px]">
            <p className=" mb-[24px]">
            If you do not want to change your password or didn't
            request a reset, you can ignore and delete this email.
            </p>
          </div>
       
            <div className="text-center w-full font-primary font-regular text-[16px] mb-[24px] ">
              <p className=" text-[#596569]  text-center w-full ">
                Back to{" "}
                <span
                  className="text-primary"
                  onClick={() => setCurrentPage("login")}
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
