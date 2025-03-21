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

// import { useAuth } from "@/context/AuthContext";


import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/utils/helper";
import avatar from "@/assets/images/avatar.png";
import { cn } from "@/lib/utils";
const items = [
  "Employment contract",
  "Employee Phone number",
  "Employee Email adress",
  "Last 12 payslips",
  "Health Care registration number",
  "Employee ID",
  "Health Care Company Agreement",
] as const;

const users = [
  { id: "1", avatar: avatar, name: "Michael" },
  { id: "2", avatar: avatar, name: "Alice" },
  { id: "3", avatar: avatar, name: "John" },
];

const orderOptions = [
  { value: "1",  label: "1" },
  { value: "2",  label: "2" },
  { value: "3",  label: "3" },
];



const categoryOptions = [
  {
    label: "Employment Contract",
    value: "Employment Contract",
  },
  {
    label: "Talent Acquisition & Recruitment",
    value: "Talent Acquisition & Recruitment",
  },
  {
    label: "Performance Management",
    value: "Performance Management",
  },
  {
    label: "Learning & Development",
    value: "Learning & Development",
  },
  {
    label: "Compensation & Benefits",
    value: "Compensation & Benefits",
  },
  {
    label: "HR Compliance & Policies",
    value: "HR Compliance & Policies",
  },
];

const CreateSourcingModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  // const { t } = useTranslation();

  // const {  updateUser } = useAuth();
  const CreateSourcingModalSchema = z.object({
    category: z.string().min(1, { message: "Category is required" }),
    user: z.string().min(1, { message: "User is required" }),
    orderNo: z.string().min(1, { message: "Order Number is required" }),
    documents: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one document.",
    }),
  });

  type CreateSourcingModalType = z.infer<typeof CreateSourcingModalSchema>;

  const form = useForm<CreateSourcingModalType>({
    resolver: zodResolver(CreateSourcingModalSchema),
    defaultValues: {
      category: "Performance Management",
      user: "1",
      orderNo: "1",
      documents:[  "Employment contract",
  "Employee Phone number","Employee ID","Health Care Company Agreement"]
    },
  });

  const onSubmit = (values: CreateSourcingModalType) => {
    console.log("Password Changed:", values);
    // localStorage.setItem("language", values.selectedLanguage);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-4 rounded-[15px] text-center font-primary w-full md:min-w-[752px] ">
        {/* Header */}

        <div className="flex items-center justify-between">
          <p className="font-semibold ">Sourcing Request</p>
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
            <div className="w-full">
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>User</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select User" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {users.map(({ id, avatar, name }) => (
                          <SelectItem key={id} value={id} className="h-[48px]">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={avatar} alt={name} />
                                <AvatarFallback>
                                  {getInitials(name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="!text-[12px] !font-primary capitalize">
                                {name}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full">
             <FormField
                control={form.control}
                name="orderNo"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Order Number</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {orderOptions.map((item) => (
                          <SelectItem value={item.value} className="h-[48px]">
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
             </div>
             <div className="w-full">
             <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categoryOptions.map((item) => (
                          <SelectItem value={item.value} className="h-[48px]">
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
             </div>

             <FormField
              control={form.control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Documents</FormLabel>
                  </div>
                  <div className="flex flex-wrap gap-[10px]">
                    {items.map((item) => (
                      <FormItem key={item}>
                        <FormControl>
                          <div
                            className={cn(
                              "flex h-[44px] lg:h-[46px] flex-row items-center space-x-3 border border-[white] bg-[#40404014] rounded-[120px] px-[15px] py-[10px] max-w-fit text-[#596569]",
                              field.value?.includes(item) &&
                                "bg-[#FC400614] border-primary text-primary"
                            )}
                            onClick={() => {
                              field.onChange(
                                field.value?.includes(item)
                                  ? field.value?.filter(
                                      (value) => value !== item
                                    )
                                  : [...(field.value || []), item]
                              );
                            }}
                          >
                            <FormLabel className=" text-[14px] font-primary font-normal w-full  ">
                              {item}
                            </FormLabel>
                          </div>
                        </FormControl>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="bg-[#40404014] rounded-[10px] py-[12px] px-[20px] ">
              <p className="text-[16px] text-[#596569] font-primary font-light">For the above-mentioned order, please send us or place on the drive the following documents required for
processing. This concerns the employee John Kelly. Please do not hesitate to contact me if you need any
assistance.
</p>
            </div>
              {/* Buttons */}
              <hr className="my-4"/>
              <div className="flex justify-end my-4">
                <Button
                  className="w-full md:w-[140px] h-[41px] font-light "
                  type="submit"
                >
                  Send
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateSourcingModal;
