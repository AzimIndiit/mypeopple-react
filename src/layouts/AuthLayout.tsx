import Carousel from "@/components/CustomCrousel";
import { Outlet } from "react-router-dom";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import slide4 from "../assets/slide4.png";
import { useState } from "react";
import { cn } from "@/lib/utils";
import checkIcon from "../assets/icons/check.svg";
const images = [slide1, slide2, slide3, slide4];
const contentList = [
  "Full stack human resources managers network working all over France.",
  "From strategy to implementation, we implement HR function within your company and manage your teams on a day-to-day basis.",
  "We use best It tools for amazing B to B HR interactions.",
];
// Auth Layout
export const AuthLayout = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex  min-h-[100dvh] w-full items-center justify-center relative bg-gray-100 ">
      {/* Carousel Section */}
      <div className="hidden lg:block min-h-screen w-full">
        <Carousel images={images} setIndex={setIndex} index={index} />
      </div>

      {/* Content Section */}
      <div className="lg:absolute z-10   w-full lg:flex h-full">
        <div className="w-full relative ">
      
          <div className="hidden sm:flex sm:flex-col absolute bottom-8 w-full justify-center items-center gap-[24px] ">
          <div className="p-6 w-[484px] rounded-[20px] bg-[rgba(255,255,255,0.95)] space-y-2">

          {contentList.map((li, index) => (
                <div key={index} className="flex items-start gap-[12px]">
                  <img src={checkIcon} className="w-[20px] h-[20px]" />
                  <p className="text-[14px] lg:text-[16px] text-[#596569]">{li}</p>
                </div>
              ))}
            </div>
            <div className=" sm:flex gap-3">
            {images.map((_, indx) => (
              <button
                key={indx}
                className={cn(
                  "w-[60px] h-2 rounded-[10px] transition-all duration-300",
                  index === indx ? "bg-white" : "bg-white/50 hover:bg-white/70"
                )}
                onClick={() => setIndex(indx)}
                aria-label={`Go to slide ${indx + 1}`}
              />
            ))}
            </div>
          </div>
        </div>

        {/* Outlet Section with Scrollable Content */}
       <div className=" overflow-y-auto w-full  my-auto max-h-[100dvh]">
       <Outlet />

       </div>
     
      </div>
    </div>
  );
};
