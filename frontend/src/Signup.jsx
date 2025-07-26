import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [email, setEmailid]=useState("");
    const [password,setPassword]=useState("");
    const [age,setAge]=useState("");
    const[city,setCity]=useState("");
    const [firstName,setFirstname]=useState("");
    const [lastName,setLastname]=useState("");
    const [skills,setSkills]=useState([])
    const [bio,setBio]=useState("");
    const [gender,setGender]=useState("");
    const navigate=useNavigate();
    const handleSignup=async()=>{
        try{
            const res=await axios.post(BASE_URL+"/signup",{
            firstName,lastName,email,password,age,bio,skills,gender,city
        },{withCredentials:true})
        console.log(res);    
        navigate("/login")    
        }catch(err){
            console.log(err); 
        }
    }
  return (
    <div className='min-h-screen'>
        <div className="card card-side bg-black shadow-sm">
    <figure>
    <img
      src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg"
      alt="Movie" 
      className='min-h-screen'/>
  </figure>
  
  <div className="card-body">
    <h2 className="card-title text-3xl">Signup</h2>
    <div className='flex flex-col gap-3'>
      <input type="text" placeholder='Firstname' value={firstName} onChange={(e)=>setFirstname(e.target.value)} className='text-white border-1 p-2'/>
      <input type="text" placeholder='Lastname' value={lastName} onChange={(e)=>setLastname(e.target.value)} className='text-white border-1 p-2'/>
      <input type="email" placeholder='email' value={email} onChange={(e)=>setEmailid(e.target.value)} className='text-white border-1 p-2'/>
      <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} className='text-white border-1 p-2'/>
      <input type="number" placeholder='age' value={age} onChange={(e)=>{setAge(e.target.value)}} className='text-white border-1 p-2'/>
      <input type="text" placeholder='bio' value={bio} onChange={(e)=>setBio(e.target.value)} className='text-white border-1 p-2'/>
      <input type="text" placeholder='skills' value={skills} onChange={(e)=>setSkills(e.target.value)} className='text-white border-1 p-2'/>
      <input type="text" placeholder='city' value={city} onChange={(e)=>setCity(e.target.value)} className='text-white border-1 p-2'/>
      <input type="text" placeholder='gender' value={gender} onChange={(e)=>setGender(e.target.value)} className='text-white border-1 p-2'/>
      <div className="card-actions">
        <button onClick={handleSignup} className="btn bg-sky-950 ">Signup</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Signup
