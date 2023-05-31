import React, {useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { FaFilter } from 'react-icons/fa'
import { people } from '../data'
import imgDefault from '../assets/user.png'
import {IoIosAddCircleOutline} from 'react-icons/io'
import {MdMessage} from 'react-icons/md'
import Filter from '../components/Filter'
import { getNoBinomes } from '../redux/features/studentSlice'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Binomes = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {noBinomes} = useSelector((state)=>state.student)
    const User = useSelector((state)=>state.auth?.authData?.user)
    const UserId = User?._id
    useEffect(()=>{
        dispatch(getNoBinomes())
    },[])
  return (
    <>
    <Navbar />
    <div className='flex ' >
        <Sidebar />
        <div className='flex-[9] h-[86vh]  ' >
            <div className='px-4 sm:px-20 py-10 border-l-[1px] border-t-[1px] shadow-lg h-full' >
                <Filter title="search Binome" text="Find your Binome" />   
                    {noBinomes.length === 0 ? (
                        <div>
                            <p>There is no Binomes for now ...</p>
                        </div>
                    ) : (
                    <div className='overflow-x-auto max-h-[90%] overflow-y-scroll ' >
                        <table className=' w-full overflow-x-auto text-left' >
                        <tbody className=' '>
                        <tr className='text-pfe-blue' >
                            <th className='' >Student</th>
                            <th className=''>Level</th>
                            <th className=''>PFE Type</th>
                            <th className=''>Section</th>
                            <th className=''>Contact</th>
                        </tr>
                        {noBinomes?.map((p,index)=>{
                            if(p?._id !== UserId){
                            return (
                                
                                    <tr key={index}  className="cursor-pointer hover:bg-[#F9F9F9] " onClick={()=>navigate(`/profile/${p._id}`)} >
                                    <td className='flex items-center gap-2 py-2  ' >
                                        <img src={p.profilePicture ? p.profilePicture : imgDefault} alt="student Img" className='w-8 h-8 rounded-[50%]' />
                                        <p>{p.name}</p>
                                    </td>
                                    <td className='py-2  ' >{p.lvl}</td>
                                    <td className='py-2  ' >{p.pfeType ? p.pfeType : 'Not Selected yet'}</td>
                                    <td className='py-2 ' >{p.section}</td>
                                    <td className='py-2  ' >
                                        <div className='p-2 bg-[#F9F9F9] hover:bg-pfe-blue rounded-lg w-fit' >
                                            <MdMessage className='text-xl text-pfe-blue hover:text-pfe-white   ' />
                                        </div>
                                    </td>
                                 </tr>
                               
                            )
                        }
                        })}
                         </tbody>
                    </table>
                    </div>
                    )}
                    
              
            </div>
        </div>
    </div>
    </>
  )
}

export default Binomes