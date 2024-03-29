import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {FiMoreHorizontal} from 'react-icons/fi'
import imgDefault from '../assets/user.png' 
import { getTeacher } from '../redux/api'
import {openUpdateSubjectModal} from '../redux/features/modalSlice'
import Modal from './Modal'
import { allSubjects, cacheSubject, deleteSubject, getNoCachedSubjects } from '../redux/features/subjectSlice'
import {toast} from 'react-toastify'
import moment from 'moment'

const Subject = ({s}) => {

  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [readMore,setReadMore] = useState(false)
  const User = useSelector((state)=>state.auth?.authData?.user)
  const subjectId = s?._id
  
  const [teacher,setTeacher] = useState(null)
  const [show,setShow] = useState(false)
  
  const handleDeleteubject = () => {
    dispatch(deleteSubject({subjectId,toast}))
    dispatch(allSubjects())
  }
  useEffect(()=>{
    const getTheTeacher = async () =>{
      const {data} = await getTeacher(s?.teacher)
      setTeacher(data)
    }
    getTheTeacher()
  },[s])

  const handleCacheSubject = () => {
    dispatch(cacheSubject({subjectId,toast}))
    dispatch(getNoCachedSubjects())
  }

  const desc = s?.description.split(' ');

  const renderDescription = () => {
    return desc.map((word, index) => {
      if (word.startsWith('http://') || word.startsWith('https://')) {
        return (
          <a key={index} href={word} target="_blank" rel="noopener noreferrer" className='text-pfe-blue'>
            {word}
          </a>
        );
      } else {
        return <span key={index}>{word} </span>;
      }
    });
  };

  

  const text = renderDescription()
  const slicedText = text.splice(0,40)
  

  return (
    <div className='border-[1px] shadow-lg rounded-lg' >
      <div className='p-4' >
        <div className='flex justify-between ' >
          <div className='flex items-center gap-2' >
            <img src={teacher?.profilePicture ? teacher?.profilePicture : imgDefault} alt="userImage" className='w-10 h-10 rounded-[50%] cursor-pointer' onClick={()=>navigate(`/profile/${teacher._id}`)} />
            <div>
              <p className='font-bold' >{teacher?.name}</p>
              <p>{moment(s?.createdAt).fromNow()}</p>
            </div>
          </div>
          {User._id === s?.teacher &&  (
            <div className='relative' >
              <FiMoreHorizontal className='text-3xl text-pfe-blue cursor-pointer' onClick={()=>setShow(!show)}/>
              {show && (
                <div className='flex flex-col gap-2 bg-pfe-blue text-pfe-white px-8 py-4 absolute top-6 right-0' >
                  <p className='cursor-pointer hover:text-blue-200' onClick={()=>dispatch(openUpdateSubjectModal(s._id))} >Update</p>
                  <p className='cursor-pointer hover:text-blue-200' onClick={handleDeleteubject} >Delete</p>
                  <p className='cursor-pointer hover:text-blue-200' onClick={handleCacheSubject} >Cache</p>
                </div>
              )}
            </div>
          )}
        </div>
        <p className='font-bold text-pfe-blue mt-1' >{s?.title}</p>
        
        <p className='text-sm sm:text-base' >{readMore ? renderDescription(): slicedText} ...{readMore ? <span className='text-pfe-blue cursor-pointer' onClick={()=>setReadMore(false)} >read less</span> : <span className='text-pfe-blue cursor-pointer' onClick={()=>setReadMore(true)}>read More</span> }</p>
        <p className='text-pfe-blue' >#{s?.subjectField} #{s?.pfeLvl}</p>
        {s?.picture && (
          <img src={s?.picture} alt="subject Image" className='w-full h-[20rem] object-contain' />
        )}
      </div>
    </div>
  )
}

export default Subject