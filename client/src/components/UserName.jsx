import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStudent, getTeacher,  } from '../redux/api'


const UserName = ({s,type}) => {
    const navigate = useNavigate()
    const [theUser,setTheUser] = useState()
    useEffect(()=>{
        const getOne = async () => {
            if(type === "encadreur"){
                const {data} = await getTeacher(s)
                setTheUser(data)
            }else if(type === "students"){
                const {data} = await getStudent(s)
                setTheUser(data)
            }
        }
        getOne()
    },[s])
  return (
    <div  className='hover:underline cursor-pointer' onClick={()=>navigate(`/profile/${s}`)} >
            <p>{theUser?.name}</p>
    </div>
  )
}

export default UserName