
import filterIcon from '@/assets/icons/sort.svg'
import SearchInput from '@/components/SeachInput'
import { Button } from '@/components/ui/button'
// import documentIcon from '@/assets/icons/document-solid.svg'
const Header = () => {
  return (
    <div className='flex flex-col md:flex-row  justify-between w-full gap-4 md:gap-2 md:items-center'>
        <div className="text-[16px] font-primary font-medium text-black w-50">
        Permanent Files
      </div>
      <SearchInput className='!w-full' placeholder='Search Here' onSearch={(value)=>{
        console.log("searchValue",value)
      }} />
      <div className='flex gap-4 items-center  justify-end '>
        <Button variant='outline' className='border-black'>
            <img src={filterIcon} alt='filter' />  Sort
        </Button>
        {/* <Button variant='outline' className='border-black'>
            <img src={documentIcon} alt='filter' />  Order Requests
        </Button> */}
      </div>
    </div>
  )
}

export default Header