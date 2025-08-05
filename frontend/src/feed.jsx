import React, { useEffect } from 'react'
import { BASE_URL } from './utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from './utils/feedSlice'
import Usercard from './Usercard'
const Feed = () => {
  const dispatch=useDispatch();
  const feed=useSelector((store)=>store.feed)
  console.log(feed);
  
  const getFeed=async()=>{
    try{
       const res=await axios.get(BASE_URL+"/feed",{withCredentials:true});
       console.log(res?.data?.data);
       dispatch(addFeed(res?.data?.data))
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    getFeed()
  },[])
  if(feed?.length===0) return <div className='flex justify-center mt-20'>No users found</div>
  return feed&&(
    <div className='flex justify-center mt-20 flex-wrap '>
        <Usercard user={feed[0]} />
    </div>
  )
}

export default Feed
