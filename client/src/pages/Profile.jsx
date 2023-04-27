import React , {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { openAnnounceModal, openProfileModal, openSubjectModal } from '../redux/features/modalSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCamera } from 'react-icons/fa'
import cat from '../assets/Cat03.jpg'
import {AiOutlineEdit} from 'react-icons/ai'
import Subject from '../components/Subject'
import { people } from '../data'
import { IoIosAddCircleOutline } from 'react-icons/io'
import Modal from '../components/Modal'
import { addBinome, addEncadreur, allStudents, beNoBinome, getTheStudent, removeEncadreur } from '../redux/features/studentSlice'
import { allTeachers, teacherSubjects } from '../redux/features/teacherSlice'
import { getStudent, getTeacher,  } from '../redux/api'
import { adminAnnounces, allAdmins } from '../redux/features/adminSlice'
import Announce from '../components/Announce'
import ProfileModal from '../components/ProfileModal'
import {toast} from 'react-toastify'
import UserName from '../components/UserName'
import Sidebar from '../components/Sidebar'


const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [theStudent,setTheStudent] = useState()
    const {students, student} = useSelector((state)=>state.student)
    const {teachers, hisSubjects} = useSelector((state)=>state.teacher)
    const {admins, hisAnnounces} = useSelector((state)=>state.admin)
    const {isNewSubject, isNewAnnounce, updateProfile} = useSelector((state)=>state.modal)
    const {id} = useParams()
    const User = useSelector((state)=>state.auth?.authData?.user)
    const UserId = User?._id
    const user = students.find((s)=>s._id === id) || teachers.find((p)=>p._id === id) || admins.find((p)=>p._id === id)
    const userId = user?._id
    const binomeId = User?.hisBinome
    useEffect(()=>{  
                dispatch(allTeachers())      
                dispatch(teacherSubjects(id)) 
                dispatch(allStudents())       
                dispatch(allAdmins())
                dispatch(adminAnnounces(id))
    },[id])

    useEffect(()=>{   
        
            if(user?.hisBinome){
                dispatch(getTheStudent(user?.hisBinome))
            }
        

    },[user?.hisBinome])
   
   
    
    
    if(!user){
        return <div className='flex-[9] flex justify-center mt-10 text-xl sm:text-3xl' >
            <p>THERE IS NO USER WITH THAT id !!!</p>
        </div>
    }
    if(updateProfile){
        return <ProfileModal />
    }
    if(isNewAnnounce){
        return <Modal />
    }
    if(isNewSubject){
        return <Modal />
    }
   
    return (
    <div className='flex' >
        <Sidebar />
        <div className='flex-[9]'>
        <div className='px-4 sm:px-20 py-10 border-l-[1px] border-t-[1px] shadow-lg h-full flex flex-col items-center justify-center' >
            <div className='flex flex-col gap-6 ' >
                <div className='flex flex-col gap-4' >
                    <div className='flex flex-col items-center gap-2' >
                        <img src={cat} alt="userImage" className='w-24 h-24 rounded-[50%]' />
                        {User?._id === id && (
                            <button className='flex items-center gap-2 px-4 py-1 bg-pfe-blue text-pfe-white' >
                                <FaCamera />
                                <p onClick={()=>dispatch(openProfileModal())} >Update Your Profile</p>
                            </button>
                        )}
                    </div>
                    <div className='flex justify-between items-center' >
                        <div>
                            <h1 className='font-bold' >{user.name}</h1>
                            <p className='text-pfe-blue' >{user.type}</p>
                        </div>
                        {User?.type ==="student" && !user?.isBinome && User?._id !== id && user?.type === "student" && (
                            <p className='text-pfe-blue hover:underline cursor-pointer h-fit' onClick={()=>dispatch(addBinome({UserId,userId,toast}))} >Be Your Binome</p>
                        )}
                        {User?.type ==="student" && user?.isBinome && User?.hisBinome?.includes(user?._id) && User?._id !== id && (
                            <p className='text-pfe-blue hover:underline cursor-pointer h-fit' onClick={()=>dispatch(beNoBinome({UserId,userId,toast}))} >Remove from your Binome</p>
                        )}
                        {User?.type ==="student" && user?.type === "teacher" && user?.isVision && !User.hisTeacher.includes(user?._id) && User?._id !== id &&  (
                            <p className='text-pfe-blue hover:underline cursor-pointer h-fit' onClick={()=>dispatch(addEncadreur({UserId,binomeId,userId,toast}))} >Be Your Encadreur</p>
                        )}
                        {User?.type ==="student" && user?.type === "teacher" && User.hisTeacher.includes(user?._id) && User?._id !== id &&  (
                            <p className='text-pfe-blue hover:underline cursor-pointer h-fit' onClick={()=>dispatch(removeEncadreur({UserId,binomeId,userId,toast}))} >Remove from Your Encadreur</p>
                        )}
                    </div>
                </div>
                <div className='flex justify-center' >
                    <div className='w-[15rem] sm:w-[20rem] h-[1px] bg-pfe-blue text-center ' ></div>
                </div>
                <div className='flex flex-col ' >
                    <div className='flex justify-between items-center' >
                        <p>Email : <span className='text-pfe-blue hover:underline cursor-pointer' >{user.email}</span></p>
                    </div>
                    {user.type === "teacher" && (
                        <div >
                            <p>Type : <span className='text-pfe-blue hover:underline cursor-pointer'>{user.pfeType ? user.pfeType : 'Not Selected yet'}</span> </p>
                            <div className='flex gap-2' >
                                <p>Students :</p> 
                                <div className='text-pfe-blue flex flex-col gap-2'>
                                    {user.studentsVision.length === 0 ? 'No Students yet' : user.studentsVision.map((s,index)=>{                                    
                                        
                                    return (
                                        <UserName key={index} s={s} type="students" />
                                    )
                                })} </div> 
                            </div>
                        </div>
                    )}
                    {user.type ==="student" && (
                        <div>
                            <p>Binome : {user?.isBinome ?
                                    <span className='text-pfe-blue hover:underline cursor-pointer' onClick={()=>navigate(`/profile/${user?.hisBinome}`)}>{student?.name}</span>
                                    :<span className='text-pfe-blue hover:underline cursor-pointer'>Don't Has Binome yet</span>}
                            </p>
                            <div className='flex gap-2' >
                                <p>Encadreur : </p>
                                <div className='text-pfe-blue' >
                                    {user?.hisTeacher.length > 0 ? (
                                        <div className='flex flex-col gap-2' >
                                            {user?.hisTeacher.map((t,index)=> {
                                                return (
                                                    <UserName key={index} s={t} type="encadreur" />
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <p>"Don't Has Encadreur yet"</p>
                                    ) }
                                </div>
                            </div>
                            <p>Section : <span className='text-pfe-blue' >ACAD C</span></p>
                        </div>
                    )}
                    
                    
                </div>
            </div>
            {User.type === "teacher" && User?._id === id && (
                <div className='items-start self-start w-full mt-4 ' >
                <div className='flex flex-col-reverse sm:flex-row items-center mb-4 justify-between' >
                    <h1 className='text-3xl font-bold' >My Subjects : </h1>
                    <button className='flex items-center gap-2 mt-4 py-1 px-4 text-pfe-white bg-pfe-blue rounded-lg' onClick={()=>dispatch(openSubjectModal())} >
                        <IoIosAddCircleOutline className='text-pfe-white text-2xl' />
                        <p>Add New</p>
                    </button>
                </div>
                

            </div>
            )}
            {user?.type === "teacher" && (
            hisSubjects.length > 0 ? hisSubjects.map((h,index)=>(
                <div key={index} className='items-start self-start w-full mt-4 '>
                    <Subject s={h} />
                </div>
            )):(
                <p>There is no subjects for the moment</p>
            )
            )}
            {User.type === "admin" && (
                    <div className='items-start self-start w-full mt-4 ' >
                    <div className='flex flex-col-reverse sm:flex-row items-center mb-4 justify-between' >
                        <h1 className='text-3xl font-bold' >My Announcements : </h1>
                        <button className='flex items-center gap-2 mt-4 py-1 px-4 text-pfe-white bg-pfe-blue rounded-lg' onClick={()=>dispatch(openAnnounceModal())} >
                            <IoIosAddCircleOutline className='text-pfe-white text-2xl' />
                            <p>Add New</p>
                        </button>
                    </div>
                </div>
            )}

            {user?.type ==="admin" && (
                hisAnnounces.length > 0 ? hisAnnounces.map((a,index)=>(
                    <div key={index} className='items-start self-start w-full mt-4 '>
                        <Announce a={a} />
                    </div>
                )):(
                    <p>There is no Announces for the moment</p>
                )
            )}
        </div>
    </div>

    </div>
  )
}

export default Profile