import React, { useEffect, useState } from 'react'
import { FiMoreHorizontal } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import imgDefault from '../assets/user.png' 
import { getAdmin } from '../redux/api'
import { deleteAnnounce } from '../redux/features/announceSlice'
import {openUpdateAnnounceModal} from '../redux/features/modalSlice'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Announce = ({a}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const User = useSelector((state)=>state.auth?.authData?.user)
  const [show,setShow] = useState(false)
  const [admin,setAdmin] = useState(null)
  const announceId = a._id

  const handleDeleteAnnounce = () => {
    dispatch(deleteAnnounce({announceId,toast}))
  }


  useEffect(()=>{
    const getTheAdmin = async () =>{
      const {data} = await getAdmin(a.admin)
      setAdmin(data)
    }
    getTheAdmin()
  },[a])
  return (
    <div className='border-[1px] shadow-lg' >
      <div className='p-4' >
        <div className='flex justify-between '>
          <div className='flex items-center gap-2' >
            <img src={admin?.profilePicture ? admin?.profilePicture : imgDefault} alt="userImage" className='w-10 h-10 rounded-[50%] cursor-pointer' onClick={()=>navigate(`/profile/${admin._id}`)} />
            <div>
              <p className='font-bold' >{admin?.name}</p>
              <p>24/03/2023</p>
            </div>
          </div>
          {User._id === a.admin &&  (
              <div className='relative' >
                <FiMoreHorizontal className='text-3xl text-pfe-blue cursor-pointer' onClick={()=>setShow(!show)}/>
                {show && (
                  <div className='flex flex-col gap-2 bg-pfe-blue text-pfe-white px-8 py-4 absolute top-6 right-0' >
                    <p className='cursor-pointer hover:text-blue-200' onClick={()=>dispatch(openUpdateAnnounceModal(a._id))} >Update</p>
                    <p className='cursor-pointer hover:text-blue-200' onClick={handleDeleteAnnounce} >Delete</p>
                  </div>
                )}
              </div>
            )}
        </div>
        <p className='font-bold text-pfe-blue mt-1' >{a.title}</p>
        <p className='text-sm sm:text-base' >{a.description}</p>
      </div>
    </div>
  )
}

export default Announce