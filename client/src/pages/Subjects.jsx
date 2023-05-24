import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Filter from '../components/Filter'
import Subject from '../components/Subject'
import { allSubjects } from '../redux/features/subjectSlice'
import Sidebar from '../components/Sidebar'
import Modal from '../components/Modal'
import Navbar from '../components/Navbar'

const Subjects = () => {
  const dispatch = useDispatch()
  const {subjects} = useSelector((state)=>state.subject)


  useEffect(()=>{
    dispatch(allSubjects())

  },[])
  const {isNewSubject} = useSelector((state)=>state.modal)

  if(isNewSubject){
    return <Modal />
  }
  return (
    <>
    <Navbar />
    <div className='flex' >
      <Sidebar />
      <div className='flex-[9]' >
        <div className='px-4 sm:px-20 py-10 border-l-[1px] border-t-[1px] shadow-lg h-full' >
          <Filter title="Subjects Proposed" text="Find your subject for your PFE" />
          {subjects.length === 0 ? (
            <div>
              <p>There is no Subject For the moment...</p>
            </div>
          ) : (
            <div className='flex flex-col gap-4' >
            {subjects.map((s,index)=>{
              return (
                <div key={index} >
                  <Subject s={s} />
                </div>
              )
            })}
          </div>
          )} 
        </div>
    </div>
    </div>
                 
                 

    </>
    
  )
}

export default Subjects