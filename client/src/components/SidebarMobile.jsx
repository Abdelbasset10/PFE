import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsPeopleFill } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { IoIosPaper } from 'react-icons/io'
import { MdSettings } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

const SidebarMobile = ({setShowSide}) => {
    const {pathname} = useLocation()

  return (
    <div className='w-full bg-pfe-blue fixed h-screen z-20' >
        <FaTimes className='absolute top-2 right-4 text-pfe-white cursor-pointer text-3xl' onClick={()=>setShowSide(false)}   />
        <div className='py-14 px-8 flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-6' >
                <div className={`flex items-center gap-2  text-pfe-white px-2 border-[1px] border-pfe-white lg:px-6 py-1 rounded-lg`} >
                    <AiFillHome />
                    <Link to='/' >Home</Link>
                </div>
                <div className={`flex items-center gap-2  text-pfe-white px-2 border-[1px] border-pfe-white lg:px-6 py-1 rounded-lg`} >
                    <BsPeopleFill />
                    <Link to='/binomes' >Find Binome</Link>
                </div>
                <div className={`flex items-center gap-2  text-pfe-white px-2 border-[1px] border-pfe-white lg:px-6 py-1 rounded-lg`} >
                    <IoIosPaper />
                    <Link to='/subjects' >Subjects proposed</Link>
                </div>
            </div>
            <div className='flex flex-col gap-4' >
                <div className='flex items-center gap-2 md:px-2 lg:px-6 py-1 text-pfe-white' >
                    <MdSettings />
                    <Link to='/subjects' >Settings</Link>
                </div>
                <div className='flex items-center gap-2 md:px-2 lg:px-6 py-1 rounded-lg text-pfe-white' >
                    <BiLogOutCircle />
                    <Link to='/subjects' >Log Ou</Link>
                </div>
            </div>
        </div>

    </div>
  )
}

export default SidebarMobile