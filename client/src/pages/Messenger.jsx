import React, {useEffect, useState, useRef} from 'react'
import { people } from '../data'
import defaultImg from '../assets/user.png'
import { MdCall} from 'react-icons/md'
import {FaVideo} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { createMessage, userConversations } from '../redux/features/messengerSlice'
import { getStudent, getTeacher } from '../redux/api'
import Conversation from '../components/Conversation'
import Messages from '../components/Messages'
import {io} from 'socket.io-client'
import Navbar from '../components/Navbar'

const Messenger = () => {

    const socket = useRef()
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.auth?.authData?.user)
    const userId = user?._id
    const {userConvs, convMessages, freind, convId, conv} = useSelector((state)=>state.messenger)
    const [messages,setMessages] = useState(convMessages)

    const [arrivalMesage,setArrivalMesage] = useState(null)
    const [text,setText] = useState("")
    const senderId = userId

    useEffect(()=>{
        setMessages(convMessages)
    },[convMessages])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createMessage({convId,senderId,text}))
        console.log("ok")
        socket.current.emit("SendMessage",{
            senderId:userId,
            receiverId:freind._id,
            text
        })
        setArrivalMesage(null)
        setText("")
    }
    useEffect(()=>{
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage",(data)=>{
            setArrivalMesage({
                sender:data.senderId,
                text:data.text,
            })
        })
    },[])

    useEffect(()=>{
            arrivalMesage && conv?.members.includes(arrivalMesage.sender) && 
            setMessages((prev)=>[...prev,arrivalMesage])
    },[arrivalMesage,conv])

    console.log(userConvs)
    useEffect(()=>{
        socket.current.emit("addUser",userId)
        socket.current.on("onlineUsers",(users)=>{
        })
        
    },[userId])
    useEffect(()=>{
        if(userId){
            dispatch(userConversations(userId))
        }

    },[userId])

    return (
        <>
        <Navbar />
        <div className='flex h-[86vh] border-[1px] shadow-lg rounded-lg ' >
            <div className='flex-[3] hidden  md:flex flex-col gap-4 py-10 md:px-2 lg:px-6 h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-pfe-blue '>
                {userConvs.length === 0 ? (
                    <div className='border-r-[1px] border-pfe-blue h-full shadow-lg pr-4' >
                        <p>There is No conversations for Now...</p>
                        <p>Please Back and Select some user to talk with him !</p>
                    </div>
                ) : (
                    userConvs.map((userConv,index)=>{
                        return (
                            <Conversation key={index} conv={userConv}  />
                        )
                    })
                )}
            </div>
            {!freind ? (
                <div className='flex-[9] py-10'>
                    <p>Select Conversation to start Talk !!</p>
                </div>
            ) : (
                <div className='flex-[9] flex flex-col gap-4 py-10  h-full relative' >
                <div>
                <div className='flex items-center justify-between border-b-[1px] pb-[1rem]  '>
                    <div className='flex items-center gap-2 px-2 lg:px-6' >
                        <img src={freind.profilePicture ? freind.profilePicture : defaultImg} alt="userImg" className='w-10 h-10 rounded-[50%]' />
                        <p className='text-pfe-blue text-xl'>{freind?.name}</p>
                    </div>
                    <div className='flex gap-4 md:px-2 lg:px-6' >
                        <MdCall className='text-3xl text-pfe-blue cursor-pointer ' />
                        <FaVideo className='text-3xl text-pfe-blue cursor-pointer' />
                        
                    </div>
                </div>
                <div className='flex flex-col gap-4   overflow-y-scroll scrollbar-thin scrollbar-thumb-pfe-blue px-2 lg:px-6 h-[60vh]' >
                    {messages.length === 0 ? (
                        <div>
                            <p>Start The Conversation !!</p>
                        </div>
                    ): (
                        messages.map((message,index)=>{
                        return (
                            <Messages key={index} message={message} />
                        )
                    })
                    )}
                    
                </div>
                <div className='absolute bottom-0 left-0 right-0 shadow-lg border-t-[2px] ' >
                    <form className='w-full h-[3rem]' onSubmit={handleSubmit}  >
                        <input type="text" placeholder='Enter Message' className='w-full px-2 lg:px-6 rounded-lg bg-[#F9F9F9] border-0 outline-none h-full' value={text} onChange={(e)=>setText(e.target.value)} />
                    </form>
                </div>
                </div>      
            </div>
            )}
        </div>
        </>
    )
}

export default Messenger