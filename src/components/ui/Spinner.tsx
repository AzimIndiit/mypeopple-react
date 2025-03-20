import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type SpinnerProps = {
  size?: "small" | "medium" | "large";
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({
  size = "medium",
  className = "",
}) => {
  const sizeClasses: { [key in NonNullable<SpinnerProps["size"]>]: string } = {
    small: "h-4 w-4", // 16px
    medium: "h-6 w-6", // 24px (default)
    large: "h-10 w-10", // 40px
  };

  return (
    <div className={cn("flex justify-center items-center h-full")}>
      <Loader2
        className={cn(
          sizeClasses[size],
          "animate-spin text-primary",
          className
        )}
      />
    </div>
  );
};

export default Spinner;
