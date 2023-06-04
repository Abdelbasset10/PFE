import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { goFilter, filterSubjects } from '../redux/features/subjectSlice'
import { useParams } from 'react-router-dom'
import { filterStudent } from '../redux/features/studentSlice'
import { filterEncadreurs } from '../redux/features/teacherSlice'

const Choices = () => {
    const {pathname} = useLocation()
    console.log(pathname)
    const dispatch = useDispatch()
    const [filtredSubjects,setFiltredSubjects] = useState({
        subjectType:[],
        subjectLvl:"",
        encadreurType:""
    })
    const [filtredStudent,setFiltredStudent] = useState({
        subjectType:[],
        section:[],
        studentLvl:""
    })
    
    
    const handleFilterType = (e) => {
        if(pathname === '/' || pathname === '/teachers'){
            if(e.target.checked){
                setFiltredSubjects({...filtredSubjects,subjectType:[...filtredSubjects.subjectType,e.target.name]})
            }else{
                setFiltredSubjects({...filtredSubjects,subjectType:filtredSubjects.subjectType.filter((f)=>f!== e.target.name)})
            }
        }else if(pathname === '/binomes'){
            if(e.target.checked){
                setFiltredStudent({...filtredStudent,subjectType:[...filtredStudent.subjectType,e.target.name]})
            }else{
                setFiltredStudent({...filtredStudent,subjectType:filtredStudent.subjectType.filter((f)=>f!== e.target.name)})
            }
        }
    }

    const handleFilterSection = (e) => {
        if(pathname === '/binomes'){
            if(e.target.checked){
                setFiltredStudent({...filtredStudent,section:[...filtredStudent.section,e.target.name]})
            }else{
                setFiltredStudent({...filtredStudent,section:filtredStudent.section.filter((f)=>f!== e.target.name)})
            }
        }
    }


    const doFilter = () =>{
        if(pathname === '/'){
            dispatch(filterSubjects(filtredSubjects))
        }else if(pathname === '/binomes'){
            dispatch(filterStudent(filtredStudent))
        }else if(pathname === '/teachers'){
            dispatch(filterEncadreurs(filtredSubjects))
        }
    }
    return (
    <div className='w-[310px] z-20 bg-pfe-white border-[1px] rounded-lg shadow-lg absolute right-0 top-12' >
                        <div className='flex flex-col gap-4 py-4 px-4' >
                            {pathname === '/binomes' && (
                            <div>
                                <h1 className='text-xl mb-1' >Section</h1>
                                {filtredStudent.studentLvl === "M2" ? (
                                    <div className='grid grid-cols-2' >
                                        <div className='flex gap-2' >
                                            <input type="checkbox" name='IL' onChange={handleFilterSection}  />
                                            <label>IL</label>
                                        </div>
                                        <div className='flex gap-2' >
                                            <input type="checkbox" name='SII' onChange={handleFilterSection} />
                                            <label>SII</label>
                                        </div>
                                        <div className='flex gap-2' >
                                            <input type="checkbox" name='SSI' onChange={handleFilterSection} />
                                            <label>SSI</label>
                                        </div>
                                    
                                        <div className='flex gap-2' >
                                            <input type="checkbox" name='MIV' onChange={handleFilterSection} />
                                            <label>MIV</label>
                                        </div>
                                        <div className='flex gap-2' >
                                            <input type="checkbox" name='HPC' onChange={handleFilterSection} />
                                            <label>HPC</label>
                                        </div>
                                        <div className='flex gap-2' >
                                            <input type="checkbox" name='BIO INFO' onChange={handleFilterSection} />
                                            <label>BIO INFO</label>
                                        </div>
                                
                                    </div>
                                ) : (
                                    <div className='grid grid-cols-2' >
                                        <div className='flex gap-2' >
                                            <input type="checkbox" name='ACAD A' onChange={handleFilterSection}  />
                                            <label>ACAD A</label>
                                        </div>
                                        <div className='flex gap-2' >
                                            <input type="checkbox" name='ACAD B' onChange={handleFilterSection} />
                                            <label>ACAD B</label>
                                        </div>
                                        <div className='flex gap-2' >
                                            <input type="checkbox" name='ACAD C' onChange={handleFilterSection} />
                                            <label>ACAD C</label>
                                        </div>
                                    
                                    <div className='flex gap-2' >
                                            <input type="checkbox" name='ISIL A' onChange={handleFilterSection} />
                                            <label>ISIL A</label>
                                        </div>
                                        <div className='flex gap-2' >
                                            <input type="checkbox" name='ISIL B' onChange={handleFilterSection} />
                                            <label>ISIL B</label>
                                        </div>
                                    
                                </div>
                                )}
                            </div>
                            )}
                            <div>
                                <h1 className='text-xl mb-1' >PFE Type</h1>
                                <div className='grid grid-cols-2' >
                                    <div className='flex gap-2' >
                                        <input type="checkbox" name="web" onChange={handleFilterType} />
                                        <label>Web</label>
                                    </div>
                                    <div className='flex gap-2' >
                                        <input type="checkbox" name="mobile" onChange={handleFilterType} />
                                        <label>Mobile</label>
                                    </div>
                                    <div className='flex gap-2' >
                                        <input type="checkbox"  name="ai" onChange={handleFilterType} />
                                        <label>AI</label>
                                    </div>
                                    <div className='flex gap-2' >
                                        <input type="checkbox" name="cyber" onChange={handleFilterType} />
                                        <label>Cyber</label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {pathname !== "/binomes" && (
                                    <div>
                                    <h1 className='text-xl mb-1' >Encadreur Type</h1>
                                    <div className='grid grid-cols-2' >
                                        <div className='flex gap-2' >
                                                <input type="radio" name="zone" onChange={(e)=>setFiltredSubjects({...filtredSubjects,encadreurType:"intern"})}  />
                                                <label>intern</label>
                                        </div>
                                        <div className='flex gap-2' >
                                                <input type="radio" name="zone" onChange={(e)=>setFiltredSubjects({...filtredSubjects,encadreurType:"extern"})}   />
                                                <label>extern</label>
                                        </div>
                                    </div>
                                </div>
                                )}
                            </div>
                            <div>
                                <h1 className='text-xl mb-1' >Level</h1>
                                <div className='grid grid-cols-2' >
                                    <div className='flex gap-2' >
                                            <input type="radio" name="pfeLlv" onChange={(e)=>{
                                                setFiltredSubjects({...filtredSubjects,subjectLvl:"L3"})
                                                setFiltredStudent({...filtredStudent,studentLvl:"L3"})
                                            }}  />
                                            <label>L3</label>
                                    </div>
                                    <div className='flex gap-2' >
                                            <input type="radio" name="pfeLlv" onChange={(e)=>{
                                                setFiltredSubjects({...filtredSubjects,subjectLvl:"M2"})
                                                setFiltredStudent({...filtredStudent,studentLvl:"M2"})
                                            }} />
                                            <label>M2</label>
                                    </div>
                                </div>
                            </div>
                            <button className='bg-pfe-blue text-pfe-white h-8 rounded-lg' onClick={doFilter}>Filter</button>
                        </div>
                    </div>
  )
}

export default Choices