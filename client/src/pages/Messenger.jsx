import React from 'react'
import { people } from '../data'
import cat from '../assets/Cat03.jpg'
import { MdCall} from 'react-icons/md'
import {FaVideo} from 'react-icons/fa'

const Messenger = () => {
  return (
    <div className='flex h-[86vh] border-[1px] shadow-lg rounded-lg ' >
        <div className='flex-[3] hidden  md:flex flex-col gap-4 py-10 md:px-2 lg:px-6 h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-pfe-blue '>
            {people.map((p,index)=>{
                return (
                    <div className='flex gap-2 items-center hover:bg-pfe-blue hover:text-pfe-white hover:px-2 hover:py-1 hover:rounded-lg hover:cursor-pointer' >
                        <img src={cat} alt="userImg" className='w-10 h-10 rounded-[50%]' />
                        <p>{p.name}</p>
                    </div>
                )
            })}
            

        </div>
        <div className='flex-[9] flex flex-col gap-4 py-10  h-full relative' >
            <div className='flex items-center justify-between border-b-[1px] pb-[1rem]  '>
                <div className='flex items-center gap-2 px-2 lg:px-6' >
                    <img src={cat} alt="userImg" className='w-10 h-10 rounded-[50%]' />
                    <p className='text-pfe-blue text-xl'>Rezazi Mohamed Abdelbasset</p>
                </div>
                <div className='flex gap-4 md:px-2 lg:px-6' >
                    <MdCall className='text-3xl text-pfe-blue cursor-pointer ' />
                    <FaVideo className='text-3xl text-pfe-blue cursor-pointer' />
                    
                </div>

            </div>
            <div className='flex flex-col gap-4   overflow-y-scroll scrollbar-thin scrollbar-thumb-pfe-blue px-2 lg:px-6' >
                {people.map((p,index)=>{
                    return (
                        <div key={index} className={`flex gap-2 items-center ${(p.id === 2 || p.id ===3) && 'self-end'}`} >
                            <img src={cat} alt="userImg" className='w-10 h-10 rounded-[50%]' />
                            <p className='max-w-[15rem] bg-pfe-blue text-pfe-white px-2 py-1 rounded-lg' >Wach ya kho cv chwya mQsh tban yal3ziz win raQQ dor ya kho</p>
                        </div>
                    )
                })}
                
            </div>
            <div className='absolute bottom-0 left-0 right-0 shadow-lg border-t-[2px] ' >
                <form className='w-full h-[3rem]' >
                    <input type="text" placeholder='Enter Message' className='w-full px-2 lg:px-6 rounded-lg bg-[#F9F9F9] border-0 outline-none h-full' />
                </form>

            </div>
        </div>
    </div>
  )
}

export default Messenger