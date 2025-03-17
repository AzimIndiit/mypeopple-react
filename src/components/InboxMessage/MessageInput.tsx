import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import docIcon from "@/assets/icons/doc-file.svg";
import {
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export const MessageInput = ({ form, files, fileInputRef, removeFile }: { form: any, files: any, fileInputRef: any, removeFile: any }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="newMessage"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder="Enter your message..."
                className="bg-white"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="mb-4 w-full">
        <FormField
          control={form.control}
          name="attachment"
          render={() => (
            <FormItem>
              <FormControl>
                <Input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  multiple
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files || []);
                    if (selectedFiles.length + files.length > 5) {
                      alert("You can upload a maximum of 5 files.");
                      return;
                    }
                    form.setValue("attachment", [...files, ...selectedFiles]);
                  }}
                />
              </FormControl>
              <FormMessage />

              <div className="flex flex-wrap gap-x-[20px] mt-2 space-y-2">
                {files.length > 0 &&
                  files.map((file: any, index: any) => (
                    <div
                      key={index}
                      className="flex items-center gap-[10px] justify-between bg-gray-100 rounded-[7px] p-[15px] h-[54px]"
                    >
                      <span className="text-sm flex items-center gap-[10px] font-primary">
                        <img
                          src={docIcon}
                          alt="doc"
                          className="w-[24px] h-[24px]"
                        />
                        {file.name}
                      </span>
                      <div
                        onClick={() => removeFile(index)}
                        className="cursor-pointer flex items-center justify-center rounded-full"
                      >
                        <Trash2 className="w-[24px] h-[24px] text-red-500" />
                      </div>
                    </div>
                  ))}
              </div>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};