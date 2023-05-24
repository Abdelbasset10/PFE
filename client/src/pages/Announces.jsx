import React, { useEffect } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import Announce from '../components/Announce'

import Modal from '../components/Modal'
import { allAnnounces } from '../redux/features/announceSlice'
import { openAnnounceModal } from '../redux/features/modalSlice'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Announces = () => {
    const dispatch = useDispatch()
    const {isNewAnnounce} = useSelector((state)=>state.modal)
    const {announces} = useSelector((state)=>state.announce)
    const User = useSelector((state)=>state.auth?.authData?.user)

    useEffect(()=>{
        dispatch(allAnnounces())
    },[])

    

    if(isNewAnnounce){
        return <Modal />
    }

    
  return (
    <>
    <Navbar />
    <div className='flex'>
        <Sidebar />
        {announces.length === 0 ? (
            <div className='flex-[9] px-4 sm:px-10 py-10 border-l-[1px] border-t-[1px] shadow-lg' >
                <p>There is no Announces from Admins yet...</p>
            </div>
        ) : (
            <div className='flex-[9]' >
                <div className='px-4 sm:px-20 py-10 border-l-[1px] border-t-[1px] shadow-lg h-full' >
                <div className='flex justify-end' >
                    {User?.type === "admin" && (
                        <button className='flex mb-4  items-center gap-2 mt-4 py-1 px-4 text-pfe-white bg-pfe-blue rounded-lg' onClick={()=>dispatch(openAnnounceModal())} >
                            <IoIosAddCircleOutline className='text-pfe-white text-2xl' />
                            <p>Add New Announce</p>
                        </button>
                    )}
                </div>
                    <div className='flex flex-col gap-4' >
                        {announces.map((a,index)=>(
                            <div key={index} >
                                <Announce key={index} a={a} />
                            </div>
                        ))}

                    </div>
                </div>     
            </div>
        )}
        
    </div>
    </>
)
}

export default Announces