import React from 'react'
import { Link } from 'react-router-dom';

const Connectioncard = ({conn}) => {
    const {_id,firstName,lastName,bio,skills}=conn;
  return (
    <div className="card card-border border-success bg-transparent  w-56">
      <div className="card-body">
        <h2 className="card-title">{firstName} {lastName}</h2>
        <p className='italic'>{bio}</p>
        <p>{skills.map(skill=>skill).join(", ")}</p>
        <div className="card-actions justify-start">
         <Link to={`/chat/${_id}/${firstName}`}><button className="btn bg-blue-500 text-black hover:bg-white ">Chat</button></Link> 
        </div>
       </div>
    </div>
  )
}

export default Connectioncard
