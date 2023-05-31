import React, { useEffect } from 'react'
import {useParams, useNavigate, useLocation} from 'react-router-dom'
import logo from '../assets/usthb.png'

import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {GoSearch} from 'react-icons/go'
import {GrNotification} from 'react-icons/gr'
import {AiOutlineEdit} from 'react-icons/ai'
import imgDefault from '../assets/user.png'
import { useState } from 'react'
import { getSubjectByField } from '../redux/features/subjectSlice'
import { searchNoBinome } from '../redux/features/studentSlice'
import { getStudent, searchUser } from '../redux/api'
import { toast } from 'react-toastify'
import { searchEncadreur } from '../redux/features/teacherSlice'
import { userNotifications } from '../redux/features/notificationSlice'
import Notification from './Notification'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {pathname} = useLocation()
  const [showNotfications,setShowNotifications] = useState(false)
  const [text,setText] = useState("")
  const user = useSelector((state)=>state.auth?.authData?.user)
  const userId = user?._id
  const {notifications} = useSelector((state)=>state.notification)
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(pathname === '/'){
      dispatch(getSubjectByField(text))
      navigate(`/?field=${text}`)
    }else if(pathname === '/binomes'){
      dispatch(searchNoBinome(text))
      navigate(`/binomes?userName=${text}`)
    }else if(pathname==='/teachers'){
      dispatch(searchEncadreur(text))
      navigate(`/teachers?userName=${text}`)
    }
    else{
      const {data} = await searchUser(text)
      if(!data){
        toast.error("there is no user with that name!")
        return
      }
      navigate(`/profile/${data?._id}`)
    }
  }

  useEffect(()=>{
    dispatch(userNotifications(userId))
  },[])
  return (
    <nav className='relative w-full bg-[#F9F9F9] z-10 sticky top-0 px-4 sm:px-8 py-8 md:py-4 md:h-[14vh] ' >
        <div className='flex justify-between items-center' >
            <Link to='/' >
              <img src={logo} alt="usthb" className='w-16 h-16' />
            </Link>
            <form className='hidden sm:flex items-center gap-4 shadow-md	rounded-md p-4 bg-[#F9F9F9] w-[20rem] ' onSubmit={handleSubmit} >
                <GoSearch className='text-xl text-[#28333B] cursor-pointer' />
                <input type="text" placeholder='Search...' className='outline-none bg-transparent w-full' onChange={(e)=>setText(e.target.value)} />        
            </form>
            <div className='flex items-center gap-4' >
                <div className='' >
                  <GrNotification className='text-3xl cursor-pointer' onClick={()=>setShowNotifications(!showNotfications)} />
                  {showNotfications && (
                    <div className='absolute max-h-[50vh] overflow-y-auto rounded-lg top-20 right-2 sm:right-10 px-4 py-2 bg-[#F9F9F9] text-pfe-black border-[1px] border-pfe-blue flex flex-col gap-4'>
                      {notifications.length > 0 ? notifications.map((notification,index)=>(
                        <Notification notification={notification} key={index} />
                      )) : (
                        <div>
                          <p>Don't have notification for the moment!</p>
                        </div>
                      )}

                    </div>
                  )}
                </div>
                <AiOutlineEdit className='text-3xl cursor-pointer' />
                <Link to={`/profile/${user?._id}`} >
                  <img src={user?.profilePicture ? user.profilePicture : imgDefault } alt="user photo" className='w-10 h-10 rounded-[50%]' />
                </Link>
            </div>
        </div>
        <form className='sm:hidden flex items-center gap-4 shadow-md	rounded-md p-4 bg-[#F9F9F9] w-full mt-2 ' onSubmit={handleSubmit} >
                <GoSearch className='text-xl text-[#28333B] cursor-pointer' />
                <input type="text" placeholder='Search...' className='outline-none bg-transparent w-full' onChange={(e)=>setText(e.target.value)} />        
        </form>

        
    </nav>
  )
}

export default Navbar