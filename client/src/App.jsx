import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
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
import Messenger from './pages/Messenger'
import Dashboard from './pages/Dashboard'
import ProfileModal from './components/ProfileModal'
import Modal from './components/Modal'


const App = () => {
  const dispatch = useDispatch()
  const [showSide, setShowSide] = useState(false)
  const User = JSON.parse(localStorage.getItem("profile"))
  const {isNewSubject, isNewAnnounce, updateProfile} = useSelector((state)=>state.modal)

  //const User = useSelector((state)=>state.auth?.authData?.user)

  useEffect(()=>{ 
    dispatch(setUser())
  },[])

  if(updateProfile){
    return <ProfileModal />
}
if(isNewAnnounce){
    return <Modal />
}
if(isNewSubject){
    return <Modal />
}

  return (
    <BrowserRouter>
      <div>
        <FaBars className='text-2xl  md:hidden  left-2 z-20 fixed top-2' onClick={()=>setShowSide(true)} />
        {showSide && (
          <SidebarMobile setShowSide={setShowSide} />
        )}
      </div>
      <Routes>
        <Route path='/register' element={User ? <Navigate to='/' /> : <Register /> } />
        <Route path='/login' element={User ? <Navigate to='/' /> : <Login />} />           
            <Route exact path='/' element={User ? <Subjects /> : <Navigate to='/login' />} />  
            <Route  path='/announces' element={User ? <Announces /> : <Navigate to='/login' />} />  
            <Route  path='/binomes' element={User ? <Binomes /> : <Navigate to='/login' />} />  
            <Route  path='/teachers' element={User ? <Teachers /> : <Navigate to='/login' />} />  
            <Route  path='/profile/:id' element={User ? <Profile /> : <Navigate to='/login' />} />  
            <Route  path='/messenger' element={User ? <Messenger /> : <Navigate to='/login' />}/>
            <Route  path='/dashboard' element={User ? <Dashboard /> : <Navigate to='/login' />}/>
          </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App