import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import google from '../assets/google.png'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../redux/features/authSlice'
import {toast} from 'react-toastify'
import { signUp } from '../redux/api'

const RegisterForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userInfo,setUserInfo] = useState({
    userType:"",firstName:"",lastName:"",   email:"",password:"",confirmPassword:"",lvl:"",section:""
  })

  const handleChange = (e) => {
    setUserInfo({...userInfo,[e.target.name]:e.target.value})
  }

  const handleSubmit =async (e) => {
    e.preventDefault()
    dispatch(register({userInfo:{...userInfo,type:userInfo.userType,name:`${userInfo.firstName} ${userInfo.lastName}`},toast,navigate}))
  }
  return (
    <div>
      <h1 className='mt-8 mb-4 text-3xl text-pfe-black' >Create Account</h1>
      {userInfo.userType ? (
        <div>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
        <div className='flex justify-between flex-wrap gap-4' >
          <input type="text" placeholder='First Name'
          name="firstName"
          value={userInfo.firstName}
          onChange={handleChange}
          className='border-2 text-pfe-gray p-2 flex-[1] outline-none' />
          <input type="text" placeholder='Last Name'
          name="lastName"
          value={userInfo.lastName}
          onChange={handleChange}
          className='border-2 text-pfe-gray p-2 flex-[1] outline-none ' />
        </div>
        <input type="email" placeholder='Your Email'
        name="email"
        value={userInfo.email}
        onChange={handleChange}
        className='border-2 text-pfe-gray p-2 w-full outline-none ' />
        {userInfo.userType === "student" && (
          <div>
            <div className='p-2 border-[1px] text-pfe-gray text-[gray] flex flex-wrap justify-between mb-4 ' >
              <label>Choose Your Lvl</label>
              <div className='flex gap-8' >
                <div className='flex gap-1' >
                  <label>L3</label>
                  <input type="radio" name='userLvl' onChange={()=>setUserInfo({...userInfo,lvl:"L3"})} />
                </div>
                <div className='flex gap-1' >
                  <label>M2</label>
                  <input type="radio" name='userLvl' onChange={()=>setUserInfo({...userInfo,lvl:"M2"})} />
                </div>
              </div>
            </div>
            <div className='p-2 border-[1px] text-pfe-gray text-[gray] flex flex-wrap justify-between ' >
            <label>Select your Section</label>
            <select className='outline-none' name="section" value={userInfo.section} onChange={handleChange} >
                <option  value="ACAD A" >ACAD A</option>
                <option  value="ACAD B">ACAD B</option>
                <option  value="ACAD C">ACAD C</option>
                <option  value="ISIL A">ISIL A</option>
                <option  value="ISIL B">ISIL B</option>
                <option  value="GTR">GTR</option>
            </select>
          </div>
          </div>
        )}
        <div className='flex justify-between flex-wrap gap-4' >
          <input type="text" placeholder='Password'
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          className='border-2 text-pfe-gray p-2 flex-[1] outline-none' />
          <input type="text" placeholder='Confirm Password'
          name="confirmPassword"
          value={userInfo.confirmPassword}
          onChange={handleChange}
          className='border-2 text-pfe-gray p-2 flex-[1] outline-none' />
        </div>
        <button className='bg-pfe-blue text-pfe-white py-3 shadow-lg' >Sign Up</button>
      </form>
      <button className='w-full py-3 flex items-center justify-center gap-4 text-pfe-blue  my-4 border-2 border-[#E6E6E6]'>
        <img src={google} alt="google Photo" className='w-6 h-6' />
        <p>Sign Up with Google</p>
      </button>
      <div className='flex items-center gap-2' >
        <p>Already Have Account ?</p>
        <Link to='/login' >
          <p className='text-pfe-blue cursor-pointer' >Sign In</p>
        </Link>
      </div>
        </div>
      ):(
        <div>
          <p>Choose Your Type</p>
          <form>
          <div className='flex gap-2' >
            <label>Student</label>
            <input type="radio" name='userType' onChange={()=>setUserInfo({...userInfo,userType:"student"})} />
          </div>
          <div className='flex gap-2'>
            <label>Teacher</label>
            <input type="radio" name='userType'  onChange={()=>setUserInfo({...userInfo,userType:"teacher"})}/>
          </div>
          <div className='flex gap-2'>
            <label>Admin</label>
            <input type="radio" name='userType'  onChange={()=>setUserInfo({...userInfo,userType:"admin"})}/>
          </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default RegisterForm