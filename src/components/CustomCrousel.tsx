import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface CrouseProps{
    images:string[];
    index:number;
    setIndex:(value:number)=>void
}


const Carousel: React.FC<CrouseProps> = ({images,index,setIndex}) => {
 
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const nextSlide = () => {
    setDirection(1);
    const newIndex = (index - 1 + images.length) % images.length;
    setIndex(newIndex);
  };

  const prevSlide = () => {
    setDirection(-1);
    const newIndex = (index - 1 + images.length) % images.length;
    setIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextSlide();
      if (event.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="absolute w-full h-full object-cover"
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

    
    </div>
  );
};

export default Carousel;