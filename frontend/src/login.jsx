import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from './utils/constants';
const Login = () => {
  const [email, setEmailid]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("")
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogin=async()=>{
    try{
      const result=await axios.post(BASE_URL+"/login",{
        email,password,
    },{withCredentials:true})
    console.log(result.data);
    dispatch(addUser(result.data))
    navigate("/")
    }catch(err){
      setError(err?.response?.data);
    }
    
  }
  return (
    <div className="card card-side bg-black shadow-sm">
  <figure>
    <img
      src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg"
      alt="Movie" 
      className='h-135'/>
  </figure>
  <div className="card-body my-30">
    <h2 className="card-title text-3xl">Login</h2>
    <div className='flex flex-col gap-3'>
      <input type="email" placeholder='email' value={email} onChange={(e)=>setEmailid(e.target.value)} className='text-white border-1 border-white p-2'/>
      <input type="password" placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} className='text-white border-1 border-white p-2'/>
      <div className="card-actions">
        <button className="btn bg-white text-black hover:bg-gray-400" onClick={handleLogin}>Login</button>
      </div>
    </div>
    <Link to="/signup"><p>New User?</p></Link>
    <p className='text-red-600'>{error}</p>
    
  </div>
</div>
  )
}

export default Login
