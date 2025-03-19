import { Button } from "@/components/ui/button";
import userAvatar from "@/assets/images/user.png";
import emailIcon from "@/assets/icons/email-solid.svg";
import phoneIcon from "@/assets/icons/phone.svg";
const Step5 = ({
  setCurrentStep,
  setStepData,
}: // stepData,
{
  currentStep: string;
  setCurrentStep: (step: string) => void;
  setStepData: (data: any) => void;
  stepData: any;
}) => {
  const userData = {
    name: "Tam Tran",
    exp: "5 years",
    image: userAvatar,
    status: "available",
    email: "tam.tran@example.com",
    phone: "+1234567890",
    joined: "5 Oct 2022",
  };
  // Initialize form
  // const form = useForm({
  //   resolver: zodResolver(currentSchema),
  //   defaultValues: getDefaultValues("credit_debit"),
  //   mode: "onChange",
  // });

  const onSubmit = () => {
    // setCurrentStep("5");
    setStepData((prev: any) => ({
      ...prev,
      Step5: {},
    }));
  };

  return (
    <div className="w-full my-5">
      <p className="text-[14px] font-light mb-4">
        We're proud to introduce the HRBP we suggest you work with according
        your subscription. We invite you to get to know each other and find out
        what you need to get started right away.
      </p>

      <div className="flex flex-col md:flex-row  items-center gap-4 w-full ">
        <div className="flex  xl:w-[278px]  items-center gap-2 h-[180px] md:h-[200px]  xl:h-[200px] w-full  rounded-[16px] bg-gray-100  relative">
          <img
            src={userData.image}
            alt="user"
            className="object-cover  w-full h-full rounded-[16px]"
          />
        </div>
        <div className="flex flex-col gap-2 text-left  w-full my-4">
          <p className="text-[20px] font-semibold font-primary">
            {userData.name}
          </p>
          <p className="text-[14px] font-light font-primary text-primary">
            Joined - {userData.joined}
          </p>
          <p className="text-[16px] font-light font-primary flex items-center gap-2">
            <img src={emailIcon} className="w-[24px] h-[24px]" />{" "}
            {userData.email}
          </p>
          <p className="text-[16px] font-light font-primary flex items-center gap-2">
            <img src={phoneIcon} className="w-[24px] h-[24px]" />{" "}
            {userData.phone}
          </p>
        </div>
      </div>
      <div className="w-full max-w-4xl mx-auto my-4">
        <div className="border-2 border-[#A3A3A3] border-dashed rounded-md p-5 bg-[#00000008] font-primary">
          <div className="text-[#848199] leading-relaxed text-[16px]">
            <p className="font-medium mb-2 text-black ">Resume</p>
            <p className="mb-2">
              A bilingual French English HR executive profile, nourished by over
              30 years in operational HR functions & consulting (employment law,
              payroll, pensions, HR consulting) and operational general
              management. In complex, multi-sector environments, I bring
              process, innovation and enthusiasm to define and implement
              corporate strategy with a high level of technical expertise,
              getting the best out of individuals and teams daily.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          variant={"outline"}
          className="w-full md:w-[222px] text-primary hover:bg-white border-primary"
          type="button"
          onClick={() => {
            // const formValues = form.getValues();
            setStepData((prev: any) => ({
              ...prev,
              step5: {},
            }));
          }}
        >
          Save as Draft
        </Button>
        <Button
          className="w-full md:w-[222px] "
          type="button"
          onSubmit={onSubmit}
        >
          Pay Now
        </Button>
      </div>
    </div>
  );
};

export default Step5;
