import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import { createSocketConnection } from './utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
const Chat = () => {
  const {id,name}=useParams();
  const user=useSelector((store)=>store.user)
  const userId=user?._id;
  const firstname=user?.firstName;
  const [mssg,setMssg]=useState([])
  const [newmsg,setNewmsg]=useState("")

  const fetchChatMessages=async()=>{
    const response=await axios.get(BASE_URL+`/chat/${id}`,{withCredentials:true});
    const chatMessages=response?.data?.messages.map(msg=>{
      return {
        firstname: msg?.senderId?.firstName,
        text: msg.text,
      }
    })
    setMssg(chatMessages);
  }
  useEffect(()=>{
    if(!userId) return;
    const socket=createSocketConnection();
    socket.emit("joinChat",{userId,id})
    socket.on("messageReceived",({firstname,userId,text})=>{
      console.log(firstname,text);
      setMssg(prev=>[...prev,{firstname,text,userId}])
    })
    fetchChatMessages();
    return ()=>{
      socket.disconnect();
    }
  },[userId,id])

  const sendMessage=()=>{
    const socket=createSocketConnection();
    socket.emit("sendMessage",{firstname,userId,id,text:newmsg})
    setNewmsg("")
  }




  return (
    <div className='w-1/2 mx-auto border border-gray-600 flex flex-col h-[70vh] '>
      <h1 className='p-2 text-center border-b border-gray-600'>CHAT ({firstname}-{name})</h1>
      <div className=' p-5 flex-1 overflow-scroll overflow-x-hidden '>
  {mssg.map((msg, index) => {
    const isSender = msg.userId === userId;
    return (
      <div key={index} className='flex flex-col items-start mb-4'>
        <div className='flex gap-4'>
          <span className="text-xs font-semibold text-white" >
          {isSender ? 'You' : msg.firstname}
        </span>
        <span className='text-xs'>{new Date().toLocaleDateString()}</span>
        </div>
        <div className="chat-bubble my-1">{msg.text}</div>
        
      </div>
    );
  })}
</div>
      <div className='flex space-x-1 justify-between items-center border-t'>
        <input type='text' className='w-12/12 p-2 border-r ' placeholder='Message' value={newmsg}
        onKeyDown={(e)=>{if(e.key==="Enter") sendMessage()}}
        onChange={(e)=>setNewmsg(e.target.value)}/>
        <button className=' b-1  text-white cursor-pointer p-2' onClick={sendMessage} >Send</button>
      </div>
    </div>
  )
}

export default Chat
