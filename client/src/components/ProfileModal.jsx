import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import { closeModal, closeProfileModal} from '../redux/features/modalSlice'
import {toast} from 'react-toastify'
import { allStudents, updateStudent } from '../redux/features/studentSlice'
import { allTeachers, updateTeacher } from '../redux/features/teacherSlice'
import { allAdmins, updateAdmin } from '../redux/features/adminSlice'


const ProfileModal = () => {
    const dispatch = useDispatch()
    const [userInfo,setUserInfo] = useState({
        name:"",email:"",section:"",lvl:"",profilePicture:"",pfeType:"",
    })

    const User = useSelector((state)=>state.auth?.authData?.user)

    const {students} = useSelector((state)=>state.student)
    const {teachers} = useSelector((state)=>state.teacher)
    const {admins} = useSelector((state)=>state.admin)

    
    const handleChange = (e) => {
        setUserInfo({...userInfo,[e.target.name]:e.target.value})
    }
    const userId = User?._id
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(User.type ==="student"){
            dispatch(updateStudent({userId,userInfo,toast}))
        }else if(User.type ==="teacher"){
            dispatch(updateTeacher({userId,userInfo,toast}))
        }else if(User.type ==="admin"){
            dispatch(updateAdmin({userId,userInfo,toast}))
        }
    }

    let user
    if(User.type ==="student"){
        user = students.find((s)=>s._id === User?._id)
    }else if(User.type ==="teacher"){
        user = teachers.find((t)=>t._id === User?._id)
    }else if(User.type ==="admin"){
        user = admins.find((a)=>a._id === User?._id)
    }

    useEffect(()=>{
        if(User.type === "student"){
            dispatch(allStudents())
        }else if(User.type === "teacher"){
            dispatch(allTeachers())
        }else if(User.type ==="admin"){
            dispatch(allAdmins())
        }
    },[])

    useEffect(()=>{
        if(User){
            setUserInfo(user)
        }
    },[User?._id])
    return (
    <div className='  fixed z-20 top-0 w-full bg h-screen flex items-center justify-center '>
        <div className='relative mt-4 sm:mt-0 bg-pfe-white p-4 w-11/12 md:w-8/12 lg:w-7/12 xl:w-6/12 flex flex-col items-center  rounded-lg ' >
            <FaTimes className='absolute top-2 right-4 text-pfe-blue text-3xl cursor-pointer' onClick={()=>dispatch(closeProfileModal())} />
            <h1 className='text-xl font-bold' >Update Your Profile</h1>
            <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit} >
                <input type="text" className='h-10 p-2 outline-none border-[1px] border-[gray] w-full' name='name' value={userInfo.name} onChange={handleChange} />
                <input type="email" className='h-10 p-2 outline-none border-[1px] border-[gray] w-full' name='email' value={userInfo.email} onChange={handleChange} />
                {User.type === "student" && (
                    <div className='flex flex-col gap-4' >
                        <div className='p-2 border-[1px] text-pfe-gray text-[gray] flex flex-wrap justify-between ' >
                            <label>Update Your Section</label>
                            <select className='outline-none' name="section" value={userInfo.section} onChange={handleChange} >
                                <option  value="ACAD A" >ACAD A</option>
                                <option  value="ACAD B">ACAD B</option>
                                <option  value="ACAD C">ACAD C</option>
                                <option  value="ISIL A">ISIL A</option>
                                <option  value="ISIL B">ISIL B</option>
                                <option  value="GTR">GTR</option>
                            </select>
                        </div>
                        <div className='p-2 border-[1px] text-pfe-gray text-[gray] flex flex-wrap justify-between mb-4 ' >
                            <label>Choose Your Lvl</label>
                            <div className='flex gap-8' >
                                <div className='flex gap-1' >
                                <label>L3</label>
                                <input type="radio" name='userLvl' onChange={()=>setUserInfo({...userInfo,lvl:"L3"})} />
                                </div>
                                <div className='flex gap-1' >
                                <label>M2</label>
                                <input type="radio" name='userLvl' onChange={()=>setUserInfo({...userInfo,lvl:"M2"})} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='p-2 border-[1px] text-pfe-gray text-[gray] flex flex-wrap justify-between items-center ' >
                            <label>Choose Your PFE Type</label>
                                <div className='grid grid-cols-2' >
                                    <div className='flex gap-2' >
                                        <input type="checkbox"   onChange={(e)=> setUserInfo({...userInfo,pfeType:"web"})} />
                                        <label>web</label>
                                    </div>
                                    <div className='flex gap-2' >
                                        <input type="checkbox"    onChange={(e)=> setUserInfo({...userInfo,pfeType:"mobile"})} />
                                        <label>mobile</label>
                                    </div>
                                    <div className='flex gap-2' >
                                        <input type="checkbox"   onChange={(e)=> setUserInfo({...userInfo,pfeType:"ai"})} />
                                        <label>ai</label>
                                    </div>
                                    <div className='flex gap-2' >
                                        <input type="checkbox"   onChange={(e)=> setUserInfo({...userInfo,pfeType:"cyber"})} />
                                        <label>cyber</label>
                                    </div>
                                </div>
                </div>
                <div className='flex flex-wrap items-center justify-center gap-4' >
                    <p className='px-10 py-1 border-[1px] border-red-600 rounded-lg text-red-600 cursor-pointer' > Cancel</p>
                    <button className='px-10 py-1 border-[1px] border-pfe-blue rounded-lg text-pfe-blue'>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ProfileModal