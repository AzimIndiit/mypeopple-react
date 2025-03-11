import React from 'react'
import SearchInput from '../SeachInput'
import { Button } from '../ui/button'
import filterIcon from '@/assets/icons/sort.svg'
import documentIcon from '@/assets/icons/document-solid.svg'
const Header = () => {
  return (
    <div className='flex justify-between w-full gap-2'>
      <SearchInput placeholder='Search Here' onSearch={(value)=>{
        console.log("searchValue",value)
      }} />
      <div className='flex gap-2 items-center'>
        <Button variant='outline' className='border-black'>
            <img src={filterIcon} alt='filter' />  Sort
        </Button>
        <Button variant='outline' className='border-black'>
            <img src={documentIcon} alt='filter' />  HRBP Requests
        </Button>
      </div>
    </div>
  )
}

export default Header