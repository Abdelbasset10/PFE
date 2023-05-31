import React, {useState, useEffect} from 'react'
import { FaFilter } from 'react-icons/fa'
import { people } from '../data'
import imgDefault from '../assets/user.png'
import {IoIosAddCircleOutline} from 'react-icons/io'
import {MdMessage} from 'react-icons/md'
import Choices from '../components/Choices'
import Filter from '../components/Filter'
import { useDispatch, useSelector } from 'react-redux'
import { allEncadreurs, beNoVision, beVision } from '../redux/features/teacherSlice'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Teachers = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show,setShow] = useState(false)
    const User = useSelector((state)=>state.auth?.authData?.user)
    const id = User?._id
    const {encadreurs} = useSelector((state)=>state.teacher)

    useEffect(()=>{
        dispatch(allEncadreurs())
    },[])
  return (
    <>
    <Navbar />
    <div className='flex' >
        <Sidebar />
        <div className='flex-[9]  ' >
        <div className='px-4 sm:px-20 py-10 border-l-[1px] border-t-[1px] shadow-lg h-full' >
            <Filter title="Seatch Your Encadrerur" text="find your Encadreur" />
            <div className=' overflow-x-visible ' >
            {encadreurs.length === 0 ? (
                <div>
                    <p>There is no Encadreurs for this moment...</p>
                </div>

            ): (
                <table className='w-full text-left' >
                    <tbody>
                    <tr className='text-pfe-blue' >
                        <th className='' >Teacher</th>
                        <th className=''>Level</th>
                        <th className=''>PFE Type</th>
                        <th className=''>Contact</th>
                    </tr>
                    {encadreurs.map((p)=>{
                        return (
                            <tr key={p._id} className="cursor-pointer hover:bg-[#F9F9F9]" onClick={()=>navigate(`/profile/${p._id}`)} >
                                <td className='flex items-center gap-2 py-2  ' >
                                    <img src={p.profilePicture ? p.profilePicture : imgDefault} alt="student Img" className='w-8 h-8 rounded-[50%]' />
                                    <p>{p.name}</p>
                                </td>
                                <td className='py-2 ' >{p.lvl ? p.lvl : "Not Selected Yet"}</td>
                                <td className='py-2 ' >{p.pfeType ? p.pfeType : "Not Selected Yet"}</td>
                                <td className='py-2  ' >
                                    <div className='p-2 bg-[#F9F9F9] hover:bg-pfe-blue rounded-lg w-fit' >
                                        <MdMessage className='text-xl text-pfe-blue hover:text-pfe-white   ' />
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
            </table>
            )}
            {User?.type ==="teacher" && !User?.isVision && (
                <div className='flex justify-end ' >
                    <button className='flex items-center gap-2 mt-4 py-1 px-4 text-pfe-white bg-pfe-blue rounded-lg' onClick={()=>dispatch(beVision({id,toast}))} >
                        <IoIosAddCircleOutline className='text-pfe-white text-2xl' />
                        <p>Add Your self</p>
                    </button>
                </div>  
            )}
            {User?.type ==="teacher" && User?.isVision && (
                <div className='flex justify-end ' >
                    <button className='flex items-center gap-2 mt-4 py-1 px-4 text-pfe-white bg-pfe-blue rounded-lg' onClick={()=>dispatch(beNoVision({id,toast}))} >
                        <IoIosAddCircleOutline className='text-pfe-white text-2xl' />
                        <p>Remove Your self</p>
                    </button>
                </div>  
            )}
            
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Teachers