import SearchInput from '../SeachInput'
import { Button } from '../ui/button'
import filterIcon from '@/assets/icons/sort.svg'
const Header = () => {
  return (
    <div className='flex flex-col lg:flex-row  justify-between w-full gap-4 md:gap-2'>
      <SearchInput placeholder='Search Here' className='max-w-full' onSearch={(value)=>{
        console.log("searchValue",value)
      }} />
      <div className='flex gap-4 items-center  justify-end'>
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