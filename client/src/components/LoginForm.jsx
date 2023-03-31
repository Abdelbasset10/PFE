import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import google from '../assets/google.png'
import { login } from '../redux/features/authSlice'
import {toast} from 'react-toastify'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userInfo,setUserInfo] = useState({
    userType:"",email:"",password:""
  })

  const handleChange = (e) => {
    setUserInfo({...userInfo,[e.target.name]:e.target.value})
  }

  const handleSubmit =async (e) => {
    e.preventDefault()
    dispatch(login({userInfo,toast,navigate}))
  }
  return (
    <div>
        <h1 className='mt-8 mb-4 text-3xl text-pfe-black' >Create Account</h1>
        {userInfo.userType ? (
          <div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
            <input type="email" placeholder='Your Email'
            name='email'
            value={userInfo.email}
            onChange={handleChange}
            className='border-2 text-pfe-gray p-2 w-full outline-none ' />
            <input type="text" placeholder='Password'
            name='password'
            value={userInfo.password}
            onChange={handleChange}
            className='border-2 text-pfe-gray p-2 flex-[1] outline-none' />
            <div className='flex flex-wrap justify-between' >
                <div className='flex gap-2'>
                    <input type="checkbox" />
                    <label>Remember Me</label>
                </div>
                <p className='text-pfe-blue cursor-pointer hover:underline' >Forgot Password ?</p>
            </div>
        <button className='bg-pfe-blue text-pfe-white py-3 shadow-lg' >Sign In</button>
      </form>
      <button className='w-full py-3 flex items-center justify-center gap-4 text-pfe-blue  my-4 border-2 border-[#E6E6E6]'>
        <img src={google} alt="google Photo" className='w-6 h-6' />
        <p>Sign In with Google</p>
      </button>
      <div className='flex items-center gap-2' >
        <p>Don't Have Account ?</p>
        <Link to='/register' >
            <p className='text-pfe-blue cursor-pointer' >Sign Up</p>
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

export default LoginForm