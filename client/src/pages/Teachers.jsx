import React, {useState} from 'react'
import { FaFilter } from 'react-icons/fa'
import { people } from '../data'
import cat from '../assets/Cat03.jpg'
import {IoIosAddCircleOutline} from 'react-icons/io'
import {MdMessage} from 'react-icons/md'
import Choices from '../components/Choices'
import Filter from '../components/Filter'

const Teachers = () => {
    const [show,setShow] = useState(false)
  return (
    <div className='flex-[9]  ' >
        <div className='px-4 sm:px-20 py-10 border-l-[1px] border-t-[1px] shadow-lg h-full' >
            <Filter title="Seatch Your Encadrerur" text="find your Encadreur" />
            <div className=' overflow-x-visible ' >
            <table className='w-full text-left' >
                <tr className='text-pfe-blue' >
                    <th className='' >Teacher</th>
                    <th className=''>Level</th>
                    <th className=''>PFE Type</th>
                    <th className=''>Contact</th>
                </tr>
                {people.map((p)=>{
                    return (
                        <tr key={p.id} className="cursor-pointer hover:bg-[#F9F9F9]" >
                            <td className='flex items-center gap-2 py-2  ' >
                                <img src={cat} alt="student Img" className='w-8 h-8 rounded-[50%]' />
                                <p>{p.name}</p>
                            </td>
                            <td className='py-2 ' >{p.lvl}</td>
                            <td className='py-2 ' >{p.pfeType}</td>
                            <td className='py-2  ' >
                                <div className='p-2 bg-[#F9F9F9] hover:bg-pfe-blue rounded-lg w-fit' >
                                    <MdMessage className='text-xl text-pfe-blue hover:text-pfe-white   ' />
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </table>
            <div className='flex justify-end ' >
                <button className='flex items-center gap-2 mt-4 py-1 px-4 text-pfe-white bg-pfe-blue rounded-lg' >
                    <IoIosAddCircleOutline className='text-pfe-white text-2xl' />
                    <p>Add Your self</p>
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Teachers