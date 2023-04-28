import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cat from '../assets/Cat03.jpg'
import { getStudent, getTeacher } from '../redux/api'
import { messagesConversation, setFreind } from '../redux/features/messengerSlice'


const Conversation = ({conv}) => {
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.auth?.authData?.user)
    const userId = user?._id
    const convId = conv?._id
    const freind = conv.members.find((f)=>f !== userId)
    const [theFreind,setTheFreind] = useState("")

    const getConvFreind = () => {
        dispatch(messagesConversation(convId))
        dispatch(setFreind({theFreind,convId}))
    }

    useEffect(()=>{
        if(freind){
            const getFreind = async () => {
                const {data} = await getTeacher(freind) && await getStudent(freind)
                setTheFreind(data.name)
            }
            getFreind()
        }    
    },[freind])
    return (
    <div className='flex gap-2 items-center hover:bg-pfe-blue hover:text-pfe-white hover:px-2 hover:py-1 hover:rounded-lg hover:cursor-pointer' onClick={getConvFreind} >
        <img src={cat} alt="userImg" className='w-10 h-10 rounded-[50%]' />
        <p>{theFreind}</p>
    </div>
  )
}

export default Conversation