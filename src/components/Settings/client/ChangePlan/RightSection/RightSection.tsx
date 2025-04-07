const StepIndicator = ({ activeStep }: { activeStep: string }) => {
    const steps = [1, "", 2, "", 3, "", 4, "", 5];
  
    const activeIndex = parseInt(activeStep);
    return (
      <div className="flex items-center justify-between w-full  my-4 ">
        {steps.map((step) => (
          <div key={step} className="flex items-center w-full ">
            {step !== "" ? (
              <div
                className={`!w-[38px] !h-[38px] rounded-full flex items-center justify-center font-primary text-[16px] ${
                  Number(step) < activeIndex
                    ? "bg-black text-white"
                    : Number(step) === activeIndex
                    ? "bg-black text-primary"
                    : "bg-[#00000030] text-white"
                }`}
              >
                {step}
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <div className={`h-[4px] w-[20px] bg-[#FC400633]`} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default StepIndicator;