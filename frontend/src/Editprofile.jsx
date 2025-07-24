import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
const Editprofile = () => {
    const [email, setEmailid]=useState("");
    const [age,setAge]=useState("");
    const [msg,setMsg]=useState("");
    const [error,setError]=useState("");
    const [firstName,setFirstname]=useState("");
    const [lastName,setLastname]=useState("");
    //const [skills,setSkills]=useState([])
    const [bio,setBio]=useState("");
    const handleprofileedit=async()=>{
        try{
            const res=await axios.patch(BASE_URL+"/profile/edit",{
            firstName,lastName,email,age,bio
        },{withCredentials:true})
        console.log(res);
        setMsg(res?.data?.message)
        }catch(err){
            console.log(err.message);
            setError(err?.response?.data)
        }
        
    }
  return (
    <div>
        <div className="card card-side bg-base-100 shadow-sm">
  <figure>
    <img
      src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-business-user-profile-vector-png-image_1541960.jpg"
      alt="Movie" 
      className='min-h-screen'/>
  </figure>
  
  <div className="card-body">
    <h2 className="card-title text-3xl">Edit profile</h2>
    <div className='flex flex-col gap-3'>
      <p className='text-success'>{msg}</p>
      <p className='text-error'>{error}</p>
      <input type="text" placeholder='Firstname' value={firstName} onChange={(e)=>setFirstname(e.target.value)} className='text-white border-1 p-2'/>
      <input type="text" placeholder='Lastname' value={lastName} onChange={(e)=>setLastname(e.target.value)} className='text-white border-1 p-2'/>
      <input type="email" placeholder='email' value={email} onChange={(e)=>setEmailid(e.target.value)} className='text-white border-1 p-2'/>
      <input type="number" placeholder='age' value={age} onChange={(e)=>{setAge(e.target.value)}} className='text-white border-1 p-2'/>
      <input type="text" placeholder='bio' value={bio} onChange={(e)=>setBio(e.target.value)} className='text-white border-1 p-2'/>
      <div className="card-actions">
        <button onClick={handleprofileedit} className="btn bg-sky-950 ">Edit</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )
}

export default Editprofile
