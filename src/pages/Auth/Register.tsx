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

const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters." }),
    password: z
    .string()
    .min(15, { message: "Password must be at least 15 characters long." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),

});
type RegisterFormValues = z.infer<typeof RegisterSchema>;

const RegisterPage = ({}: // currentPage,
// setCurrentPage,
{
  currentPage: string;
  setCurrentPage: (page: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log(`Form Submitted`, values);
  };

  return (
    <div className="w-full">
      <h1 className="text-[26px] font-bold font-primary">
        Continue with your email
      </h1>
      <p className=" text-[#596569]  w-full ">
        To continue, please register with yourname, email and password.
      </p>

      <div className="w-full my-[24px]">
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
                      <FormLabel className="text-[15px] !font-primary  !font-normal">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Enter First Name" {...field} />
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
                      <FormLabel className="text-[15px] !font-primary  !font-normal">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="w-full"
                          placeholder="Enter Last Name"
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[15px]  !font-primary  !font-normal">
                    {" "}
                    Phone Number
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="Enter Phone Number " {...field} />
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
                    {" "}
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
            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
