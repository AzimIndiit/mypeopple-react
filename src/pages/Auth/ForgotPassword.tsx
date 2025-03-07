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

import { Input } from "@/components/ui/input";
const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});




type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

const ForgotPasswordPage = ({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "", // Ensures controlled component
    },
  });
  

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    console.log(`Form Submitted`, values);
  };
  console.log("logo", logo);
  return (
    <div className="w-full  ">
      <h1 className="text-[24px] lg:text-[26px] font-bold font-primary ">
      Forgot your Password ?
      </h1>
      <p className="text-[14px] lg:text-[16px] text-[#596569]  w-full ">
      It happens to the best of us
      Please type your email below :
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
                    Email Address
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="Enter Email Address " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
            
            <Button className="w-full" type="submit">
              Submit
            </Button>
            <div className="text-center w-full font-primary font-regular text-[14px] lg:text-[16px] ">
            <p className=" mb-[24px]">
            If an account exists for this email you will get an email with instructions on resetting your password. If it doesn't
            arrive, be sure to check your spam folder.
            </p>
          </div>
       
            <div className="text-center w-full font-primary font-regular text-[14px] lg:text-[16px]  ">
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

export default ForgotPasswordPage;
