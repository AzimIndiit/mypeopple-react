import Carousel from "@/components/CustomCrousel";
import { Outlet } from "react-router-dom";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.png";
import slide3 from "../assets/slide3.png";
import slide4 from "../assets/slide4.png";
import { useState } from "react";
import { cn } from "@/lib/utils";

const images = [slide1, slide2, slide3, slide4];

// Auth Layout
export const AuthLayout = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex min-h-screen w-full items-center justify-center relative bg-gray-200 ">
      {/* Carousel Section */}
      {/* <div className="hidden sm:block min-h-screen w-full">
        <Carousel images={images} setIndex={setIndex} index={index} />
      </div> */}

      {/* Content Section */}
      <div className="lg:absolute z-10   w-full lg:flex ">
        <div className="w-full relative">
          {/* <div className="hidden sm:flex gap-3 absolute bottom-8 w-full justify-center">
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
          </div> */}
        </div>

        {/* Outlet Section with Scrollable Content */}
       
          <Outlet />
     
      </div>
    </div>
  );
};
