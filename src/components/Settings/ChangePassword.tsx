// import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import closeIcon from "@/assets/icons/close-fill.svg";
import { Button } from "../ui/button";

// import { useAuth } from "@/context/AuthContext";
import { Input } from "../ui/input";
import { useState } from "react";
import eyeFill from "@/assets/icons/eye-fill.svg";
import eyeHide from "@/assets/icons/eye-closed.svg";

const ChangePassword = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  // const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  // const {  updateUser } = useAuth();
  const ChangePasswordSchema = z
    .object({
      oldPassword: z.string().min(1, { message: "Old password is required" }),
      newPassword: z
        .string()
        .min(15, { message: "Password must be at least 15 characters long." })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter.",
        })
        .regex(/[a-z]/, {
          message: "Password must contain at least one lowercase letter.",
        })
        .regex(/[0-9]/, {
          message: "Password must contain at least one number.",
        })
        .regex(/[^A-Za-z0-9]/, {
          message: "Password must contain at least one special character.",
        }),

      confirmPassword: z
        .string()
        .min(15, { message: "Password must be at least 15 characters long." }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    });

  type ChangePasswordType = z.infer<typeof ChangePasswordSchema>;

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: ChangePasswordType) => {
    console.log("Password Changed:", values);
    // localStorage.setItem("language", values.selectedLanguage);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-4 rounded-[15px] text-center font-primary w-full md:w-[752px] ">
        {/* Header */}

        <div className="flex items-center justify-between">
          <p className="font-semibold uppercase"> Change Password</p>
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition"
            onClick={() => onOpenChange(false)}
          >
            <img src={closeIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        <AlertDialogDescription className="text-[14px] text-left">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[15px]  !font-primary  !font-normal">
                      Old Password
                    </FormLabel>

                    <FormControl>
                      <Input
                        type={"text"}
                        placeholder="Enter Password "
                        {...field}
                        className="pr-10"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[15px]  !font-primary  !font-normal">
                      New Password
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
                            <img src={eyeHide} className="w-[25px] h-[24px]" />
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[15px]  !font-primary  !font-normal">
                      Confirm New Password{" "}
                    </FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Enter Password "
                          {...field}
                          className="pr-10"
                        />
                        <div
                          className="absolute   right-0 px-[20px] top-1/2 -translate-y-1/2 "
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          {showConfirmPassword ? (
                            <img src={eyeHide} className="w-[25px] h-[24px]" />
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

              {/* Buttons */}
              <div className="flex justify-center my-4">
                <Button
                  className="w-full md:w-[140px] h-[41px] font-light uppercase"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ChangePassword;
