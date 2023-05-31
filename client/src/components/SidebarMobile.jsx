import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { BiLogOutCircle } from 'react-icons/bi'
import { BsMessenger, BsPeopleFill } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { GrAnnounce } from 'react-icons/gr'
import {HiDocumentText} from 'react-icons/hi'

import { IoIosPaper } from 'react-icons/io'
import { MdDashboard, MdSettings } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { logOut } from '../redux/features/authSlice'

const SidebarMobile = ({setShowSide}) => {
    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const User = useSelector((state)=>state.auth?.authData?.user)

  return (
    <div className='w-full bg-pfe-blue fixed h-screen z-20' >
        <FaTimes className='absolute top-2 right-4 text-pfe-white cursor-pointer text-3xl' onClick={()=>setShowSide(false)}   />
        <div className='py-10 px-8 flex flex-col gap-8 h-full'>
            <div className='flex flex-col gap-4' >
                <div className={`flex items-center gap-2 ${pathname === '/' && 'border-[1px] border-pfe-white '} text-pfe-white cursor-pointer px-4 py-2 rounded-lg `} >
                    <HiDocumentText className='text-pfe-white text-xl' />
                    <Link to='/' >Subjects</Link>
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 ${pathname === '/binomes' && 'border-[1px] border-pfe-white '} text-pfe-white cursor-pointer rounded-lg `} >
                    <BsPeopleFill className='text-pfe-white text-xl'  />
                    <Link to='/binomes' >Find Binome</Link>
                </div>
                <div className={`flex items-center gap-2 ${pathname === '/teachers' && 'border-[1px] border-pfe-white '} text-pfe-white cursor-pointer px-4 py-2 rounded-lg `} >
                    <BsPeopleFill className='text-pfe-white text-xl'  />
                    <Link to='/teachers' >Find Teacher</Link>
                </div>
                <div className={`flex items-center gap-2 ${pathname === '/announces' && 'border-[1px] border-pfe-white '} text-pfe-white cursor-pointer px-4 py-2 rounded-lg `} >
                    <GrAnnounce className='text-pfe-white text-xl' />
                    <Link to='/announces' >Admin Announcements</Link>
                </div>
                <div className={`flex items-center gap-2 ${pathname === '/messenger' && 'border-[1px] border-pfe-white '} text-pfe-white cursor-pointer px-4 py-2 rounded-lg `} >
                    <BsMessenger className='text-pfe-white text-xl'  />
                    <Link to='/messenger' >Messages</Link>
                </div>
                {User?.type === "admin" && (
                    <div className={`flex items-center gap-2 ${pathname === '/dashboard' && 'border-[1px] border-pfe-white '} text-pfe-white cursor-pointer px-4 py-2 rounded-lg `} >
                        <MdDashboard className='text-pfe-white text-xl'  />
                        <Link to='/dashboard' >Dashboard</Link>
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-4' >
                <div className='flex items-center gap-2 px-4 py-2 text-pfe-white' >
                    <MdSettings className='text-pfe-white text-xl'  />
                    <Link to='/subjects' >Settings</Link>
                </div>
                <div className='flex items-center gap-2 px-4 py-2 rounded-lg text-pfe-white' onClick={()=>dispatch(logOut())}>
                    <BiLogOutCircle className='text-pfe-white text-xl'  />
                    <Link to='/login' >Log Ou</Link>
                </div>
            </div>
        </div>

    </div>
  )
}

export default SidebarMobile