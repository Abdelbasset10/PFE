import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Subjects from './pages/Subjects'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import { FaBars } from 'react-icons/fa'
import SidebarMobile from './components/SidebarMobile'
import Binomes from './pages/Binomes'
import Teachers from './pages/Teachers'
import Profile from './pages/Profile'
import Announces from './pages/Announces'
import { ToastContainer} from 'react-toastify';
import { setUser } from './redux/features/authSlice'
import { allStudents } from './redux/features/studentSlice'
import Messenger from './pages/Messenger'


const App = () => {
  const dispatch = useDispatch()
  const [showSide, setShowSide] = useState(false)


  useEffect(()=>{
    
    dispatch(setUser())
  },[])

  return (
    <BrowserRouter>
      <div>
        <FaBars className='text-2xl  md:hidden  left-2 z-20 fixed top-2' onClick={()=>setShowSide(true)} />
        {showSide && (
          <SidebarMobile setShowSide={setShowSide} />
        )}
      </div>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />     
      </Routes>
        <Navbar />          
          <Routes>
            <Route exact path='/' element={<Subjects />} />  
            <Route exact path='/announces' element={<Announces />} />  
            <Route  path='/binomes' element={<Binomes />} />  
            <Route  path='/teachers' element={<Teachers />} />  
            <Route  path='/profile/:id' element={<Profile />} />  
            <Route  path='/messenger' element={<Messenger />}/>
          </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App