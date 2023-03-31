import React, { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import Choices from './Choices'


const Filter = ({title,text}) => {
    const [show,setShow] = useState(false)

  return (
    <div className='flex justify-between gap-4' >
                <div className='mb-4' >
                    <h1 className='sm:text-2xl md:text-3xl' >{title}</h1>
                    <p className='text-[#929292] text-sm md:text-xl' >{text}</p>
                </div>
                <div className='relative' >
                    <button className='flex items-center gap-2 bg-pfe-blue text-pfe-white px-4 sm:px-6 py-2 h-fit rounded-lg' onClick={()=>setShow(!show)} >
                        <FaFilter className='text-lg'/>
                        <p>Filter</p>
                    </button>
                    {show && (
                        <Choices />
                    )}
                </div>
            </div>
  )
}

export default Filter