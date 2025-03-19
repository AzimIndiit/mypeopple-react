import { PageHeader } from "@/components/PageHeader";
import referralBackground from "@/assets/images/referralBg.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
  FormField,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import facebookIcon from "@/assets/icons/facebook.svg";
import twitterIcon from "@/assets/icons/twitter.svg";
import whatsappIcon from "@/assets/icons/whatsapp.svg";
import linkedinIcon from "@/assets/icons/linkedin.svg";
import discountIcon from "@/assets/icons/discount.svg";
import inviteIcon from "@/assets/icons/invite.svg";
import moneyHandIcon from "@/assets/icons/money-hand.svg";
import ThankyouModal from "@/components/Referral/ThankyouModal";
import { useState } from "react";
import PreviewEmailModal from "@/components/Referral/PreviewEmailModal";
import userAvatar from "@/assets/images/user.png";
import { useNavigate } from "react-router-dom";
const socials = [
  {
    name: "Facebook",
    icon: facebookIcon,
  },
  {
    name: "Twitter",
    icon: twitterIcon,
  },
  {
    name: "Whatsapp",
    icon: whatsappIcon,
  },
  {
    name: "LinkedIn",
    icon: linkedinIcon,
  },
];

const benifits = [
  {
    title: "Invite Friends",
    description:
      "Refer friends to Mypeople through email, with your own personal referral link, or by spreading the word on social.",
    icon: inviteIcon,
  },
  {
    title: "They Get A discount",
    description:
      "When your referrals join Mypeple, they?ll get 10% off their first order",
    icon: discountIcon,
  },
  {
    title: "You get the credit",
    description:
      "Once they complete their order, you?ll get 10% of their purchase in Mypeople Credits to use on your next order.",
    icon: moneyHandIcon,
  },
];

const ReferralPage = () => {
  const navigate = useNavigate();
  const [isThankyouModalOpen, setIsThankyouModalOpen] = useState(false);
  const [isPreviewEmailModalOpen, setIsPreviewEmailModalOpen] = useState(false);
  const thankyouData = {
    name: "Tran",
    amount: "500",
    profile: userAvatar,
    promoCode: "TY202512568",
  };
  const ReferralSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
  });

  type ReferralFormValues = z.infer<typeof ReferralSchema>;

  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(ReferralSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSend = (values: ReferralFormValues) => {
    console.log(values);
  };

  return (
    <div>
      <PageHeader title="Refer a Friend" onBack={() => navigate(-1)} />
      <div
        className="w-full h-[236px] bg-cover bg-center rounded-[16px] my-4 flex flex-col justify-center items-start md:pl-[60px] pl-4"
        style={{ backgroundImage: `url(${referralBackground}) ` }}
      >
        <h1 className="text-[24px] font-primary font-medium text-white">
          From Referral To Reward
        </h1>
        <p className="text-[14px] font-primary font-semibold text-white">
          It's easy to earn with referrals
        </p>
        <p className="text-[14px] font-primary font-light text-white opacity-60">
          Tran, you deserve recognition for referring friends to Mypeople <br />
          Earn up to ? 500 in Mypeople Credits - Up to ?100 from each referral{" "}
          <br />
          <p className="underline">     Terms and Conditions apply</p>
        </p>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSend)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="!text-[18px] !font-primary !font-semibold !text-black "
                    data-error={form.formState.errors.email}
                  >
                    Invite Friends through Email
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder={"Add Email Addresses"}
                        className="pr-10"
                        {...field}
                      />
                      <div className="absolute right-0 pr-[8px] top-1/2 -translate-y-1/2 cursor-pointer">
                        <Button
                          variant="ghost"
                          type="submit"
                          className="text-white bg-black hover:bg-black/80 hover:text-white h-[50px] w-[90px]"
                        >
                          Send
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center my-4 w-full">
              <p className="text-[14px] font-primary font-light text-black w-full">
                demousergmail.com , johngmail.com
              </p>
              <p className="text-[14px] font-primary font-light text-primary underline cursor-pointer w-full text-end">
                Preview Email
              </p>
            </div>
          </form>
        </Form>
        <div className="mt-4">
          <label className="!text-[18px] font-primary font-semibold text-black">
            Or share your Referral Link
          </label>
          <div className="flex gap-4 md:flex-row flex-col items-center justify-center mt-2">
            <div className="relative  w-full">
              <Input
                disabled
                placeholder={"https://www.my-people.io"}
                className="pr-10"
              />
              <div className="absolute right-0 pr-[8px] top-1/2 -translate-y-1/2 cursor-pointer z-10">
                <Button
                  variant="ghost"
                  type="submit"
                  className="text-black bg-[#0000001A] hover:bg-[#0000001A]/80 hover:text-black h-[50px] w-[90px]"
                >
                  Copy
                </Button>
              </div>
            </div>
            <div className="flex  gap-2 items-center justify-end md:justify-center w-full md:w-auto h-[64px]  ">
              {socials.map((social: any) => (
                <div className="border border-[#0000001A] rounded-[10px] h-[50px] w-[50px] flex justify-center items-center">
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-[20px] h-[20px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-y-14  md:gap-4 md:flex-row flex-col items-center justify-center mt-12 md:mt-4 h-[650px] md:h-[300px]">
          {benifits.map((benifit: any) => (
            <div className="flex flex-col items-center justify-center text-center shadow-lg border border-[#0000001A] p-[15px] rounded-[15px] relative w-full h-[200px] md:h-[190px]">
              <div className="bg-white rounded-full p-4 absolute -top-10 border border-primary h-[80px] w-[80px] flex justify-center items-center ">
                <img
                  src={benifit.icon}
                  alt={benifit.title}
                  className="w-[38px] h-[38px]"
                />
              </div>
              <p className="text-[18px] font-primary font-semibold text-black">
                {benifit.title}
              </p>
              <p className="text-[14px] font-primary font-light text-[#00000080]">
                {benifit.description}
              </p>
            </div>
          ))}
        </div>
      </div>

     {isThankyouModalOpen && <ThankyouModal
        isOpen={isThankyouModalOpen}
        onOpenChange={setIsThankyouModalOpen}
        data={thankyouData}
      />}

    {isPreviewEmailModalOpen && <PreviewEmailModal
        onContinue={handleSend}
        isOpen={isPreviewEmailModalOpen}
        onOpenChange={setIsPreviewEmailModalOpen}
        data={thankyouData}
      />}
    </div>
  );
};

export default ReferralPage;
