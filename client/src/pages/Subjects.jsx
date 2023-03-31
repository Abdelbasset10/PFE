import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Filter from '../components/Filter'
import Subject from '../components/Subject'
import { allSubjects } from '../redux/features/subjectSlice'

const Subjects = () => {
  const dispatch = useDispatch()
  const {subjects} = useSelector((state)=>state.subject)

  useEffect(()=>{
    dispatch(allSubjects())

  },[])
  return (
    <div className='flex-[9]' >
      <div className='px-4 sm:px-20 py-10 border-l-[1px] border-t-[1px] shadow-lg h-full' >
        <Filter title="Subjects Proposed" text="Find your subject for your PFE" />
        <div className='flex flex-col gap-4' >
          {subjects.map((s,index)=>(
            <div key={index} >
              <Subject s={s} />
            </div>
          ))}
        </div>

      </div>
          
    </div>
  )
}

export default Subjects