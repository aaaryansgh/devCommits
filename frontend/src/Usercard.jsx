import React from 'react'
import axios from 'axios'
import { BASE_URL } from './utils/constants'
import { useDispatch } from 'react-redux'
import { removeFeed } from './utils/feedSlice'
const Usercard = ({user}) => {
    const{_id,firstName,lastName,bio,skills,age}=user
    const dispatch=useDispatch()
    const reviewrequest=async(status,_id)=>{
      try{
        const res=await axios.post(BASE_URL+`/request/send/${status}/${_id}`,{
        },{withCredentials:true})
        dispatch(removeFeed(_id));
      }catch(err){
        console.log(err);
        
      }
    }
  return (
    <div className="card card-border border-pink-500 bg-transparent w-96">
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}' <span>{age?age:"21"}</span></h2>
        <p>{bio}</p>
        <p>{skills.map(skill=>skill).join(", ")}</p>
        <div className="card-actions justify-start">
          <button onClick={()=>reviewrequest("ignored",_id)} className="btn hover:bg-white hover:text-black ">Ignore ❌</button>
          <button onClick={()=>reviewrequest("pending",_id)} className="btn hover:bg-pink-500">Interested ✅</button>
        </div>
       </div>
    </div>
  )
}

export default Usercard
