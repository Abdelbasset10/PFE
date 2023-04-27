import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { FaFilter } from 'react-icons/fa'
import { people } from '../data'
import cat from '../assets/Cat03.jpg'
import {IoIosAddCircleOutline} from 'react-icons/io'
import {MdMessage} from 'react-icons/md'
import Filter from '../components/Filter'
import { getNoBinomes } from '../redux/features/studentSlice'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

const Binomes = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const User = useSelector((state)=>state.auth?.authData?.user)
    const {noBinomes} = useSelector((state)=>state.student)

    useEffect(()=>{
        dispatch(getNoBinomes())
    },[])
  return (
    <div className='flex' >
        <Sidebar />
        <div className='flex-[9]  ' >
            <div className='px-4 sm:px-20 py-10 border-l-[1px] border-t-[1px] shadow-lg h-full' >
                <Filter title="search Binome" text="Find your Binome" />
                <div className=' overflow-x-visible ' >
                    {noBinomes.length === 0 ? (
                        <div>
                            <p>There is no Binomes for now ...</p>
                        </div>
                    ) : (
                    <table className='w-full text-left' >
                        <tr className='text-pfe-blue' >
                            <th className='' >Student</th>
                            <th className=''>Level</th>
                            <th className=''>PFE Type</th>
                            <th className=''>Section</th>
                            <th className=''>Contact</th>
                        </tr>
                        {noBinomes?.map((p,index)=>{
                            return (
                                <tr key={index} className="cursor-pointer hover:bg-[#F9F9F9]" onClick={()=>navigate(`/profile/${p._id}`)} >
                                    <td className='flex items-center gap-2 py-2  ' >
                                        <img src={cat} alt="student Img" className='w-8 h-8 rounded-[50%]' />
                                        <p>{p.name}</p>
                                    </td>
                                    <td className='py-2 ' >{p.lvl}</td>
                                    <td className='py-2 ' >{p.pfeType ? p.pfeType : 'Not Selected yet'}</td>
                                    <td className='py-2 ' >{p.section}</td>
                                    <td className='py-2  ' >
                                        <div className='p-2 bg-[#F9F9F9] hover:bg-pfe-blue rounded-lg w-fit' >
                                            <MdMessage className='text-xl text-pfe-blue hover:text-pfe-white   ' />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                    )}
                    {/* <div className='flex justify-end ' >
                        {User?.type ==="student" && !User?.isBinome && (
                            <button className='flex items-center gap-2 mt-4 py-1 px-4 text-pfe-white bg-pfe-blue rounded-lg' >
                                <IoIosAddCircleOutline className='text-pfe-white text-2xl' />
                                <p>{User?.isBinome ? 'Add your self' : 'Remove Your self'}</p>
                            </button>
                        )}
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Binomes