import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getAdmin, getStudent, getTeacher } from '../redux/api'
import defaultImg from '../assets/user.png'
import { toast } from 'react-toastify'
import { addBinome, addEncadreur } from '../redux/features/studentSlice'
import { acceptNotification, declineNotification } from '../redux/features/notificationSlice'

const Notification = ({notification}) => {
    const dispatch = useDispatch()
    const user = useSelector((state)=>state.auth?.authData?.user)
    const [theSender,setTheSender] = useState(null)  
    const [theReceiver,setTheReceiver] = useState(null)  
    const UserId = theSender?._id
    const userId = theReceiver?._id
    const notificationId = notification?._id
    
    const getSender = async () => {
        const {data} = await getTeacher(notification.sender)
        if(!data) {
            const {data} = await getStudent(notification.sender)
            setTheSender(data)
            if(!data){
            const {data} = await getAdmin(notification.sender)
            setTheSender(data)
            }
        }else{
            setTheSender(data)
        }                
    }

    const getReceiver = async () => {
        const {data} = await getTeacher(notification.receiver)
        if(!data) {
            const {data} = await getStudent(notification.receiver)
            setTheReceiver(data)
            if(!data){
            const {data} = await getAdmin(notification.receiver)
            setTheReceiver(data)
            }
        }else{
            setTheReceiver(data)
        }                
    }
    useEffect(()=>{
        getSender()
        getReceiver()
    },[notification])

    const handleAccept = () => {
        if(notification?.type === "binome"){
            dispatch(addBinome({userId,UserId,toast}))
        }else{
        
            dispatch(addEncadreur({UserId,userId,toast}))
        }
        dispatch(acceptNotification(notificationId))
    }

    const handleDecline = () => {
        dispatch(declineNotification(notificationId))
    }

console.log(notification)
    return (
    <div className='flex'>
        {theSender?._id === user?._id ? (
            <div className='flex items-center gap-4' >
                <p>you have been send {notification?.type} request to {theReceiver?.name}! </p>
                <img src={theReceiver?.profilePicture ? theReceiver.profilePicture : defaultImg} alt="user img" className='w-10 h-10 rounded-full' />
                {notification?.status === "accepted" ? (
                    <p className='text-green-500' >accepted</p>
                ) : notification?.status === "declined" ? (
                    <p className='text-red-500' >declined</p>
                ) : (
                    <p className='text-pfe-blue' >pending</p>
                )}
            </div>
        ) : (
            <div className='flex items-center gap-4' >
                <img src={theSender?.profilePicture ? theSender.profilePicture : defaultImg} alt="user img" className='w-10 h-10 rounded-full' />
                <p>{theSender?.name} has been sent you {notification?.type} request!</p>
                {notification?.status === "pending" ? (
                    <div className='flex items-center gap-2' >
                        <button className='px-2 py-1 border-[1px] border-green-500 rounded-lg' onClick={handleAccept} >Accept</button>
                        <button className='px-2 py-1 border-[1px] border-red-500 rounded-lg' onClick={handleDecline} >Decline</button>
                    </div>
                ) : notification?.status === "accepted" ? (
                        <p className='text-green-500' >Accepted</p>
                ): (
                        <p className='text-red-500' >Declined</p>
                )}
            </div>
        )}

    </div>
    )
}

export default Notification