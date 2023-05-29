import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import {IoIosArrowDown} from 'react-icons/io'
import { closeModal} from '../redux/features/modalSlice'
import { newSubject, updateSubject } from '../redux/features/subjectSlice'
import {toast} from 'react-toastify'
import { teacherSubjects } from '../redux/features/teacherSlice'
import { newAnnounce, updateAnnounce } from '../redux/features/announceSlice'
import FileInput from './FileInput'

const Modal = () => {
    const dispatch = useDispatch()
    const [subjectInfo,setSubjectInfo] = useState({
        title:"",description:"",subjectField:"",picture:"",pfeLvl:""
    })
    const {subjectId, isNewSubject, isNewAnnounce, announceId} = useSelector((state)=>state.modal)
    const {announces} = useSelector((state)=>state.announce)
    const {hisAnnounces} = useSelector((state)=>state.admin)
    const {subjects} = useSelector((state)=>state.subject)
    console.log(announceId)
    
    const User = useSelector((state)=>state.auth?.authData?.user)

    const handleChange = (e) => {
        setSubjectInfo({...subjectInfo,[e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isNewSubject){
            if(subjectId){
                dispatch(updateSubject({subjectInfo,subjectId,toast}))
            }else{
                dispatch(newSubject({subjectInfo,toast}))
            }
            
            dispatch(teacherSubjects(User._id))
        }else{
            if(announceId){
                dispatch(updateAnnounce({subjectInfo,announceId,toast}))
            }else{
                dispatch(newAnnounce({subjectInfo,toast}))
            }
        }
        
        dispatch(closeModal())
    }
    const getTheSubject = subjects.find((s)=>s._id === subjectId)
   
    const getTheAnnounce = announces.find((s)=>s._id === announceId) || hisAnnounces.find((s)=>s._id === announceId)


    const handleInputState = (name, value) => {
        setSubjectInfo((prev) => ({ ...prev, [name]: value }));
    };
    
    useEffect(()=>{
        if(getTheAnnounce){
            setSubjectInfo(getTheAnnounce)
        }
    },[announceId])
    console.log(getTheSubject)
    useEffect(()=>{
        if(getTheSubject){
            setSubjectInfo(getTheSubject)
        }
    },[subjectId])
    return (
    <div className='  fixed z-20 top-0 w-full bg min-h-screen flex items-center justify-center '>
        <div className='relative mt-4 sm:mt-0 bg-pfe-white p-4 w-11/12 md:w-8/12 lg:w-7/12 xl:w-6/12 flex flex-col items-center  rounded-lg ' >
            <FaTimes className='absolute top-2 right-4 text-pfe-blue text-3xl cursor-pointer' onClick={()=>dispatch(closeModal())} />
            <h1 className='font-bold text-2xl my-4' >{subjectId ? 'Update' : announceId ? 'Update' : 'Add New'} {isNewSubject ? 'Subject' : 'Announce'}</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
                {isNewSubject && (
                    <div>
                        <div className='p-2 border-[1px] border-bg text-[gray] flex flex-wrap justify-between ' >
                            <label>Select your PFE Type</label>
                            <select className='outline-none' name="subjectField" value={setSubjectInfo.subjectField} onChange={handleChange} >
                                <option>web</option>
                                <option>mobile</option>
                                <option>ai</option>
                                <option>cyber</option>
                            </select>
                        </div>
                        <div className='p-2 border-[1px] border-bg text-[gray] flex flex-wrap justify-between mt-4 '>
                            <h1>Select PFE LVL</h1>
                            <div className='flex gap-4' >
                                <div className='flex gap-2' >
                                    <label>L3</label>
                                    <input type="radio" name='pfeLvl' checked={setSubjectInfo.pfeLvl} onChange={(e)=>setSubjectInfo({...subjectInfo,pfeLvl:"L3"})}  />
                                </div>
                                <div className='flex gap-2'>
                                    <label>M2</label>
                                    <input type="radio" name='pfeLvl' checked={setSubjectInfo.pfeLvl} onChange={(e)=>setSubjectInfo({...subjectInfo,pfeLvl:"M2"})}  />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div className='p-2 border-[1px] border-bg text-[gray] flex flex-wrap justify-between gap-4'>
                    <label>Select an Image</label>
                    <FileInput
                    name="picture"
                    label="Choose Image"
                    handleInputState={handleInputState}
                    value={subjectInfo.picture}
                    type="image"
                    />                           
                </div>
                <div className='p-2 border-[1px] border-bg text-[gray] flex flex-wrap justify-between gap-4'>
                    <input type="text"  className='outline-none' placeholder='Title...' name="title" value={subjectInfo.title} onChange={handleChange} />
                </div>
                    <textarea  rows="5" placeholder='Descrition...' className='w-full outline-none p-2 border-[1px] text-[gray] border-bg rounded-lg' name="description" value={subjectInfo.description} onChange={handleChange}></textarea>
                    <div className='flex flex-wrap items-center justify-center gap-4' >
                        <p className='px-10 py-1 border-[1px] border-red-600 rounded-lg text-red-600 cursor-pointer' > Cancel</p>
                        <button className='px-10 py-1 border-[1px] border-pfe-blue rounded-lg text-pfe-blue'>{subjectId ? 'Update' : announceId ? 'Update' : 'Add'}</button>
                    </div>
            </form>

        </div>
    </div>
  )
}

export default Modal