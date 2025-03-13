import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import speakerIcon from "@/assets/icons/speaker.svg";
import undoIcon from "@/assets/icons/undo.svg";
import redoIcon from "@/assets/icons/redo.svg";
import languageIcon from "@/assets/icons/language-translate.svg";
import addIcon from "@/assets/icons/add-solid.svg";
import { ThumbsUp, ThumbsDown, Copy } from "lucide-react";
const AiCompanion = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const renderIcon = (
    icon: string,
    onClick: (e: React.MouseEvent<HTMLElement>) => void
  ) => {
    return (
      <div className=" cursor-pointer p-2 " onClick={onClick}>
        <img
          src={icon}
          alt="icon"
          className="w-[24px] h-[24px] filter invert-[50%]"
        />
      </div>
    );
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <p className=" text-[16px] lg:text-[20px] font-medium font-primary w-full ">
          My AI companion
        </p>
        <Button
          onClick={() => navigate("/orders/create")}
          variant="ghost"
          className="group text-[12px]  hover:border-1 hover:border-black hover:text-white font-primary bg-black text-white h-[41px] rounded-[10px] w-fit border border-transparent transition-all duration-300"
        >
          <img
            src={addIcon}
            className="w-[16px] h-[16px] filter invert transition-all duration-300 group-hover:filter-none"
          />
          <span className="ml-2 transition-all duration-300 group-hover:text-black">
            New Prompt
          </span>
        </Button>
      </div>
      <div className="my-4 space-y-4">
        <p className=" text-[14px] font-light font-primary w-full text-[#737373] ">
          Any HR question ? Please ask your Ai Companion and reach your HRBP for
          more in depth query.
        </p>
        <div className="flex gap-4">
          <div className="w-full  space-y-4 ">
            <Textarea
              className="w-full h-[197px] bg-white"
              placeholder="Ask your question here"
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
              }}
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {renderIcon(speakerIcon, (e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  console.log("clicked");
                })}
                {renderIcon(undoIcon, (e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  console.log("clicked");
                })}
                {renderIcon(redoIcon, (e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  console.log("clicked");
                })}
              </div>
              <Button
                disabled={prompt.length === 0}
                onClick={() => {
                  setResponse(prompt);
                }}
                variant="outline"
                className="w-full md:w-[140px] h-[41px] bg-black text-white p-[10px] rounded-[10px]"
              >
                Submit Prompt
              </Button>
            </div>
          </div>
          <div className="w-full  space-y-4 ">
            <Textarea
              className="w-full h-[197px] bg-[#FFF4F0]"
              placeholder="Answer will generate here..."
              value={response}
              disabled
              //   onChange={(e) => setResponse(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <div className="flex gap-1">
                {renderIcon(speakerIcon, (e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  console.log("clicked");
                })}
                <div className=" cursor-pointer p-2 " onClick={() => {}}>
                  <ThumbsUp className="w-[22px] h-[22px] filter invert-[50%]" />
                </div>
                <div className=" cursor-pointer p-2 " onClick={() => {}}>
                  <ThumbsDown className="w-[22px] h-[22px] filter invert-[50%]" />
                </div>
                {renderIcon(
                  languageIcon,
                  (e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    console.log("clicked");
                  }
                )}
                <div className=" cursor-pointer p-2 " onClick={() => {}}>
                  <Copy className="w-[22px] h-[22px] filter invert-[50%]" />
                </div>
              </div>
              <Button
                disabled={response.length === 0}
                variant="outline"
                className="w-full md:w-[140px] h-[41px] bg-black text-white p-[10px] rounded-[10px]"
              >
                Regenerate
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiCompanion;
