import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './utils/constants'
import { useDispatch } from 'react-redux'
import { addRequest, removeRequest } from './utils/reviewSlice'
import { useSelector } from 'react-redux'
const Requests = () => {
    const dispatch=useDispatch();
    const requests=useSelector((store)=>store.requests);
    const viewRequests=async()=>{
        try{
            const res=await axios.get(BASE_URL+"/user/requests/recieved",{withCredentials:true})
            dispatch(addRequest(res.data.data))
            
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        viewRequests()
    },[])
    if(!requests || requests.length === 0) {
        return (
          <div role="alert" className="alert alert-info alert-soft w-1/2 mx-auto mt-10">
            <span>No request available</span>
          </div>
        )
    }
    const reviewrequest=async(status,_id)=>{
      try{
        const res=await axios.post(BASE_URL+`/request/review/${status}/${_id}`,{
        },{withCredentials:true})
        console.log(res);
        dispatch(removeRequest(_id))
        
      }catch(err){
        console.log(err);
        
      }
    }
  return (
   <div className='flex flex-wrap justify-start'>
    {requests?.map((request)=>(
      <div className="card card-border border-pink-500 bg-base-300 m-3 w-66">
        <div className="card-body">
        <h2 className="card-title">{request.fromUserId.firstName} {request.fromUserId.lastName}</h2>
        <p>{request.fromUserId.bio}</p>
        <p>{request.fromUserId.skills.map(skill=>skill).join(", ")}</p>
        <div className="card-actions justify-start">
          <button onClick={()=>reviewrequest("rejected",request._id)} className="btn hover:bg-white hover:text-black ">Reject ❌</button>
          <button onClick={()=>reviewrequest("accepted",request._id)} className="btn hover:bg-pink-500">Accept ✅</button>
        </div>
       </div>
      </div>
    ))}  
    </div>
    
  )
}

export default Requests;
