import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {GoSearch} from 'react-icons/go'
import {GrNotification} from 'react-icons/gr'
import {AiOutlineEdit} from 'react-icons/ai'
import imgDefault from '../assets/user.png'

const Navbar = () => {
  const user = useSelector((state)=>state.auth?.authData?.user)
  return (
    <nav className='w-full bg-[#F9F9F9] z-10 sticky top-0 px-4 sm:px-8 py-8 md:py-4 md:h-[14vh]' >
        <div className='flex justify-between items-center' >
            <h1 className='text-3xl text-pfe-blue' >LOGO</h1>
            <form className='hidden sm:flex items-center gap-4 shadow-md	rounded-md p-4 bg-[#F9F9F9] w-[20rem] ' >
                <GoSearch className='text-xl text-[#28333B] cursor-pointer' />
                <input type="text" placeholder='Search...' className='outline-none bg-transparent w-full' />        
            </form>
            <div className='flex items-center gap-4' >
                <GrNotification className='text-3xl cursor-pointer' />
                <AiOutlineEdit className='text-3xl cursor-pointer' />
                <Link to={`/profile/${user?._id}`} >
                  <img src={user?.profilePicture ? user.profilePicture : imgDefault } alt="user photo" className='w-10 h-10 rounded-[50%]' />
                </Link>
            </div>
        </div>
        <form className='sm:hidden flex items-center gap-4 shadow-md	rounded-md p-4 bg-[#F9F9F9] w-full mt-2 ' >
                <GoSearch className='text-xl text-[#28333B] cursor-pointer' />
                <input type="text" placeholder='Search...' className='outline-none bg-transparent w-full' />        
        </form>

        
    </nav>
  )
}

export default Navbar