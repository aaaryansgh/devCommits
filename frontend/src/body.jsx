import Footer from './footer'
import Navbar from './navbar'
import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from './utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'

const Body = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const fetchUser=async()=>{
    try{
       const userprofile=await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
       dispatch(addUser(userprofile.data))
    }catch(err){
      navigate("/login");
      console.log(err);
    }
   
  }
  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div className='bg-black min-h-screen'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Body
