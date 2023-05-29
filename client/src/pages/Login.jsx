import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import bg from '../assets/sign-bg.png'
import logo from '../assets/usthb.png'
import LoginForm from '../components/LoginForm'

const Login = () => {
 
  return (
    <div className='flex w-full min-h-screen text-[#898989]'>
      <div className='flex-[1]'>
        <div className=' px-4 sm:px-10 lg:px-14 py-10' >
          <div className='flex justify-between items-center'>
            <img src={logo} alt="usthb" className='w-16 h-16' />
            <Link to='/register'>
              <button className='border-[1px] border-pfe-blue px-4 py-2 text-pfe-blue' >Sign Up</button>
            </Link>
          </div>
        <LoginForm/>
        <div className='mt-10'>
          <p><span className='underline' >Privacy Policy</span> and <span className='underline'>Terms of Service</span></p>
        </div>
        </div>
      </div>
      <div className='hidden md:block bg-pfe-blue flex-[1]' >
        <div className=' md:px-6 lg:px-8 py-10' >
          <img src={bg} alt="background Image" className=' w-full lg:w-full h-[25rem] xl:w-10/12 mx-auto ' />
          <p className='mt-4 lg:text-xl xl:text-2xl text-pfe-white' >This platform helps you to find proposed end of study project.</p>
        </div>
      </div>
    </div>
  )
}

export default Login