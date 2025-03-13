import { Star } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
const StarRating = ({ field }: { field: any }) => {
    const [hover, setHover] = useState<number | null>(null);
  
    return (
      <Controller
        name={field.name}
        control={field.control}
        rules={{ required: "Please select a rating" }}
        render={({ field }) => (
           <div className="flex flex-col gap-2 items-center">

            <p className="text-[15px] font-semibold font-primary text-black ">Rate the service and delivery</p>
            <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                className={`cursor-pointer transition-colors ${
                  (hover ?? field.value) >= star ? "text-primary" : "text-gray-300"
                }`}
                onClick={() => field.onChange(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                strokeWidth={1.5}
                fill={(hover ?? field.value) >= star ? "currentColor" : "none"}
              />
            ))}
          </div>
           </div>
       
        )}
      />
    );
  };

  export default StarRating;