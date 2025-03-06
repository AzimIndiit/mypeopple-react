import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
// import eye from "@/assets/icons/eye.svg";
import eyeFill from "@/assets/icons/eye-fill.svg";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import refreshIcon from "../../assets/icons/refresh.svg";
import captchaImg from "../../assets/images/captcha.svg";
const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  rememberMe: z.boolean().optional(),
  password: z
    .string()
    .min(15, { message: "Password must be at least 15 characters long." })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character.",
    }),

  captcha: z.string().min(1, { message: "Captcha is required." }),
});
type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginPage = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(`Form Submitted`, values);
    setCurrentPage("otp")
  };

  return (
    <div className="w-full">
      <h1 className="text-[26px] font-bold font-primary">
        Sign in to your account
      </h1>
      <p className=" text-[#596569]  w-full ">
        To continue, please Sign in with your registered email and password.
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
                  <FormLabel className="text-[15px]  !font-primary  !font-normal">
                    {" "}
                    Email
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="Enter Email Address " {...field} />
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
                  <FormLabel className="text-[15px]  !font-primary  !font-normal">
                    Password
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
                      className="text-[#596569] !text-[16px]"
                    >
                      Remember Me
                    </Label>
                  </div>
                  <p className="w-full text-right">
                    <Link to="#" onClick={()=>setCurrentPage('forgot-password')} className="text-[#0280F9]">
                      Forgot Password?
                    </Link>
                  </p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="captcha"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center md:mb-[24px] mb-[10px] gap-[10px]">
                    <div className="rounded-[10px] overflow-hidden">
                      <img
                        src={captchaImg}
                        alt="captcha"
                        className="w-full md:w-[499px] h-[64px] "
                      />
                    </div>
                    <div className="flex items-center justify-center  cursor-pointer ">
                      <img src={refreshIcon} className="w-[25px] h-[24px]" />
                    </div>
                  </div>

                  <FormControl>
                    <Input placeholder="Enter captcha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Login
            </Button>

            <div className="text-center w-full font-primary font-regular text-[16px] mb-[24px] ">
              <p className=" text-[#596569]  text-center w-full ">
                Don’t have an account?{" "}
                <span
                  className="text-primary"
                  onClick={() => setCurrentPage("register")}
                >
                  Join Here
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
