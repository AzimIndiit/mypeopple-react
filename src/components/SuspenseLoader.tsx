
import logo from "@/assets/icons/logo.svg"
import logo1 from "@/assets/icons/logo1.svg"
const SuspenseLoader = () => {
  return (
    <div className='flex flex-col gap-2 justify-center items-center h-full'>
     
                <img src={logo} alt="logo" className="h-[32px] w-[176px] hidden md:block " />
                <img src={logo1} alt="logo" className="h-[56px] w-[56px] block md:hidden" />
                <p className="font-primary text-lg" >Loading...</p>
    </div>
  )
}

export default SuspenseLoader