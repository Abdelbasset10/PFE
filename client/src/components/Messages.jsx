import React, { useState } from 'react'
import cat from '../assets/Cat03.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage } from '../redux/features/messengerSlice'

const Messages = ({message}) => {
  const dispatch = useDispatch()
    const user = useSelector((state)=>state.auth?.authData?.user)
    const userId = user?._id
    

    const convId = message.conversationId
    const senderId = userId

    
  return (
      <div  className={`flex gap-2 items-center ${message.sender !== userId && 'self-end'} `} >
          <img src={cat} alt="userImg" className='w-10 h-10 rounded-[50%]' />
          <p className='max-w-[15rem] bg-pfe-blue text-pfe-white px-2 py-1 rounded-lg' >{message.text}</p>
      </div>
      )
}

export default Messages