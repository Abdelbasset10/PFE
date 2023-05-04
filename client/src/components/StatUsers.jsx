import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {MdPeopleAlt} from 'react-icons/md'
import { allStudents, getBinomes, getNoBinomes } from '../redux/features/studentSlice'
import { allEncadreurs } from '../redux/features/teacherSlice'
import { allSubjects } from '../redux/features/subjectSlice'

const StatUsers = () => {
    const dispatch = useDispatch()
    const {students, noBinomesCopy, binomes} = useSelector((state)=>state.student)
    const {encadreursCopy} = useSelector((state)=>state.teacher)
    const {subjectsCopy} = useSelector((state)=>state.subject)


    useEffect(()=>{
        dispatch(allStudents())
        dispatch(allEncadreurs())
        dispatch(allSubjects())
        dispatch(getNoBinomes())
        dispatch(getBinomes())

    },[])


    return (
        <div className='flex gap-14 flex-wrap items-center border-[1px] border-pfe-black p-2 text-sm'>
            <div className='flex gap-2 items-center' >
                <MdPeopleAlt className='text-2xl' />
                <div>
                    <p>Students</p>
                    <p>{students?.length}</p>
                </div>
            </div>
            <div className='flex gap-2 items-center' >
                <MdPeopleAlt className='text-2xl' />
                <div>
                    <p>Encadreurs</p>
                    <p>{encadreursCopy?.length}</p>
                </div>
            </div>
            <div className='flex gap-2 items-center' >
                <MdPeopleAlt className='text-2xl' />
                <div>
                    <p>Monome</p>
                    <p>{noBinomesCopy?.length}</p>
                </div>
            </div>
            <div className='flex gap-2 items-center' >
                <MdPeopleAlt className='text-2xl' />
                <div>
                    <p>Binome</p>
                    <p>{binomes?.length}</p>
                </div>
            </div>
            <div className='flex gap-2 items-center' >
                <MdPeopleAlt className='text-2xl' />
                <div>
                    <p>Pfe</p>
                    <p>{subjectsCopy?.length}</p>
                </div>
            </div>
        </div>
  )
}

export default StatUsers