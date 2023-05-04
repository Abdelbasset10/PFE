import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {HiDocumentText} from 'react-icons/hi'
import {GrAnnounce} from 'react-icons/gr'
import {BsPeopleFill, BsMessenger} from 'react-icons/bs'
import {BiLogOutCircle} from 'react-icons/bi'
import {IoIosPaper} from 'react-icons/io'
import {MdSettings, MdDashboard} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { logOut } from '../redux/features/authSlice'

const Sidebar = () => {
    const dispatch = useDispatch()
    const {pathname} = useLocation()
    const User = useSelector((state)=>state.auth?.authData?.user)

  return (
    <div className='hidden md:block flex-[3] sticky top-[14vh]   h-[86vh]'>
        <div className='py-10 md:px-2 lg:px-6 flex flex-col justify-between h-full'>
            <div className='flex flex-col gap-6' >
                <div className={`flex items-center gap-2 ${pathname === '/' && 'border-[1px] border-pfe-blue text-pfe-blue'} cursor-pointer md:px-2 lg:px-6 py-1 rounded-lg ${pathname !== '/' && 'hover:text-pfe-blue hover:border-[1px] hover:border-pfe-blue'}`} >
                    <HiDocumentText />
                    <Link to='/' >Subjects</Link>
                </div>
                <div className={`flex items-center gap-2 md:px-2 lg:px-6 py-1 ${pathname === '/binomes' && 'border-[1px] border-pfe-blue text-pfe-blue'} cursor-pointer rounded-lg ${pathname !== '/binomes' && 'hover:text-pfe-blue hover:border-[1px] hover:border-pfe-blue'}`} >
                    <BsPeopleFill />
                    <Link to='/binomes' >Find Binome</Link>
                </div>
                <div className={`flex items-center gap-2 ${pathname === '/teachers' && 'border-[1px] border-pfe-blue text-pfe-blue'} cursor-pointer md:px-2 lg:px-6 py-1 rounded-lg ${pathname !== '/teachers' && 'hover:text-pfe-blue hover:border-[1px] hover:border-pfe-blue'}`} >
                    <BsPeopleFill />
                    <Link to='/teachers' >Find Teacher</Link>
                </div>
                <div className={`flex items-center gap-2 ${pathname === '/announces' && 'border-[1px] border-pfe-blue text-pfe-blue'} cursor-pointer md:px-2 lg:px-6 py-1 rounded-lg ${pathname !== '/announces' && 'hover:text-pfe-blue hover:border-[1px] hover:border-pfe-blue'}`} >
                    <GrAnnounce />
                    <Link to='/announces' >Admin Announcements</Link>
                </div>
                <div className={`flex items-center gap-2 ${pathname === '/messenger' && 'border-[1px] border-pfe-blue text-pfe-blue'} cursor-pointer md:px-2 lg:px-6 py-1 rounded-lg ${pathname !== '/messenger' && 'hover:text-pfe-blue hover:border-[1px] hover:border-pfe-blue'}`} >
                    <BsMessenger />
                    <Link to='/messenger' >Messages</Link>
                </div>
                {User?.type === "admin" && (
                    <div className={`flex items-center gap-2 ${pathname === '/dashboard' && 'border-[1px] border-pfe-blue text-pfe-blue'} cursor-pointer md:px-2 lg:px-6 py-1 rounded-lg ${pathname !== '/dashboard' && 'hover:text-pfe-blue hover:border-[1px] hover:border-pfe-blue'}`} >
                        <MdDashboard />
                        <Link to='/dashboard' >Dashboard</Link>
                    </div>
                )}
            </div>
            <div className='flex flex-col gap-4' >
                <div className='flex items-center gap-2 md:px-2 lg:px-6 py-1 hover:text-pfe-blue' >
                    <MdSettings />
                    <p>Settings</p>
                </div>
                <div className='flex items-center gap-2 md:px-2 lg:px-6 py-1 rounded-lg hover:text-pfe-blue' onClick={()=>dispatch(logOut())} >
                    <BiLogOutCircle />
                    <Link to='/login'>LogOut</Link>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Sidebar