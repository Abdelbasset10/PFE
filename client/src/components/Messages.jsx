import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage } from '../redux/features/messengerSlice'
import userDefault from '../assets/user.png'
import { getAdmin, getStudent, getTeacher } from '../redux/api'

const Messages = ({message}) => {
  const dispatch = useDispatch()
    const user = useSelector((state)=>state.auth?.authData?.user)
    const userId = user?._id
   
    const [theSender,setTheSender] = useState(null)  
    useEffect(()=>{
      if(message.sender){
          const theSender = async () => {
              const {data} = await getTeacher(message.sender)
              if(!data) {
                  const {data} = await getStudent(message.sender)
                  setTheSender(data)
                  if(!data){
                    const {data} = await getAdmin(message.sender)
                    setTheSender(data)
                  }
              }else{
                  setTheSender(data)
              }                
          }
          theSender()
      }    
  },[message])
    
  return (
      <div  className={`flex gap-2 items-center ${message.sender !== userId && 'self-end'} `} >
          <img src={theSender?.profilePicture ? theSender.profilePicture :userDefault } alt="userImg" className='w-10 h-10 rounded-[50%]' />
          <p className='max-w-[15rem] bg-pfe-blue text-pfe-white px-2 py-1 rounded-lg' >{message.text}</p>
      </div>
      )
}

export default Messages