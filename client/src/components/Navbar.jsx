import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {GoSearch} from 'react-icons/go'
import {GrNotification} from 'react-icons/gr'
import {AiOutlineEdit} from 'react-icons/ai'
import imgDefault from '../assets/user.png'
import { useState } from 'react'
import { getSubjectByField } from '../redux/features/subjectSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [text,setText] = useState("")
  const user = useSelector((state)=>state.auth?.authData?.user)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getSubjectByField(text))
    navigate(`/?field=${text}`)
  }
  return (
    <nav className='w-full bg-[#F9F9F9] z-10 sticky top-0 px-4 sm:px-8 py-8 md:py-4 md:h-[14vh]' >
        <div className='flex justify-between items-center' >
            <Link to='/' >
              <h1 className='text-3xl text-pfe-blue' >LOGO</h1>
            </Link>
            <form className='hidden sm:flex items-center gap-4 shadow-md	rounded-md p-4 bg-[#F9F9F9] w-[20rem] ' onSubmit={handleSubmit} >
                <GoSearch className='text-xl text-[#28333B] cursor-pointer' />
                <input type="text" placeholder='Search...' className='outline-none bg-transparent w-full' onChange={(e)=>setText(e.target.value)} />        
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