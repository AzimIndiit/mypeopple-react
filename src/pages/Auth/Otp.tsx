import logo from "../../assets/icons/logo.svg";
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
const OtpSchema = z.object({
  otp: z
    .string()
    .length(6, { message: "OTP is Required." }) // Ensure exactly 6 characters
    .regex(/^\d+$/, { message: "OTP must contain only numbers." }), // Prevent non-numeric input
});

type OtpFormValues = z.infer<typeof OtpSchema>;

const OtpPage = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) => {
  const navigate = useNavigate();
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "", // Ensures controlled component
    },
  });

  const onSubmit = (values: z.infer<typeof OtpSchema>) => {
    console.log(`Form Submitted`, values);
    navigate("/dashboard");
  };
  console.log("logo", logo);
  return (
    <div className="w-full  ">
      <h1 className=" text-[24px] lg:text-[26px] font-bold font-primary ">
        Verify Your Identity!
      </h1>
      <p className=" text-[#596569] text-[14px] lg:text-[16px]  w-full ">
        Enter the code received by email to verify your identity, we sent you a
        one-time code by email to: *****ltd@gmail.com
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
                  <FormLabel className="text-[15px] !font-primary !font-normal">
                    Enter OTP
                  </FormLabel>
                  <FormControl>
                    <InputOTP
                      pattern={REGEXP_ONLY_DIGITS}
                      name="otp"
                      className=" text-lg w-full"
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
            <div className="text-center w-full font-primary font-regular text-[14px] lg:text-[16px] mb-[24px] ">
              <p className=" text-[#596569]  text-center w-full ">
                Didn't get OTP?{" "}
                <span
                  className="text-primary"
                  // onClick={() => setCurrentPage("register")}
                >
                  Resend
                </span>
              </p>
            </div>
            <Button className="w-full" type="submit">
              Login
            </Button>
            <div className="text-center w-full font-primary font-regular text-[14px] lg:text-[16px] mb-[24px] ">
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

export default OtpPage;
