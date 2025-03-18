import { useTranslation } from "react-i18next";
import i18n from "@/translations/i18n";
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
  FormMessage,
} from "@/components/ui/form";
import closeIcon from "@/assets/icons/close-fill.svg";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { useAuth } from "@/context/AuthContext";

const LanguageModal = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const scheduledMeetingSchema = z.object({
    selectedLanguage: z.enum(["en", "fr"], {
      message: t("auth.languageModal.required"),
    }),
  });

  type ScheduleMeetingType = z.infer<typeof scheduledMeetingSchema>;

  const form = useForm<ScheduleMeetingType>({
    resolver: zodResolver(scheduledMeetingSchema),
    defaultValues: {
      selectedLanguage:
        (user?.language as "en" | "fr" | null) === "fr" ? "fr" : "en",
    },
  });

  const onSubmit = (values: ScheduleMeetingType) => {
    console.log("Language Changed:", values);
    // localStorage.setItem("language", values.selectedLanguage);
    updateUser({ language: values.selectedLanguage });
    i18n.changeLanguage(values.selectedLanguage);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="p-4 rounded-[15px] text-center font-primary w-full md:w-[752px] ">
        {/* Header */}
        <div className="flex justify-end">
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition"
            onClick={() => onOpenChange(false)}
          >
            <img src={closeIcon} alt="Close" className="w-5 h-5" />
          </button>
        </div>

        <AlertDialogDescription className="text-[14px] text-center">
          <h1 className="md:text-[28px] text-[20px] font-bold text-black my-2">
            {t("auth.languageModal.title")}
          </h1>
          <p className="text-[14px] text-black my-2">
            {t("auth.languageModal.description")}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="selectedLanguage"
                render={({ field }) => (
                  <FormItem className="flex justify-center">
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex gap-4"
                      >
                        {[
                          { id: "en", label: "English" },
                          { id: "fr", label: "French" },
                        ].map((lang) => (
                          <div
                            key={lang.id}
                            className="flex items-center space-x-2 my-2"
                          >
                            <RadioGroupItem value={lang.id} id={lang.id} />
                            <Label
                              htmlFor={lang.id}
                              className="!text-[14px] !font-light !text-black"
                            >
                              {lang.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
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
                  {t("auth.languageModal.save")}
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LanguageModal;
