import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from './utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from './utils/connectionSlice'
import Connectioncard from './Connectioncard'

const Connections = () => {
    const connections=useSelector((store)=>store.connection)
    const dispatch=useDispatch();
    const fetchConnection=async()=>{
        const res=await axios.get(BASE_URL+"/user/requests/connected",{withCredentials:true})
        dispatch(addConnections(res?.data?.data))
    }
    useEffect(()=>{
        fetchConnection();
    },[])
   if(connections?.length===0) return <div className='flex justify-center mt-20'>No users found</div>
  return connections&& (
    <div className='flex flex-wrap space-x-5 m-2'>
       {connections.map(connection=>(
          <Connectioncard conn={connection} />
        ))} 
    </div>
  )
}

export default Connections
